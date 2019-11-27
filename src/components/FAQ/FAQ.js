import React from 'react';
import Auth from '../../utils/Auth';
import { Menu } from '../components';
import { Redirect } from 'react-router'
import { Modal, TextField, Paper, Grid, RadioGroup, Radio, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, FormControlLabel, Button, Typography, CircularProgress, FormGroup, Switch  } from '@material-ui/core';
import SnackBar from "../../utils/Snackbar";
import { PostData, GetData, PatchData } from '../../utils/requests';
import { MdExpandMore } from 'react-icons/md';

export default class FAQ extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAutenticated: Auth.isUserAuthenticated(),
            is_doctor: Auth.getRole(),
            minhas_perguntas: false,
            list_respondidas: [],
            list_nao_respondidas: [],
            isLoading: true,
            question: "",
            resposta: "",
            isEditing: false,
        }
    }

    componentDidMount(){
        GetData("/faq?answered=" + 1).then(response => {
            if (response.errors.length === 0){
                this.setState({ list_respondidas: response.data, isLoading: false })
            } else {
                this.setState({ statusSnack: true, displayMessage: response.errors[0].message, variant: "warning"})
            }
        }).catch(() => this.setState({ statusSnack: true, displayMessage: "Falha ao conectar com o servidor.", variant: "error" }));

        GetData("/faq?answered=" + 0).then(response => {
            if (response.errors.length === 0){
                this.setState({ list_nao_respondidas: response.data, isLoading: false })
            } else {
                this.setState({ statusSnack: true, displayMessage: response.errors[0].message, variant: "warning"})
            }
        }).catch(() => this.setState({ statusSnack: true, displayMessage: "Falha ao conectar com o servidor.", variant: "error" }));

    }

    handleLogout = () => {
        Auth.unauthenticateUser();
        this.setState({ isAutenticated: false })
    }

    handleEdit = (e, j) => {
        e.stopPropagation()
        let list_respondidas = this.state.list_respondidas
        list_respondidas[j].isEditing = !list_respondidas[j].isEditing
        this.setState({ list_respondidas: list_respondidas })
    }

    handleConfirmarEdit = (e, j, pergunta_id) => {
        if (this.state.resposta === "") return  this.setState({ statusSnack: true, displayMessage: "Preencha todos os campos.", variant: "warning"})
        let data = {
            answer: this.state.resposta
        }
        PatchData("/faq/" + pergunta_id, data).then(response => {
            if (response.errors.length === 0) {
                this.setState({
                    statusSnack: true,
                    displayMessage: "Resposta atualizada com sucesso.", 
                    variant: "success",
                    isEditing: false,
                    resposta: ""
                })
            } else {
                this.setState({ statusSnack: true, displayMessage: response.errors[0].message, variant: "warning"})
            }
        }).catch(() => this.setState({ statusSnack: true, displayMessage: "Falha ao se conectar com o servidor.", variant: "error" }));
    }

    handleMyQuestions = () => {
        this.setState({ minhas_perguntas: !this.state.minhas_perguntas })
    }

    handleNewQuestion = () => {
        if (this.state.question === "") return this.setState({ statusSnack: true, displayMessage: "Preencha o campo.", variant: "warning"})
        let data = {
            question: this.state.question
        }
        PostData("/faq", data).then(response => {
            let list_nao_respondidas = this.state.list_nao_respondidas
            list_nao_respondidas.unshift(response.data)
            if (response.errors.length === 0) {
                this.setState({
                    statusSnack: true,
                    displayMessage: "Pergunta criada com sucesso.", 
                    variant: "success",
                    question: "",
                    list_nao_respondidas: list_nao_respondidas
                })
            } else {
                this.setState({ statusSnack: true, displayMessage: response.errors[0].message, variant: "warning"})
            }
        }).catch(() => this.setState({ statusSnack: true, displayMessage: "Falha de conexão com o servidor.", variant: "error" }));
    }

    handleResponder = (pergunta_id) => {
        if (this.state.resposta === "") return this.setState({ statusSnack: true, displayMessage: "Preencha o campo.", variant: "warning"})
        let data = {
            answer: this.state.resposta
        }
        PatchData("/faq/" + pergunta_id, data).then(response => {
            if (response.errors.length === 0) {
                this.setState({
                    statusSnack: true,
                    displayMessage: "Pergunta respondida com sucesso.", 
                    variant: "success",
                    resposta: ""
                })
            } else {
                this.setState({ statusSnack: true, displayMessage: response.errors[0].message, variant: "warning"})
            }
        }).catch(() => this.setState({ statusSnack: true, displayMessage: "Falha de conexão com o servidor.", variant: "error" }));
    }

    handleChange = (e) => {
        let name = e.target.name
        this.setState({ [name]: e.target.value })

    }

    render(){
        const  { isAutenticated, minhas_perguntas, isLoading, is_doctor, question, resposta, list_nao_respondidas, list_respondidas } = this.state;
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
                        label="Perguntas Respondidas"
                    />
                </FormGroup>
                {minhas_perguntas ?
                    <React.Fragment>
                        {isLoading ? 
                            <div style={{position: "absolute", marginTop: "15%", marginBottom: "5%", left: "50%"}}>
                                <CircularProgress />
                            </div>
                        :
                            <React.Fragment>
                                <div style={{margin: "1em"}}>
                                    <Typography variant="h5" gutterBottom align="center">Listagem de Perguntas</Typography>
                                </div>
                                {list_respondidas.map((pergunta, j) => {
                                    return <React.Fragment>
                                               <Paper key={j} style={{marginTop: "1em"}} elevation={2}>
                                                    <ExpansionPanel>
                                                        <ExpansionPanelSummary
                                                            expandIcon={<MdExpandMore />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                        <Typography style={{flexBasis: "33.33%", flexShrink: "0"}}>{pergunta.asked_by}</Typography>
                                                        <Typography style={{flexBasis: "33.33%", flexShrink: "0", color: "grey"}}>{pergunta.creation_date}</Typography>

                                                        </ExpansionPanelSummary>
                                                        <ExpansionPanelDetails style={{display: "block"}}>
                                                            <Grid container alignContent="center" alignItems="center">
                                                                <Grid item xs>
                                                                    <Typography style={{flexBasis: "33.33%", flexShrink: "0", color: "grey"}} gutterBottom>{pergunta.question}</Typography>
                                                                    
                                                                    {!pergunta.isEditing ? 
                                                                        <Typography variant="subtitle2" gutterBottom>
                                                                            {pergunta.answer}
                                                                        </Typography> 
                                                                    :
                                                                        <div style={{marginBottom: "1em"}}>
                                                                            <TextField
                                                                                name="resposta"
                                                                                variant="outlined"
                                                                                label="Editar Resposta"
                                                                                fullWidth
                                                                                multiline
                                                                                rows="3"
                                                                                value={this.state.resposta}
                                                                                onChange={(e) => this.handleChange(e)}
                                                                            />

                                                                        </div>
                                                                        

                                                                        
                                                                    }
                                                                </Grid>
                                                            </Grid>
                                                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                                                    {this.state.is_doctor == 1 && 
                                                                        <Button style={{width: "8em"}} color="primary" variant="contained" onClick={(e) => this.handleEdit(e, j)}>
                                                                            {pergunta.isEditing ? "Cancelar" : "Editar"}
                                                                        </Button>
                                                                    }
                                                                    {pergunta.isEditing &&
                                                                        <Button style={{width: "8em", background: "green", color: "#FFF"}} variant="contained" onClick={(e) => this.handleConfirmarEdit(e, j, pergunta.id)}>
                                                                            Confirmar
                                                                        </Button>
                                                                    }
                                                             </div>
                                                                   
                                                            
                                                        </ExpansionPanelDetails>
                                                        
                                                    </ExpansionPanel>
                                                </Paper>
                                            </React.Fragment>
                                })}
                            </React.Fragment>
                        }
                    </React.Fragment>
                : 
                    <React.Fragment>
                        {isLoading ? 
                            <div style={{position: "absolute", marginTop: "5%", marginBottom: "5%", left: "50%"}}>
                                <CircularProgress />
                            </div>
                        :
                            <React.Fragment>
                                
                                {is_doctor == 0 &&
                                    <React.Fragment>
                                        <div style={{margin: "1em"}}>
                                            <Typography variant="h5" gutterBottom align="center">Criar uma Pergunta</Typography>
                                        </div>
                                    
                                        <Paper style={{marginBottom: "1em"}} className="paper">        
                                            {/* <Button className="btn-add" disabled={question === ""} variant="contained" color="primary" onClick={this.handleOpenModalPaciente}>
                                                <MdAdd size={25} /> Nova Pergunta
                                            </Button>                */}

                                            <Typography variant="subtitle2" gutterBottom>Escreva a Pergunta</Typography>
                                            <TextField
                                                label="Pergunta"
                                                name="question"
                                                multiline
                                                rowsMax="4"
                                                rows="4"
                                                fullWidth
                                                value={question}
                                                onChange={(e) => this.handleChange(e)}
                                                variant="outlined"
                                            />
                                            <div style={{marginTop: "1em"}}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.handleNewQuestion}
                                                >
                                                    Enviar
                                                </Button>
                                            </div>

                                        </Paper>
                                    </React.Fragment>
                                }
                                <div style={{margin: "1em"}}>
                                    <Typography variant="h5" gutterBottom align="center">Perguntas não respondidas</Typography>
                                </div>
                                {list_nao_respondidas.map((pergunta, index) => {
                                    return <React.Fragment>
                                                
                                               <Paper key={index} style={{marginTop: "1em"}} elevation={2}>
                                                    <ExpansionPanel>
                                                        <ExpansionPanelSummary
                                                            expandIcon={<MdExpandMore />}
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                        <Typography style={{flexBasis: "33.33%", flexShrink: "0"}}>{pergunta.asked_by}</Typography>
                                                        <Typography style={{flexBasis: "33.33%", flexShrink: "0", color: "grey"}}>{pergunta.creation_date}</Typography>

                                                        </ExpansionPanelSummary>
                                                        <ExpansionPanelDetails>
                                                            <Grid container alignContent="center" alignItems="center">
                                                                <Grid item xs>
                                                                    <Typography variant="subtitle2" gutterBottom>{pergunta.question}</Typography>
                                                                    {is_doctor == 1 &&
                                                                        <React.Fragment>
                                                                            <TextField
                                                                                label="Resposta"
                                                                                multiline
                                                                                rowsMax="4"
                                                                                name="resposta"
                                                                                rows="4"
                                                                                fullWidth
                                                                                value={resposta}
                                                                                onChange={(e) => this.handleChange(e)}
                                                                                variant="outlined"
                                                                            />
                                                                            <div style={{marginTop: "1em"}}>
                                                                                <Button
                                                                                    variant="contained"
                                                                                    color="primary"
                                                                                    onClick={() => this.handleResponder(pergunta.id)}
                                                                                >
                                                                                    Responder
                                                                                </Button>
                                                                            </div>
                                                                        </React.Fragment>
                                                                    }
                                                                </Grid>
                                                            </Grid>
                                                        </ExpansionPanelDetails>
                                                    </ExpansionPanel>
                                                </Paper>
                                           </React.Fragment>
                                })}
                            </React.Fragment>
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