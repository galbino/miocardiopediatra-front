import React from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'
import { Menu } from '../components';

class HomePage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAutenticated: Auth.isUserAuthenticated(),
        }
    }

    handleLogout = () => {
        Auth.unauthenticateUser();
        this.setState({ isAutenticated: false })
    }

    render(){
        const isAutenticated = this.state.isAutenticated;
        if (!isAutenticated || isAutenticated === undefined){
            return (
                 <Redirect push to="/login" />
            );    
        }
       
        const content = (
                <div>
                   Sou a HomePage :)
               </div>
        )

        return(
           <React.Fragment>
               <Menu title="Homepage" component={content} handleLogout={this.handleLogout} />
           </React.Fragment>     
        )
    }

}

export default HomePage;
