import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { viewallTodosService} from '../../_services';

export class InfiniteScrollGrid extends Component {
  _isMounted = false
  pageSize = 100;
  constructor(props) {
    super(props);

    this.state = {      
      columnDefs: [       
        { field: 'id', headerName: 'ID', minWidth: 100, cellRenderer: 'loadingRenderer' },
        { headerName: 'Text', minWidth: 500, field: 'text'},
        { headerName: "Completed", minWidth: 50, field: "completed" },        
        { headerName: "DueDate", minWidth: 190, field: "dueDate"},
        { headerName: "Permission", minWidth: 100, field: "permissionLevel" }        
      ],    
      defaultColDef: {
        flex: 1,  
        floatingFilter: true      
      },
      rowData: null,
      components: {
        loadingRenderer: function (params) {
          if (params.value !== undefined) {
            return params.value;
          } else {
            return '<img src="/static/images/avatars//ag-loading.gif">';
          }
        },
      },
      rowBuffer: 0,
      rowSelection: 'multiple',
      rowModelType: 'infinite',
      paginationPageSize: 100,
      cacheOverflowSize: 2,
      maxConcurrentDatasourceRequests: 1,
      infiniteInitialRowCount: 100,
      maxBlocksInCache: 10,      
    };
  }    
  
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      var dataSource = {
        rowCount: null,
        getRows(params) {
          // console.log(...params);
          console.log('asking for ' + params.startRow + ' to ' + params.endRow);   
          //Calculate current page with parameter 
          let page = params.endRow / 100;
          console.log("getRows page" + page);
          page = page - 1;
          viewallTodosService.getFakeTodos(page)
            .then( rowData => {
              // console.log("getRows" + rowData.content.length);
              // console.log("getRows rowData.totalPages" + rowData.totalPages);
              // console.log("getRows rowData.totalElements" + rowData.totalElements);
              if(rowData.content.length > 0){
                // Here we calculate if we meed to make lastRow = -1 or
                // the total number of elements to end request
                let lastRow = () => {
                  // find out how many pages API has
                  // make sure we have enough data tp keep calling REST API
                  if(rowData.totalPages <= 1) 
                     return rowData.totalElements;
                  // else if (page <= (rowData.totalPages - 2)) 
                  //    return -1
                  else
                    return rowData.totalElements;
                };
                // plug the data to params.successCallback if lastRow  is the 
                // totalNumber of elements then it will now that all data is rendered
                params.successCallback(rowData.content, lastRow());
              }            
              else {
                params.successCallback([{columnNameField: "No Result Found"}]);
              }            
            })            
            .catch(error => console.error("Error", error))     
        }
      };
      params.api.setDatasource(dataSource);
    };
    

    viewallTodosService.getFakeTodos(0)
            .then(data => updateData(data.content));
  };

  
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          id="myGrid"
          style={{
            height: '100%',
            width: '100%',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            components={this.state.components}
            rowBuffer={this.state.rowBuffer}
            rowSelection={this.state.rowSelection}
            rowModelType={this.state.rowModelType}
            paginationPageSize={this.state.paginationPageSize}
            cacheOverflowSize={this.state.cacheOverflowSize}
            maxConcurrentDatasourceRequests={
              this.state.maxConcurrentDatasourceRequests
            }
            infiniteInitialRowCount={this.state.infiniteInitialRowCount}
            maxBlocksInCache={this.state.maxBlocksInCache}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}