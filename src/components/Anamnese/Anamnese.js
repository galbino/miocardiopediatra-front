import React, { Fragment } from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'
import { Menu } from '../components';
import NewPaciente from '../Pacientes/NewPaciente';
import { Modal, Paper, Grid, RadioGroup, Radio, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, FormControlLabel, Button, Typography, CircularProgress, FormGroup, Switch  } from '@material-ui/core';
import SnackBar from "../../utils/Snackbar";
import { default as ReactSelect } from 'react-select';
import { PostData, GetData, PatchData } from '../../utils/requests';
import { MdExpandMore, MdDone, MdClose, MdAdd } from 'react-icons/md';

class Anamnese extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAutenticated: Auth.isUserAuthenticated(),
            is_doctor: Auth.getRole(),
            pacient_id: props.match.params.id,
            listPacientes: [],
            paciente: null,
            anamnese: "",
            isLoading: true,
            loading_questions: false,
            openModal: false,
            redirect: false,
            anamneses: [],
            listQuestions: [],
            questions: [],
            displayMessage: "",
            statusSnack: false,
            variant: "",
            my_anamnese: true,
            loading_anamneses: true,
            minhas_anamneses: [],
            my_questions: [], 
            exams: null,
            miocardiopatia_rate: null,
            miocardite_rate: null,
            continue_anamnese: false,
        }
    }

    componentDidMount(){
        GetData("/patient").then(response => {
            if (response.errors.length === 0){
                let pacientes = []
                let paciente = this.state.paciente
                response.data.map((item, i) => {
                    if (this.state.pacient_id !== Auth.getId() && this.state.pacient_id === item.id) {
                        paciente = [{id: item.id, name: item.name, label: item.name}]
                    }
                    pacientes.push({id: item.id, name: item.name, label: item.name})
                })
                this.setState({ listPacientes: pacientes, isLoading: false, paciente: paciente })
            } else {
                this.setState({ statusSnack: true, displayMessage: response.errors[0].message, variant: "warning"})
            }
        }).catch(() => this.setState({ statusSnack: true, displayMessage: "Falha de conexão com o servidor", variant: "error" }));
        
        GetData("/anamnese/template").then(response => {
            if (response.errors.length === 0){
                let anamneses = []
                response.data.map((item, i) => {
                    anamneses.push({id: item.id, name: item.name, label: item.name})
                })
                this.setState({ anamneses: anamneses, isLoading: false })
            } else {
                this.setState({ statusSnack: true, displayMessage: response.errors[0].message, variant: "warning"})
            }
        }).catch(() => this.setState({ statusSnack: true, displayMessage: "Falha de conexão com o servidor", variant: "error" }));

        GetData("/anamnese").then(response => {
            if (response.errors.length === 0){
                this.setState({ minhas_anamneses: response.data, loading_anamneses: false })
            } else {
                this.setState({ statusSnack: true, displayMessage: response.errors[0].message, variant: "warning"})
            }
        }).catch(() => this.setState({ statusSnack: true, displayMessage: "Falha de conexão com o servidor", variant: "error" }));
       
        
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.my_anamnese !== this.state.my_anamnese){
            GetData("/anamnese").then(response => {
                if (response.errors.length === 0){
                    this.setState({ minhas_anamneses: response.data, loading_anamneses: false })
                } else {
                    this.setState({ statusSnack: true, displayMessage: response.errors[0].message, variant: "warning"})
                }
            }).catch(() => this.setState({ statusSnack: true, displayMessage: "Falha de conexão com o servidor", variant: "error" }));
        }
    }

    handleClose = () => {
        this.setState({ statusSnack: false })
    }

    handleLogout = () => {
        Auth.unauthenticateUser();
        this.setState({ isAutenticated: false })
    }

    handlePacienteChange = (e) => {
        this.setState({ paciente: e })
    }

    handleQuestionChange = (e, index, id) => {
        let questions = this.state.questions
        questions[id] = e.target.value
        this.setState({ questions: questions })
    }

    handleEditChange = (e, j, index) => {
        e.stopPropagation()
        let my_questions = this.state.minhas_anamneses[j].questions
        my_questions[index].answer = e.target.value
        this.setState({ my_questions: my_questions })
    }

    handleConfirmarEdit = (e, j, anamnese_id) => {
        e.stopPropagation()
        let questions = this.state.minhas_anamneses[j].questions
        let q = {}
        questions.map((question, i) => {
            q[i+1] = Number(question.answer)
        })
        let data = {
            questions: q
        };
        PatchData("/anamnese/" + anamnese_id, data).then(response => {
            if (response.errors.length === 0) {
                let anamneses = this.state.minhas_anamneses
                anamneses[j].isEditing = false
                this.setState({
                    statusSnack: true,
                    displayMessage: "Anamnese atualizada com sucesso.", 
                    variant: "success",
                    anamneses: anamneses
                })
            } else {
                this.setState({ statusSnack: true, displayMessage: response.errors[0].message, variant: "warning"})
            }
        }).catch(() => this.setState({ statusSnack: true, displayMessage: "Falha de conexão com o servidor", variant: "error" }));
    }

    handleAnamneseChange = (e) => {
        if (e === null) return this.setState({ loading_questions: false, questions: e, listQuestions: [], anamnese: "" })
        this.setState({ anamnese: e, loading_questions: true })
        GetData("/anamnese/template/" + e.id).then(response => {
            if (response.errors.length === 0){
                let questions = {}
                response.data.questions.map((item, i) => {
                    questions[item.id] = ""
                })
                this.setState({ listQuestions: response.data.questions, questions: questions, loading_questions: false })
            } else {
                this.setState({ statusSnack: true, displayMessage: response.errors[0].message, variant: "warning"})
            }
        }).catch(() => this.setState({ statusSnack: true, displayMessage: "Falha de conexão com o servidor", variant: "error" }));
    }

    handleNewUser = (data) => {
        let array = this.state.listPacientes;
        let info = { id: data.id, value: data.name, label: data.name }
        array.unshift(info);
        this.setState({ listPacientes: array, openModal: false, statusSnack: true, displayMessage: "Cadastrado com sucessso.", variant: "success", })
    }

    handleContinueAnamnese = () => {
        if (this.state.questions === null) return this.setState({statusSnack: true, displayMessage: "Preencha todos os campos.", variant: "warning"})
        let isRespostaEmpty = false;
        Object.keys(this.state.questions).map(key => {
            if (this.state.questions[key] === "") {
                return isRespostaEmpty = true
            } 
        })
        if (this.state.paciente === null || this.state.anamnese === null || isRespostaEmpty) {
            return this.setState({
                statusSnack: true,
                displayMessage: "Preencha todos os campos.", 
                variant: "warning"
            })
        }
        let data = {
            patient_id: Array.isArray(this.state.paciente) ? this.state.paciente[0].id : this.state.paciente.id,
            template_id: this.state.anamnese.id,
            questions: this.state.questions
        };
        PostData("/anamnese", data).then(response => {
            if (response.errors.length === 0) {
                this.setState({
                    statusSnack: true,
                    displayMessage: "Anamnese cadastrada com sucesso.", 
                    variant: "success", 
                    exams: response.data.exams,
                })
                if (Number(response.data.miocardiopatia_rate) >= 0.75 || Number(response.data.miocardite_rate) >= 0.75){
                    this.setState({    
                        miocardiopatia_rate: Number(response.data.miocardiopatia_rate),
                        miocardite_rate: Number(response.data.miocardite_rate),
                        continue_anamnese: true,
                    })
                }

            } else {
                this.setState({ statusSnack: true, displayMessage: response.errors[0].message, variant: "warning"})
            }
        }).catch(() => this.setState({ statusSnack: true, displayMessage: "Falha de conexão com o servidor", variant: "error" }));
        
    }

    handleExpand = (e, anamnese_id, j) => {
        e.stopPropagation()
        GetData("/anamnese/" + anamnese_id).then(response => {
            if (response.errors.length === 0){
                let anamneses = this.state.minhas_anamneses
                anamneses[j].questions = response.data.questions               
                this.setState({ minhas_anamneses: anamneses })
            } else {
                this.setState({ statusSnack: true, displayMessage: response.errors[0].message, variant: "warning"})
            }
        }).catch(() => this.setState({ statusSnack: true, displayMessage: "Falha de conexão com o servidor", variant: "error" }));
    }

    handleMyAnamnese = () => {
        this.setState({ my_anamnese: !this.state.my_anamnese, listQuestions: [] })
    }

    handleOpenModalPaciente = () => {
        this.setState({ openModal: true })
    }

    handleCloseModalPaciente = () => {
        this.setState({ openModal: false })
    }

    handleEdit = (e, j) => {
        e.stopPropagation()
        let anamneses = this.state.minhas_anamneses
        anamneses[j].isEditing = !anamneses[j].isEditing
        this.setState({ minhas_anamneses: anamneses })
    }

    render(){
        const { isAutenticated, paciente, anamnese, anamneses, is_doctor, openModal, loading_questions, listPacientes, listQuestions, loading_anamneses, my_anamnese, isLoading } = this.state;
        if (!isAutenticated || isAutenticated === undefined){
            return (
                 <Redirect push to="/login" />
            );    
        } 

        if (this.state.continue_anamnese) {
            return (
                <Redirect to={{ pathname: "/anamnese-rate", state: { exams: this.state.exams, 
                                                                     miocardiopatia_rate: this.state.miocardiopatia_rate,
                                                                     miocardite_rate: this.state.miocardiopatia_rate,
                                                                     user_id: this.state.paciente.id,
                                                                     user_name: this.state.paciente.name
                                                                    }}} />
            )
        }
        const content = (
            <React.Fragment>
                <Modal className="modal-paciente" open={openModal} onClose={this.handleCloseModalPaciente} closeAfterTransition >
                    <Paper className="paper">
                        <NewPaciente handleNewUser={this.handleNewUser} />
                    </Paper>
                </Modal>
            
                <SnackBar
                    statusSnack={this.state.statusSnack}
                    closeSnack={this.handleClose}
                    displayMessage={this.state.displayMessage}
                    variant={this.state.variant}
                />
                
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Switch checked={my_anamnese} color="primary" onChange={this.handleMyAnamnese} value="checkedA" />
                        }
                        label="Listagem de Anamneses"
                    />
                </FormGroup>
                
                

                {!my_anamnese ?  
                 <Fragment>
                     <div style={{margin: "1em"}}>
                         <Typography variant="h5" gutterBottom align="center">Criar uma Anamnese</Typography>
                     </div>
                    <Paper style={{marginBottom: "1em"}} className="paper">        
                        <Button className="btn-add" disabled={paciente !== null} variant="contained" color="primary" onClick={this.handleOpenModalPaciente}>
                            <MdAdd size={25} /> Novo Paciente
                        </Button>               
                        <Typography variant="subtitle2" gutterBottom>Selecione o Paciente</Typography>
                        <ReactSelect
                        
                            isSearchable
                            value={paciente}
                            options={listPacientes}
                            isLoading={isLoading}
                            
                            onChange={(e) => this.handlePacienteChange(e)}
                            isClearable
                            noOptionsMessage={ () => "Nenhum paciente encontrado" }
                        />    
                     
                    </Paper>
                    <Paper style={{marginBottom: "1em"}} className="paper">
                        <Typography variant="subtitle2" gutterBottom>Selecione a Anamnese</Typography>
                        <ReactSelect
                            isSearchable
                            options={anamneses}
                            isLoading={isLoading}
                            value={anamnese}
                            onChange={(e) => this.handleAnamneseChange(e)}
                            isClearable
                            noOptionsMessage={ () => "Nenhuma anmnese encontrada" }
                        />
                    </Paper>
                   
                        {loading_questions ?
                            <div style={{position: "absolute", marginTop: "5%", marginBottom: "5%", left: "50%"}}>
                                <CircularProgress />
                            </div>
                        :
                            <div>
                                {listQuestions.map((item, index) => {
                                    return (
                                        <Paper key={index} style={{marginTop: "1em", marginBottom: "1em"}}  className="paper">
                                            <Grid container alignContent="center" alignItems="center" spacing={1}>
                                                <Grid item xs>
                                                    <Typography variant="subtitle2">{item.label}</Typography>
                                                    <RadioGroup aria-label={item.name} name={item.name} value={item.value} onChange={(e) => this.handleQuestionChange(e, index, item.id)} row>
                                                        <FormControlLabel
                                                            value={"1"}
                                                            control={<Radio color="primary" />}
                                                            label="Sim"
                                                            labelPlacement="end"
                                                        />
                                                        <FormControlLabel
                                                            value={"0"}
                                                            control={<Radio color="primary" />}
                                                            label="Nao"
                                                            labelPlacement="end"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    )
                                })}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleContinueAnamnese}
                                >
                                    Cadastrar
                                </Button>
                            </div>
                        }

                    
                
                    </Fragment>
                :
                    <Fragment>
                        {loading_anamneses ?
                            <div style={{position: "absolute", marginTop: "20%", marginBottom: "5%", left: "50%"}}>
                                <CircularProgress />
                            </div>
                        :
                            this.state.minhas_anamneses.map((item, j) => {
                                return (
                                    <Paper key={j} style={{marginTop: "1em"}} elevation={2}>
                                         <ExpansionPanel onClick={(e) => this.handleExpand(e, item.anamnese_id, j)} >
                                            <ExpansionPanelSummary
                                                expandIcon={<MdExpandMore />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                            >
                                            <Typography style={{flexBasis: "33.33%", flexShrink: "0"}}>{item.template.name}</Typography>
                                            <Typography style={{flexBasis: "33.33%", flexShrink: "0", color: "grey"}}>{item.user_name}</Typography>

                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Grid container alignContent="center" alignItems="center">
                                                    <Grid item xs>
                                                        
                                                        {item.questions ?
                                                            <Fragment>
                                                                {item.questions.map((question, index) => 
                                                                        <Paper key={index} style={{display: "flex", flexDirection: "row", marginBottom: "1em",  justifyContent: "space-evenly"}}  className="paper">
                                                                            <div style={{width: "385px", width: "385px",  marginTop: "5px"}}>
                                                                                <Typography variant="subtitle2">{question.question}</Typography>
                                                                            </div>
                                                                            <div style={{position: "relative", marginTop: "5px"}}>
                                                                                {item.isEditing ? 
                                                                                    <RadioGroup value={(question.answer).toString()} onClick={(e) => e.stopPropagation()} onChange={(e) => this.handleEditChange(e, j, index)} row>
                                                                                        <FormControlLabel
                                                                                            value={"1"}
                                                                                            control={<Radio color="primary" />}
                                                                                            label="Sim"
                                                                                            labelPlacement="end"
                                                                                        />
                                                                                        <FormControlLabel
                                                                                            value={"0"}
                                                                                            control={<Radio color="primary" />}
                                                                                            label="Nao"
                                                                                            labelPlacement="end"
                                                                                        />
                                                                                    </RadioGroup>
                                                                                :
                                                                                    question.answer === 1 ?
                                                                                            <MdDone size="25px" color="green"/>
                                                                                    :
                                                                                            <MdClose size="25px" color="red"/>
                                                                                }
                                                                            </div>
                                                                        </Paper>
                                                                )}
                                                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                                                    <Button style={{width: "8em"}} color="primary" variant="contained" onClick={(e) => this.handleEdit(e, j)}>
                                                                        {item.isEditing ? "Cancelar" : "Editar"}
                                                                    </Button>
                                                                    {item.isEditing &&
                                                                        <Button style={{width: "8em", background: "green", color: "#FFF"}} variant="contained" onClick={(e) => this.handleConfirmarEdit(e, j, item.anamnese_id)}>
                                                                            Confirmar
                                                                        </Button>
                                                                    }
                                                                </div>
                                                            </Fragment>
                                                         :
                                                            <div style={{position: "relative", marginTop: "5%", marginBottom: "5%", left: "50%"}}>
                                                                <CircularProgress />
                                                            </div>
                                                        }
                                                        
                                                      
                                                    </Grid>
                                                </Grid>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </Paper>
                                   
                                )
                            })
                        }

                    </Fragment>
                } 
                
            </React.Fragment>
        )

        return(
           <React.Fragment>
               <Menu title="Anamnese" component={content} handleLogout={this.handleLogout} />
           </React.Fragment>     
        )
    }

}

export default Anamnese;
