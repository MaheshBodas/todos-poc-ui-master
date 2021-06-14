import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'element-react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { isValidDate }  from  '../../utils/dateutils'
import { viewallTodosService} from '../../_services';
import { viewAllTodosActions} from '../../_actions';

class ViewTodoGridRedux extends Component {
  _isMounted = false
  constructor(props) { 
    super(props);
    this.state = {
      currentPage: 1,
      currentPageSize: 10,
      count:0,
      columnDefs: [       
        { colId: 'id', hide: true },
        { headerName: 'Text', minWidth: 200, field: 'text', filter: 'agTextColumnFilter', rowDrag: true},
        { headerName: "Completed", minWidth: 50, field: "completed", filter: 'agTextColumnFilter', },
        // { headerName: "DueDate", minWidth: 190, field: "dueDate", editable: true, onCellValueChanged: params => {
        //    console.log(params)  
        // },
        { headerName: "DueDate", minWidth: 190, field: "dueDate", editable: true, filter: 'agTextColumnFilter', valueParser: isValidDate, onCellValueChanged: this.onCellValueChanged},
        { headerName: "Permission", minWidth: 100, field: "permissionLevel", filter: 'agNumberColumnFilter', }        
      ],    
      defaultColDef: {
        flex: 1,  
        floatingFilter: true      
      },
      rowData: null      
      // frameworkComponents: { agDateInput: CustomDateComponent },
    };

    this.onCurrentPageChange = this.onCurrentPageChange.bind(this);
    this.onCurrentPageSizeChange = this.onCurrentPageSizeChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true    
    this.props.getTodos(0, this.state.currentPageSize)
  }

  componentDidUpdate(prevProps, prevState) {
    // const updateData = (data) => {
    //   this.setState((state) => ({
    //     rowData: data.result,
    //     count: data.count
    //   }));        
    // };
    // Typical usage (don't forget to compare props):
    if ((this.state.currentPage !== prevState.currentPage) ||
          this.state.currentPageSize !== prevState.currentPageSize) {
          const nPage = this.state.currentPage - 1;
          this.props.getTodos(nPage, this.state.currentPageSize)
          // viewallTodosService.getTodos(nPage, this.state.currentPageSize).then((data) => updateData(data));
    }    
  }
  
  static getDerivedStateFromProps(props, state){
    if(props.todosInstancesTable !== state.rowData) {
      return {
        rowData: props.todosInstancesTable,
        count: props.count
      };
    }
    return null;
  }
  componentWillUnmount() {
    this._isMounted = false
  }

  onCurrentPageChange = event => {
    const selectedPage = (event !== '') ? event : 'None'
    console.log('onCurrentChange selectedPage is ' + selectedPage)

    // Fetch data related to selected RiskType
    if(selectedPage !== 'None') {
      if(this._isMounted) {
        const { currentPageSize = null } = this.state;
        console.log('currentPageSize is ' + currentPageSize)
        if(currentPageSize !== null) {
            this.setState((state) => ({
              currentPage: selectedPage,
              currentPageSize: state.currentPageSize
            }));
        }
      }
    } else {
      console.log('Dispacting resetAllTodos')
      if(this._isMounted) {
        this.props.resetAllTodos()
      }
    }
  }

  //
  onCurrentPageSizeChange = event => {
    const selectedPageSize = (event !== '') ? event : 'None'
    // console.log('onCurrentPageSizeChange selectedPageSize is ' + selectedPageSize)
    // Fetch data related to selected RiskType
    if(selectedPageSize !== 'None') {
      if(this._isMounted) {
        this.setState((state) => ({
          currentPage: 1,
          currentPageSize: selectedPageSize
        }));
      }
    } else {
      console.log('Dispacting resetAllTodos')
      if(this._isMounted) {
        viewallTodosService.resetAllTodos()
      }
    }
  }

