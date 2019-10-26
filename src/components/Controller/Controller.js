import React from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'
import { Menu, HomePage, Pacientes, Perfil } from '../components';


class Controller extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAutenticated: Auth.isUserAuthenticated(),
            page: 0,
            title: "Homepage",
            redirect: "/home",
            component: <HomePage/>
        }
    }

    handleChangePage = (page) => {
        switch(page){
            case 0:
                return this.setState({ page: page, redirect: "/home", component: < HomePage/>, title: "Homepage" })
            case 1:
                return this.setState({ page: page, redirect: "/pacientes", component: < Pacientes/>, title: "Listagem de Pacientes" })
            case 2: 
                return this.setState({ page: page, component: < Perfil/>, title: "Meu Perfil" })
            default:
                return this.setState({ page: page,  redirect: "/home", component: < HomePage/>, title: "Homepage" })
        }
        
    }

    handleLogout = () => {
        Auth.unauthenticateUser()
        this.setState({ isAutenticated: false })
    }

    render(){        
        const { isAutenticated, component, title, redirect } = this.state;
        
        if (!isAutenticated || isAutenticated === undefined){
            return (
                <Redirect push to="/login" />
            );    
        }
    
        console.log(redirect)
        return(
           <React.Fragment>
                <Menu 
                    component={component} 
                    handleLogout={this.handleLogout}
                    title={title}
                />
           </React.Fragment>     
        )
    }

}

export default Controller;
