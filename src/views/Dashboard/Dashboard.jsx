import React, { Component } from 'react';
// import { Layout } from 'element-react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';

import { ComposableContainer } from './../../_components/ComposableContainer/ComposableContainer'
import { ToggleContainer } from './../../_components//ToggleContainer/ToggleContainer'
import { connect } from 'react-redux';
import { authenticationActions } from '../../_actions';
import styles from './Dashboard.css'
// import imgView = require('../static/images/avatars/viewalltrack.jpg')
// import logo from 'src/_images/viewalltrack.jpg'
// import logo from '/static/images/avatars/viewalltrack.jpg'
// /static/images/avatars
//const backgroundImage = require('/static/images/avatars/viewalltrack.jpg'); // Import using relative path

export class Dashboard extends Component {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    console.log(this.props.user)
    this.props.getUserDetails(this.props.user);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const { type, message, user, userRoles,shouldDisplayMain, showFooter, hasError } = this.props
    const errorInfo = {type: type, message: message}    
    const viewAllTodosImg = '/static/images/avatars/viewalltodos.jpg'
    // const viewTodaysTodosImg = '/static/images/avatars/viewtodaystodos.jpg'
    // const InfiniteScrollGrid = '/static/images/avatars/InfiniteScrollGrid.jpg'
    return (
      <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
      <Container maxWidth={false}>
      { this._isMounted && <ComposableContainer showHeader={true}>
      {{
        header:(
          <div style={{height:'60px', border: '1px', solid: '#eee'}}>
            <div style={styles.dashboardLabel}>Hi, {user} </div>
            <div style={styles.dashboardLabel}>Roles: {userRoles}</div>
            <br/>
          </div>
        ),
        content: (
          <ToggleContainer loading={this.props.loading} shouldDisplayMain={shouldDisplayMain}
              showFooter={showFooter} hasError={hasError} showSuccess={false}>
          {{
            warningmsg: (
              null
            ),
            content: (
                <Grid
                  container
                  spacing={3}
                >
                <Grid
                      item
                      key={1}
                      sx={{
                        backgroundColor: 'background.default',
                        minWidth: '100%',
                        px: 3
                      }}
                    >
                    <Card
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: '100%',
                        height: '100%'
                      }}
                    >
                      <CardContent>
                        <Typography
                          align="center"
                          color="textPrimary"
                          gutterBottom
                          variant="h4"
                        >
                          View All Todo's records
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid xs={12} item
                    key={2}
                    justify="space-between"
                    // style={{backgroundImage: `url(${logo})`, /static/images/avatars/viewalltrack.jpg
                    style={{backgroundImage: `url(${viewAllTodosImg})`,
                     height:'400px',
                      marginTop: 20,
                      backgroundSize:'cover'
                      }}>
                  </Grid>
                  <Grid
                        item
                        key={3}
                        sx={{
                          backgroundColor: 'background.default',
                          minWidth: '100%',
                          px: 3
                        }}
                      >
                          <Typography variant="h6">
                            Any User can view all Todo's records. Page will show Name, Due Date, Completed, Permission Fields in tabular format.
                            User can paginate through records. User will be able to drag drop single Todo's record. 
                            Those changes are persisted to database and will be visible after refresh.
                          </Typography>
                    </Grid>                    
                </Grid>                  
            ),
            errorInfo: errorInfo
          }}
        </ToggleContainer>
        )
      }}
      </ComposableContainer>
      }
      </Container>
    </Box>
  </>
    );
    //
  }
}

function mapStateToProps(state) {
  const { alert, authentication } = state;
  const { user, loggedIn, isAdmin, loading, userRoles } = authentication;
  const {type, message} = alert;
  let hasError = false;

  let shouldDisplayMain = false;
  let showFooter = false;
  

  if(user && user !== '') {
    shouldDisplayMain = true
    showFooter = true
  }

  if(type === 'alert-danger') {
    hasError = true
    console.log('This is an error')
  }

  if(type === 'alert-danger') {
    hasError = true
    console.log('This is an error')
  }

  return {
      user,
      userRoles,
      loggedIn,
      type,
      message,
      loading,
      isAdmin,
      shouldDisplayMain,
      showFooter,
      hasError
  };
}

function mapDispatchToProps(dispatch) {
  return {
      // dispatching plain actions
      getUserDetails : (userName) => dispatch( authenticationActions.getUserDetails(userName))
  }
}

const ConnectedDashboard = connect(mapStateToProps , mapDispatchToProps)(Dashboard);
export default ConnectedDashboard