  componentDidCatch(error, info) {
    console.log('componentDidCatch ' + error)
  }


  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;    
  };

  onRowDragEnd = (e) => {
    console.log('onRowDragEnd Row event', e);
    console.log('onRowDragEnd Row Dragged', e.node);
    console.log('onRowDragEnd Over Row', e.overNode);
    this.updateItems(e.node, e.overNode)
  };

  onCellValueChanged = (params) => {
    // console.log(params) // access the entire event object
    console.log(params.data) // access and print the updated row data
    viewallTodosService.updateTodo(params.data).then((data) => console.log('patch Todo response' + data));
    
    // api call to save data 
 }

 updateItems = (node, overNode) => {  
    // Dragged Node which was dropped at new location
  var data = Object.assign({}, { ...node.data}) 

  // Dragged Node was dropped over this Node
  var overdata = Object.assign({},{...overNode.data}) 

  // Swap content in order to reflect it on DataGrid 
  // Dragged Node content ==> Over older Node
  data.text = overdata.text;
  data.completed = overdata.completed;
  data.dueDate = overdata.dueDate;
  data.permissionLevel = overdata.permissionLevel;
  console.log(data)

    
  // Swap content in order to reflect it on DataGrid 
  // Over older Node  ==>   Dragged Node content
  overdata.text = node.data.text;
  overdata.completed = node.data.completed;
  overdata.dueDate = node.data.dueDate;
  overdata.permissionLevel = node.data.permissionLevel;  
  console.log( overdata)

  // Swap rows in Grid
  node.setData(data)
  overNode.setData(overdata)
  
  // Persist the changes databased so as to reflect drag operation on refresh
  viewallTodosService.updateTodo(data)
  viewallTodosService.updateTodo(overdata)
  
  // var res = this.gridApi.applyTransaction({ update: itemsToUpdate });  
  // this.gridApi.refreshRows()
};

render() {
  // const {todosInstanceTableColumns} = this.props;
    const { currentPage = 0, currentPageSize = 10, count = 0 } = this.state;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          id="myGrid"
          style={{         
            height: '80%',   
            width: '100%',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            // columnDefs={todosInstanceTableColumns}
            rowDragManaged={false}
            animateRows={true}
            suppressMoveWhenRowDragging={true}
            onRowDragEnd={this.onRowDragEnd.bind(this)}
            // gridOptions={this.state.gridOptions}
            // components={this.state.components}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            // frameworkComponents={this.state.frameworkComponents}
            onGridReady={this.onGridReady}
            // cellValueChanged={this.cellValueChanged}
          />
        </div>      
        <div
          id="myPager"
          style={{         
            height: '20%',   
            width: '100%',
          }}          
        >
          <Pagination layout="sizes, total, prev, pager, next"
            currentPage={currentPage} total={count} pageSize={currentPageSize}
            pageSizes={[10, 20, 30, 40, 50]}
            onCurrentChange={this.onCurrentPageChange}
            onSizeChange={this.onCurrentPageSizeChange}
          />          
        </div>  
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert, authentication, viewalltodos } = state;
  const { loggingIn } = authentication;
  const {type, message} = alert;
  const {todosInstancesTable, todosInstanceTableColumns, count, loading } = viewalltodos

  let shouldDisplayMain = false
  let showFooter = false
  let hasError = false

  if(todosInstancesTable && todosInstancesTable.length > 0) {
    shouldDisplayMain = true
    showFooter = true
  }

  if(type === 'alert-danger') {
    hasError = true
    console.log('This is an error')
  }
  console.log('mapStateToProps View Todos' + shouldDisplayMain)
  return {
    loggingIn,
    type,
    message,
    shouldDisplayMain,
    showFooter,
    todosInstancesTable,
    todosInstanceTableColumns,
    count,
    loading,
    hasError
  }
}

function mapDispatchToProps(dispatch) {
  return {        
      getTodos: (pageNum, pageSize) => dispatch( viewAllTodosActions.getTodos(pageNum, pageSize) ),
      resetAllTodos: () => dispatch(viewAllTodosActions.resetAllTodos())
  }
}

const connectedViewTodoGridRedux = connect(mapStateToProps , mapDispatchToProps)(ViewTodoGridRedux);
export { connectedViewTodoGridRedux as ViewTodoGridRedux };
  