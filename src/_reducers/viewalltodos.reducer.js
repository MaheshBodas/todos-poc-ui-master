import { viewalltodosConstants } from '../_constants';

// function millToMinSec(ms){
//   var min = Math.floor((ms/1000/60) << 0)
//   var sec = Math.floor((ms/1000/60) % 60)
//   var duration = min + 'm:' + sec + 's'
//   return duration
// }

// function appendCurrencySymbol(curvalue) {
//   if (arguments.length === 0) {
//     return null
//   }
//   var floatVal = parseFloat(curvalue)
//   return '$ ' + floatVal.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
// }

// function sliceString(strToSlice, numChars) {
//     var slicedString = ''
//     if(strToSlice)
//         slicedString = strToSlice.slice(0,numChars)
//     return slicedString
// }
function createTodoTableRow(todoinstance) {
  var todosTableRow = {}
  // console.log('Inside createTrackTableRow' + todoinstance)
  todosTableRow['id'] = todoinstance.id;
  todosTableRow['text'] = todoinstance.text;
  todosTableRow['completed'] = todoinstance.completed;
  todosTableRow['dueDate'] = todoinstance.dueDate
  todosTableRow['permissionLevel'] = todoinstance.permissionLevel
  // console.log('todosTableRow=' + todosTableRow)
  return todosTableRow
}

export function viewalltodos(state = {}, action) {
  switch (action.type) {
    case viewalltodosConstants.GET_ALL_TODOS:
      return {
        loading: true
    };
    case viewalltodosConstants.GET_ALL_TODOS_SUCCESS:
      console.log('In viewalltodosConstants.GET_ALL_TODOS_SUCCESS')
      console.log('In viewalltodosConstants.GET_ALL_TODOS_SUCCESS action is' + action.todoinstances.count)
      let todoinstances = action.todoinstances.result;
      let todosInstancesTable = []
      if(todoinstances)
        todosInstancesTable = todoinstances.map(createTodoTableRow)
      console.log('todosInstancesTable=' + todosInstancesTable)
      let todosInstanceTableColumns = [
                                      // { field: 'id', hide: true },
                                      // { headerName: 'Text', width: 200, field: 'text' },
                                      // { headerName: "Completed", width: 50, field: "completed" },
                                      // { headerName: "DueDate", width: 100, field: "dueDate" },
                                      // { headerName: "Permission", width: 100, field: "permissionLevel" }                                      
                                      { label: 'Text', width: 200, prop: 'text' },
                                      { label: "Completed", width: 150, prop: "completed" },
                                      { label: "DueDate", width: 300, prop: "dueDate" },
                                      { label: "Permission", width: 200, prop: "permissionLevel" }                                      
                                    ]
      return {
        todosInstancesTable: todosInstancesTable,
        todosInstanceTableColumns: todosInstanceTableColumns,
        count: action.todoinstances.count,
        loading: false
      };
    case viewalltodosConstants.GET_ALL_TODOS_FAILURE:
      return {
        error: action.error,
        loading: false
    };
    case viewalltodosConstants.RESET_ALL_TODOS:
      return {
          loading: true
      };
    case viewalltodosConstants.RESET_ALL_TODOS_SUCCESS:
      console.log('In viewalltodosConstants.RESET_ALL_TODOS')
      todosInstancesTable = []
      todosInstanceTableColumns = []
      return {
        todosInstancesTable: todosInstancesTable,
        todosInstanceTableColumns: todosInstanceTableColumns,
        loading: false
      };
    case viewalltodosConstants.RESET_ALL_TODOS_FAILURE:
      return {
          error: action.error,
          loading: false
      };
    default:
      return state
  }
}
