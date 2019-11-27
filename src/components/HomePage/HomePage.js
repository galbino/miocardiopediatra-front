import React from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'
import { Menu } from '../components';
import { Paper, Typography } from '@material-ui/core';
import Image from '../logo-miocardio.png'

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
                   <Paper className="profile-paper">
                        <Typography variant="h6" align="center" gutterBottom>
                            Esta aplicação tem como objetivo servir para a avaliação da disciplina Engenharia de Software 2019.2
                        </Typography>
                        <Typography component="div" align="center" gutterBottom>

                            <img width="500px" alt="front-img" src={Image}></img>
                        </Typography>
                        


                   </Paper>
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
