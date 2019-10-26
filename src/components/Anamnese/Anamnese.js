import React from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'
import { Menu, Pacientes } from '../components';
import { Paper, Grid, RadioGroup, Radio, FormControlLabel, Button, TextField, MenuItem  } from '@material-ui/core';
import PacienteCard from '../Card/PacienteCard';

class Anamnese extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAutenticated: Auth.isUserAuthenticated(),
            listPacientes: [],
            paciente: "",
            anamnsese: [
                {
                    question: "Apresenta dispineia aos esforcos?",
                    name: "dispineia",
                },
                {
                    question: "Esta constantemente fadigado?",
                    name: "fadigado",
                },
                {
                    question: "Possui angina?",
                    name: "angina",
                },
                {
                    question: "Comentou casos de sincope ou pre-sincope?",
                    name: "sincope",
                },
                {
                    question: "Experimentou palpitacoes?",
                    name: "palpitacoes",
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

    handlePacienteChange = (event) => {
        this.setState({ paciente: event.target.value})
    }

    render(){
        const { isAutenticated, paciente, anamnsese } = this.state;
        if (!isAutenticated || isAutenticated === undefined){
            return (
                 <Redirect push to="/login" />
            );    
        }
       
        const content = (
            <React.Fragment>
                <Paper style={{marginBottom: "1em"}} className="paper">
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
                {anamnsese.map((item, index) => {
                    return (
                        <Paper key={index} style={{marginBottom: "1em"}}  className="paper">
                            <Grid container alignContent="center" alignItems="center" spacing={1}>
                                <Grid item xs>
                                    {item.question}
                                    <RadioGroup aria-label="position" name={item.name} value={1} onChange={() => alert("change")} row>
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
