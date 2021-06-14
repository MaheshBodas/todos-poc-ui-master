import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { formatDate }  from  '../../utils/dateutils'
import { alertConstants } from '../../_constants';
import { viewallTodosService} from '../../_services';
import { Pagination } from 'element-react';

export class TodaysTodoGrid extends Component {
  _isMounted = false
  constructor(props) { 
    super(props);
    this.state = {
      type: '',
      message: '',
      currentPage: 1,
      currentPageSize: 10,
      count:0,
      columnDefs: [       
        { colId: 'id', hide: true },
        { headerName: 'Text', minWidth: 200, field: 'text' },
        { headerName: "Completed", minWidth: 50, field: "completed" },
        { headerName: "DueDate", minWidth: 190, field: "dueDate"},
        { headerName: "Permission", minWidth: 100, field: "permissionLevel" }        
      ],    
      defaultColDef: {
        flex: 1,        
      },
      rowData: null            
    };

    this.onCurrentPageChange = this.onCurrentPageChange.bind(this);
    this.onCurrentPageSizeChange = this.onCurrentPageSizeChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true    
  }

  componentDidUpdate(prevProps, prevState) {
    const updateData = (data) => {
      this.setState((state) => ({
        rowData: data.result,
        count: data.count
      }));        
    };
    // Typical usage (don't forget to compare props):
    if ((this.state.currentPage !== prevState.currentPage) ||
          this.state.currentPageSize !== prevState.currentPageSize) {
          const nPage = this.state.currentPage - 1;
          const todaysDate = formatDate(new Date())
          viewallTodosService.getTodaysTodos(todaysDate, nPage, this.state.currentPageSize)
          .then((data) => updateData(data))
          .catch((error) => {
              console.error('Do that')
              this.setState((state) => ({
                  type: alertConstants.error,
                  message: error
                }));  
          })          
    }
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

    const updateData = (data) => {
      console.log('updateData result=' + data.result + 'count=' + data.count);
      this.setState((state) => ({
        rowData: data.result,
        count: data.count
      }));   
    };
    
    const todaysDate = formatDate(new Date())
    viewallTodosService.getTodaysTodos(todaysDate, 0, this.state.currentPageSize)
        .then((data) => updateData(data))
        .catch((error) => {
            console.error('Do that')
            this.setState((state) => ({
                type: alertConstants.error,
                message: error
              }));  
        })
    
  };

  onCellValueChanged = (params) => {
    // console.log(params) // access the entire event object
    console.log(params.data) // access and print the updated row data
    viewallTodosService.updateTodo(params.data).then((data) => console.log('patch Todo response' + data));
    
    // api call to save data 
 }

  render() {
    const { currentPage = 0, currentPageSize = 10, count = 0 } = this.state;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          id="myGrid"
          style={{         
            height: '70%',   
            width: '100%',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
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
            height: '30%',   
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