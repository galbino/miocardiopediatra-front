import React from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'
import { Menu } from '../components';
import { Modal, Paper, Grid, RadioGroup, Radio, FormControlLabel, Button, TextField, List, ListItem, MenuItem, Typography, CircularProgress  } from '@material-ui/core';
import PacienteCard from '../Card/PacienteCard';
import { PostData, GetData } from '../../utils/requests';
import SnackBar from "../../utils/Snackbar";
import { Route } from 'react-router-dom';

class AnamneseList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAutenticated: Auth.isUserAuthenticated(),
            user_id: props.match.params.id,
            anamneses: [],
            displayMessage: "",
            statusSnack: false,
            variant: "",
            isLoading: true,
            user_name: "",
        }
    }

    componentDidMount(){
        GetData("/user/"+this.state.user_id+"/anamnese").then(response => {
            if (response.errors.length === 0){
                this.setState({ anamneses: response.data, isLoading: false, user_name: response.data[0].user_name })
            } else {
                this.setState({ statusSnack: true, displayMessage: response.errors[0].message, variant: "warning" })
            }
        }).catch(() => this.setState({ statusSnack: true, displayMessage: "Ocorreu um erro.", variant: "error" }));
    }

    handleClose = () => {
        this.setState({ statusSnack: false })
    }

    handleLogout = () => {
        Auth.unauthenticateUser();
        this.setState({ isAutenticated: false })
    }

    handleClick = (id, history) => {
        return history.push('/info/' + id) 
    }

    render(){
        const { isAutenticated, anamneses, isLoading, user_name } = this.state;
        
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
                <Typography variant="h5" gutterBottom align="center">Listagem de Anamneses: {user_name} </Typography>
                {isLoading ?
                    <div style={{position: "absolute", marginTop: "25%", left: "50%"}}>
                        <CircularProgress />
                    </div>
                :
                <List>
                        {anamneses.map((item, index) => {
                            return (
                                <Paper key={index} style={{marginBottom: "1em"}} elevation={2}>
                                    <Route render={({ history }) => (
                                        <ListItem style={{padding: "1em"}} button onClick={() => this.handleClick(item.anamnese_id, history)}>
                                            <Typography variant="subtitle2">{index + 1} - {item.template.name}</Typography>
                                        </ListItem>
                                    )}/>
                                </Paper>
                               
                            )
                        })}
                    
                </List>
                }
            </React.Fragment>
        )

        return(
           <React.Fragment>
               <Menu title="Anamneses" component={content} handleLogout={this.handleLogout} />
           </React.Fragment>     
        )
    }

}

export default AnamneseList;
