import React from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'
import { Menu, HomePage, Pacientes } from '../components';


class Controller extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAutenticated: Auth.isUserAuthenticated(),
            page: 0,
            title: "Homepage",
            component: <HomePage/>
        }
    }

    handleChangePage = (page) => {
        switch(page){
            case 0:
                return this.setState({ page: page, component: < HomePage/>, title: "Homepage" })
            case 1:
                return this.setState({ page: page, component: < Pacientes/>, title: "Listagem de Pacientes" })
            case 2: 
                return this.setState({ page: page, component: < Pacientes/>, title: "Meu Perfil" })
            default:
                return this.setState({ page: page, component: < HomePage/>, title: "Homepage" })
        }
        
    }

    handleLogout = () => {
        Auth.unauthenticateUser()
        this.setState({ isAutenticated: false })
    }

    render(){        
        const { isAutenticated, component, title } = this.state;
        if (!isAutenticated || isAutenticated === undefined){
            return (
                <Redirect push to="/login" />
            );    
        }

        return(
           <React.Fragment>
               <Menu 
                    component={component} 
                    handleChangePage={this.handleChangePage}
                    handleLogout={this.handleLogout}
                    title={title}
                />
           </React.Fragment>     
        )
    }

}

export default Controller;
