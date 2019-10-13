import React from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'

class HomePage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAutenticated: Auth.isUserAuthenticated(),
        }
    }

    render(){
        const isAutenticated = this.state.isAutenticated;
        if (!isAutenticated || isAutenticated === undefined){
            return (
                 <Redirect push to="/login" />
            );    
        }
        return(
           <React.Fragment>
               <div>
                   Sou a HomePage :)
               </div>
           </React.Fragment>     
        )
    }

}

export default HomePage;
