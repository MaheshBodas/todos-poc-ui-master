import auth from '../api/auth'
export const viewallTodosService = {
  getTodos,
  getTodaysTodos,
  getFakeTodos,
  updateTodo
};

function getTodos(pageNum, pageSize) {    
    return new Promise((resolve, reject) => {
      // console.log('service selectedPage is ' + pageNum)
      // console.log('service currentPageSize is ' + pageSize)
        auth.getTodos(pageNum, pageSize).then(response => {
          const todosinstances = response
          if(todosinstances !== null) {
            resolve(todosinstances)
          }
          else {
            const strError  = 'No data found for Todos'
            reject(strError)
          }
        }).catch(error => {
          console.log('Error in getTodos')
          reject(error)
        })
      })
}

function getTodaysTodos(strDate, pageNum, pageSize) {    
  return new Promise((resolve, reject) => {
    // console.log('service selectedPage is ' + pageNum)
    // console.log('service currentPageSize is ' + pageSize)
      auth.getTodaysTodos(strDate, pageNum, pageSize).then(response => {
        const todosinstances = response
        if(todosinstances !== null) {
          resolve(todosinstances)
        }
        else {
          const strError  = 'No data found for Todos'
          reject(strError)
        }
      }).catch(error => {
        console.log('Error in getTodos')
        reject(error)
      })
    })
}


function getFakeTodos(page) {    
  return new Promise((resolve, reject) => {
    // console.log('service selectedPage is ' + pageNum)
    // console.log('service currentPageSize is ' + pageSize)
      auth.getFakeTodos(page).then(response => {
        const data = response;
        if(data !== null) {
          resolve(data)
        }
        else {
          const strError  = 'No data found for Todos'
          reject(strError)
        }
      }).catch(error => {
        console.log('Error in getTodos')
        reject(error)
      })
    })
}


function updateTodo(changedTodo) {    
  return new Promise((resolve, reject) => {    
      auth.updateTodo(changedTodo).then(response => {
        const todosinstance = response
        console.log('updateTodo' + todosinstance);
        if(todosinstance !== null) {
          resolve(true)
        }
        else {
          const strError  = 'No data found for Todos'
          reject(strError)
        }
      }).catch(error => {
        console.log('Error in updateTodo')
        reject(error)
      })
    })
}