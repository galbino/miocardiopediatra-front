import React from 'react';
import Auth from '../../utils/Auth';
import { Menu } from '../components';
import { Redirect } from 'react-router'
import { Modal, Paper, Grid, RadioGroup, Radio, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, FormControlLabel, Button, Typography, CircularProgress, FormGroup, Switch  } from '@material-ui/core';
import SnackBar from "../../utils/Snackbar";

export default class FAQ extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAutenticated: Auth.isUserAuthenticated(),
            minhas_perguntas: true,
            isLoading: true,
        }
    }

    componentDidMount(){

    }

    handleLogout = () => {
        Auth.unauthenticateUser();
        this.setState({ isAutenticated: false })
    }

    handleMyQuestions = () => {
        this.setState({ minhas_perguntas: !this.state.minhas_perguntas })
    }

    render(){
        const  { isAutenticated, minhas_perguntas, isLoading } = this.state;
        if (!isAutenticated || isAutenticated === undefined){
            return (
                 <Redirect push to="/login" />
            );    
        }
       
        const content = (
            <React.Fragment>
                <SnackBar
                        statusSnack={this.state.statusSnack}
                        closeSnack={this.handleClose}
                        displayMessage={this.state.displayMessage}
                        variant={this.state.variant}
                />
                 <FormGroup row>
                    <FormControlLabel
                        control={
                            <Switch checked={minhas_perguntas} color="primary" onChange={this.handleMyQuestions} />
                        }
                        label="Minhas Perguntas"
                    />
                </FormGroup>
                {minhas_perguntas ?
                    <React.Fragment>
                        {isLoading ? 
                            <div style={{position: "absolute", marginTop: "15%", marginBottom: "5%", left: "50%"}}>
                                <CircularProgress />
                            </div>
                        :
                            "Componente de listagem de pergunta"
                        }
                    </React.Fragment>
                : 
                    <React.Fragment>
                        {isLoading ? 
                            <div style={{position: "absolute", marginTop: "5%", marginBottom: "5%", left: "50%"}}>
                                <CircularProgress />
                            </div>
                        :
                            "Componente de criação de pergunta"
                        }
                    </React.Fragment>
                }
            </React.Fragment>
                  
        )

        return(
           <React.Fragment>
               <Menu title="FAQ" component={content} handleLogout={this.handleLogout} />
           </React.Fragment>     
        )
    }
}