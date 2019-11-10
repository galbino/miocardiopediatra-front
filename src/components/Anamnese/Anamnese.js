import React from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'
import { Menu } from '../components';
import { Modal, Paper, Grid, RadioGroup, Radio, FormControlLabel, Button, TextField, MenuItem, Typography  } from '@material-ui/core';
import PacienteCard from '../Card/PacienteCard';
import { MdAdd } from 'react-icons/md';
import NewPaciente from '../Pacientes/NewPaciente';
import { default as ReactSelect } from 'react-select';
import { PostData, GetData } from '../../utils/requests';

class Anamnese extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAutenticated: Auth.isUserAuthenticated(),
            listPacientes: [{ id: "",  label: "vv", value: "vv" }, { id: "", label:"gugu", value: "gugu"}],
            paciente: null,
            isLoading: true,
            openModal: false,
            redirect: false,
            anamnese: [
                {
                    question: "Apresenta dispineia aos esforcos?",
                    name: "dispineia",
                    value: ""
                },
                {
                    question: "Esta constantemente fadigado?",
                    name: "fadigado",
                    value: ""
                },
                {
                    question: "Possui angina?",
                    name: "angina",
                    value: ""
                },
                {
                    question: "Comentou casos de sincope ou pre-sincope?",
                    name: "sincope",
                    value: ""
                },
                {
                    question: "Experimentou palpitacoes?",
                    name: "palpitacoes",
                    value: ""
                }
            ],
        
        }
    }

    componentDidMount(){
        GetData("/patient").then(response => {
            if (response.errors.lenght === 0){
                this.setState({ listPacientes: response.data, isLoading: false })
            } else {
                console.log("erro ao carregar")
                this.setState({ isLoading: false })
            }
        }).catch(() => this.setState({ isLoading: false }));
        // GetData("/anamnese/" + Auth.getId()).then(response => {
        //     if (response.errors.lenght === 0){
        //         //this.setState({ listPacientes: response.data, isLoading: false })
        //     } else {
        //         console.log("erro ao carregar")
        //         this.setState({ isLoading: false })
        //     }
        // }).catch(() => this.setState({ isLoading: false }));

    }

    handleLogout = () => {
        Auth.unauthenticateUser();
        this.setState({ isAutenticated: false })
    }

    handlePacienteChange = (e) => {
        this.setState({ paciente: e })
    }

    handleAnamneseChange = (event, index) => {
        let array = this.state.anamnese;
        array[index].value = event.target.value
        this.setState({ anamnese: array })
    }

    handleNewUser = (data) => {
        let array = this.state.listPacientes;
        let info = { id: data.id, value: data.name, label: data.name }
        array.unshift(info);
        this.setState({ listPacientes: array })
    }

    handleContinueAnamnese = () => {
        let data = {};
        PostData("url/" + this.state.paciente.id , data).then(response => {
            if (response.errors.length === 0) {
                this.setState({ redirect: "listagemAnamnese" + response.data.id })
            } else {
                
            }
        });
        
    }

    handleOpenModalPaciente = () => {
        this.setState({ openModal: true })
    }

    handleCloseModalPaciente = () => {
        this.setState({ openModal: false })
    }

    render(){
        const { isAutenticated, paciente, anamnese, openModal, listPacientes, isLoading } = this.state;
        if (!isAutenticated || isAutenticated === undefined){
            return (
                 <Redirect push to="/login" />
            );    
        } 
       
        const content = (
            <React.Fragment>
                <Modal className="modal-paciente" open={openModal} onClose={this.handleCloseModalPaciente} closeAfterTransition >
                    <Paper className="paper">
                        <NewPaciente />
                    </Paper>
                </Modal>
                <Button className="btn-add" disabled={paciente !== null} variant="contained" color="primary" onClick={() => this.handleOpenModalPaciente()}>
                    <MdAdd size={25} /> Novo
                </Button>
                <Paper style={{marginBottom: "1em"}} className="paper">
                    
                    <Typography variant="subtitle2" gutterBottom>Selecione o Paciente</Typography>
                    <ReactSelect
                        isSearchable
                        options={listPacientes}
                        isLoading={isLoading}
                        value={paciente}
                        styles={{ menu: base => ({ ...base, position: 'relative' }) }}
                        onChange={(e) => this.handlePacienteChange(e)}
                        isClearable
                        noOptionsMessage={ () => "Nenhum paciente encontrado" }
                    />


                
                
{/*                    
                    <TextField
                        select
                        variant="outlined"
                        label="Paciente"
                        name="paciente"
                        placeholder="Paciente"
                        value={paciente}
                        onChange={(e) => this.handlePacienteChange(e)}
                    >
                        <MenuItem value="Paciente A">Paciente A</MenuItem>
                        <MenuItem value="Paciente B">Paciente B</MenuItem>
                    </TextField> */}
            
        

                </Paper>
                {anamnese.map((item, index) => {
                    return (
                        <Paper key={index} style={{marginBottom: "1em"}}  className="paper">
                            <Grid container alignContent="center" alignItems="center" spacing={1}>
                                <Grid item xs>
                                    <Typography variant="subtitle2">{item.question}</Typography>
                                    <RadioGroup aria-label={item.name} name={item.name} value={item.value} onChange={(e) => this.handleAnamneseChange(e, index)} row>
                                        <FormControlLabel
                                            value="yes"
                                            control={<Radio color="primary" />}
                                            label="Sim"
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            value="no"
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
                    Continuar
                </Button>
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
