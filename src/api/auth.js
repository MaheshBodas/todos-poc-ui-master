// import session from './session'
import session from '../utils/request'

//export default {
const auth  = {
  login(email, password) {
    console.log('REACT_APP_BASE_API:' + process.env.REACT_APP_BASE_API)
    // var loginData = {email:"admin@email.com", password:password};
    var loginData = {email:email, password:password};
    // username = 'admin@email.com';
    console.log('Email:' + email)
    console.log('Password:' + password)
    // return session.post('/auth/login/', { username, password })
    return session.post('/auth/', loginData )
  },
  retrievetoken(username, password) {
    return session.post('/api-token-auth/', { username, password })
  },
  logout() {
    return session.post('/auth/logout/', {})
  },
  createAccount(username, password1, password2, email) {
    return session.post('/registration/', { username, password1, password2, email })
  },
  changeAccountPassword(password1, password2) {
    return session.post('/auth/password/change/', { password1, password2 })
  },
  sendAccountPasswordResetEmail(email) {
    return session.post('/auth/password/reset/', { email })
  },
  resetAccountPassword(uid, token, new_password1, new_password2) { // eslint-disable-line camelcase
    return session.post('/auth/password/reset/confirm/', { uid, token, new_password1, new_password2 })
  },
  getCurrentUser() {
    return session.get('/auth/user/')
  },
  getUsers() {
    return session.get('/users/')
  },
  getAccountDetails(username) {
    return session.get('/users/?username=' + username)
  },
  updateAccountDetails(data) {
    return session.patch('/auth/user/', data)
  },
  verifyAccountEmail(key) {
    return session.post('/registration/verify-email/', { key })
  },
  getTodos(pageNum, pageSize) {
    // console.log('getTodos selectedPage is ' + pageNum)
    // console.log('getTodos currentPageSize is ' + pageSize)
    let strQueryParam = '?page=' + pageNum + '&limit=' + pageSize;
    // console.log(strQueryParam);
    console.log(strQueryParam);
    return session.get('/todos/' + strQueryParam)    
  },
  getTodaysTodos(strDate, pageNum, pageSize) {    
    let strQueryParam = '?todaysdate=' + strDate + '&page=' + pageNum + '&limit=' + pageSize;
    // console.log(strQueryParam);
    console.log(strQueryParam);
    return session.get('/todaystodos/' + strQueryParam)
  },
  getFakeTodos(page) {    
    let strQueryParam = '?page=' + page;
    // console.log(strQueryParam);
    console.log(strQueryParam);
    return session.get('/faketodos/' + strQueryParam)
  },
  updateTodo(changedTodo){
    let strPatchparam = '/todos/' + changedTodo.id;
    return session.patch(strPatchparam, changedTodo)
  }
  // Risk API related functions
}

export default auth;
