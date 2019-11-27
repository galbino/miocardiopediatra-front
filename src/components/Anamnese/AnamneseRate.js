import React from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'
import { Menu } from '../components';
import { Paper, Typography, List, ListItem, Button } from '@material-ui/core';
import { PostData } from '../../utils/requests';
import SnackBar from "../../utils/Snackbar";

class AnamneseRate extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAutenticated: Auth.isUserAuthenticated(),
            exams: props.location.state.exams,
            miocardite_rate: props.location.state.miocardite_rate,
            miocardiopatia_rate: props.location.state.miocardiopatia_rate,
            user_id: props.location.state.user_id,
            user_name: props.location.state.user_name,
            redirect: false,
            statusSnack: false,
            displayMessage: "",
            variant: "",
        }
    }

    componentDidMount(){
        
    }


    handleLogout = () => {
        Auth.unauthenticateUser();
        this.setState({ isAutenticated: false })
    }

    handleYes = () => {
        let array = []        
        this.state.exams.map(exam => {
            array.push(exam.id)
        })
        let data = {
            exam_list: array
        }
        PostData("/user/" + this.state.user_id + "/exam", data).then(response => {
            if (response.errors.length === 0) {
                this.setState({ redirect: true })
            } else {
                this.setState({ statusSnack: true, displayMessage: response.errors[0].message, variant: "warning"})
            }
        }).catch(() => this.setState({ statusSnack: true, displayMessage: "Falha ao conectar com o servidor.", variant: "error" }));
        
    }

    handleClose = () => {
        this.setState({ statusSnack: false })
    }
   
    handleNo = () => {
        this.setState({ redirect: true })
    }

    render(){
        const { isAutenticated, miocardiopatia_rate, miocardite_rate, exams, redirect, user_name } = this.state;
        if (!isAutenticated || isAutenticated === undefined){
            return (
                 <Redirect push to="/login" />
            );    
        }

        if (redirect) return <Redirect push to={"/anamnese/" + Auth.getId()} />
       
        const content = (
                <div>
                    <SnackBar
                        statusSnack={this.state.statusSnack}
                        closeSnack={this.handleClose}
                        displayMessage={this.state.displayMessage}
                        variant={this.state.variant}
                    />
                    <Typography variant="h6" gutterBottom>É possível que possua miocardiopatite ou miocardiopatia</Typography>
                    <Typography variant="subtitle2" gutterBottom>Para o diagnóstico desta patologia, os seguintes exames são necessários</Typography>
                    <List>
                            {exams.map((item, index) => {
                                return (
                                    <Paper key={index} style={{marginBottom: "1em"}} elevation={2}>
                                        
                                            <ListItem style={{padding: "1em"}}>
                                                <Typography variant="subtitle2">{index + 1} - {item.name}</Typography>
                                            </ListItem>
                                        
                                    </Paper>
                                
                                )
                            })}
                        
                    </List>
                    <Typography variant="subtitle2" gutterBottom>Deseja adicionar os exames básicos ao prontuário de {user_name}?</Typography>
                    <div style={{marginTop: "1em",display: "flex", justifyContent: "space-evenly"}}>
                        <Button color="primary" variant="contained" onClick={this.handleYes}>Sim</Button>
                        <Button color="secondary" variant="contained" onClick={this.handleNo}>Não</Button>
                    </div>
                    
               </div>
        )

        return(
           <React.Fragment>
               <Menu title="Anamnese" component={content} handleLogout={this.handleLogout} />
           </React.Fragment>     
        )
    }

}

export default AnamneseRate;
