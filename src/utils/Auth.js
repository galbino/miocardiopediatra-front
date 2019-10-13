class Auth {
  
    static authenticateUser (token) {
      localStorage.setItem('token', token)
    }
  
    static authNotified () {
      localStorage.setItem('authNotified', true)
    }
  
    static getAuthNotified () {
      return localStorage.getItem('authNotified')
    }
  
    static storeReferer (path) {
      localStorage.setItem('referer', path)
    }
  
    static getReferer () {
      return localStorage.getItem('referer')
    }
     
    static isUserAuthenticated () {
      return localStorage.getItem('token') !== null
    }
  
    static unauthenticateUser () {
      localStorage.removeItem('token')
    }
   
    static getToken () {
      return localStorage.getItem('token')
    }
  }
  
  export default Auth