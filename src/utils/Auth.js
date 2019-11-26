class Auth {
  
    static authenticateUser (data) {
      localStorage.setItem('token', data.token.access_token)
      localStorage.setItem('id', data.id)
      localStorage.setItem('is_doctor', data.is_doctor)
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
      localStorage.removeItem('id')
      localStorage.removeItem('is_doctor')
    }
   
    static getToken () {
      return localStorage.getItem('token')
    }

    static getId () {
      return localStorage.getItem('id')
    }

    static getRole () {
      return localStorage.getItem('is_doctor')
    }
  }
  
  export default Auth