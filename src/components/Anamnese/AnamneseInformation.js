import React from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'
import { Menu } from '../components';
import { Paper, Grid, RadioGroup, Radio, FormControlLabel, Button, TextField, List, ListItem, ListItemText, MenuItem, Typography, CircularProgress  } from '@material-ui/core';
import PacienteCard from '../Card/PacienteCard';
import { MdDone, MdClose } from 'react-icons/md';
import { PostData, GetData } from '../../utils/requests';
import SnackBar from "../../utils/Snackbar";
import { Route } from 'react-router-dom';

class AnamneseInformation extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAutenticated: Auth.isUserAuthenticated(),
            anamnese_id: props.match.params.id,
            anamnese: {},
            displayMessage: "",
            statusSnack: false,
            variant: "",
            isLoading: true,
            anamnese_name: ""
        }
    }

    componentDidMount(){
        GetData("/anamnese/" + this.state.anamnese_id).then(response => {
            if (response.errors.length === 0){
                this.setState({ anamnese: response.data, isLoading: false, anamnese_name: response.data.template.name })
            } else {
                this.setState({ statusSnack: true, displayMessage: response.errors[0].message, variant: "warning" })
            }
        }).catch(() => this.setState({ statusSnack: true, displayMessage: "Falha de conexão com o servidor", variant: "error" }));
    }

    handleClose = () => {
        this.setState({ statusSnack: false })
    }

    handleLogout = () => {
        Auth.unauthenticateUser();
        this.setState({ isAutenticated: false })
    }

    handleClick = () => {
        
    }

    render(){
        const { isAutenticated, anamnese, isLoading, anamnese_name } = this.state;
        
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
                <Typography variant="h5" gutterBottom align="center">{anamnese_name}: {this.state.anamnese_id}</Typography>
                {isLoading ?
                    <div style={{position: "absolute", marginTop: "25%", left: "50%"}}>
                        <CircularProgress />
                    </div>
                :
                <List>
                        {anamnese.questions.map((item, index) => {
                            return (
                                <Paper key={index} style={{marginBottom: "1em"}} elevation={2}>
                                        <ListItem style={{padding: "1em", justifyContent: "space-evenly"}}>
                                                <div style={{width: "385px", width: "385px"}}>
                                                    <Typography variant="subtitle2">{item.question}</Typography>
                                                </div>
                                                <div style={{position: "relative", marginTop: "5px"}}>
                                                    {item.answer === 1 ?
                                                            <MdDone size="25px" color="green"/>
                                                    :
                                                            <MdClose size="25px" color="red"/>
                                                    }
                                                </div>
                                                
                                        </ListItem>    
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

export default AnamneseInformation;
