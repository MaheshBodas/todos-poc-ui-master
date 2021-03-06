import axios from 'axios'

// const CSRF_COOKIE_NAME = 'csrftoken'
// const CSRF_HEADER_NAME = 'X-CSRFToken'

const session = axios.create({
  baseURL: process.env.REACT_APP_BASE_API, // api of base_url
  timeout: 15000, // Request timeout
  withCredentials: true
  // xsrfCookieName: CSRF_COOKIE_NAME,
  // xsrfHeaderName: CSRF_HEADER_NAME
})

export default session
