import React from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'
import { Menu } from '../components';
import { Modal, Paper, Grid, RadioGroup, Radio, FormControlLabel, Button, TextField, MenuItem  } from '@material-ui/core';
import PacienteCard from '../Card/PacienteCard';
import { MdAdd } from 'react-icons/md';
import NewPaciente from '../Pacientes/NewPaciente';

class Anamnese extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAutenticated: Auth.isUserAuthenticated(),
            listPacientes: [],
            paciente: "",
            openModal: false,
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
            ]
        }
    }

    componentDidMount(){
        // request listagem com dados dos pacientes
    }

    handleLogout = () => {
        Auth.unauthenticateUser();
        this.setState({ isAutenticated: false })
    }

    handlePacienteChange = () => {
        this.setState({ paciente: "paciente A" })
    }

    handleAnamneseChange = (event, index) => {
        let array = this.state.anamnese;
        array[index].value = event.target.value
        this.setState({ anamnsese: array })
    }

    handleOpenModalPaciente = () => {
        this.setState({ openModal: true })
    }

    handleCloseModalPaciente = () => {
        this.setState({ openModal: false })
    }

    render(){
        const { isAutenticated, paciente, anamnese, openModal } = this.state;
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
                <Paper style={{marginBottom: "1em"}} className="paper">
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <Button className="btn-add" variant="contained" color="primary" onClick={this.handleOpenModalPaciente}>
                                <MdAdd size={25} /> Novo
                            </Button>                     
                        </Grid>
                    </Grid>
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
                    </TextField>
            
                    <div className="paciente-card">
                        {paciente !== "" && <PacienteCard nome="Paciente A" idade="28" cidade="Rio de Janeiro" estado="RJ" />}
                    </div>

                </Paper>
                {anamnese.map((item, index) => {
                    return (
                        <Paper key={index} style={{marginBottom: "1em"}}  className="paper">
                            <Grid container alignContent="center" alignItems="center" spacing={1}>
                                <Grid item xs>
                                    {item.question}
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
                    onClick={() => alert("Continuar :)")}
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
