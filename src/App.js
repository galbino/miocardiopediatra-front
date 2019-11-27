import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginPage, HomePage, Signup, SignupPaciente, Pacientes, Perfil, Anamnese, AnamneseList,  AnamneseInformation, AnamnesePacient, AnamneseRate, PerfilMedico, PerfilPaciente, FAQ } from './components/components';

const App = () => (
    <React.Fragment>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={LoginPage} /> 
                <Route path="/login" exact={true} component={LoginPage} /> 
                <Route path="/home" component={HomePage} /> 
                <Route path="/pacientes" component={Pacientes} /> 
                <Route path="/anamnese/:id" component={Anamnese} /> 
                <Route path="/anamnese-rate" component={AnamneseRate} /> 
                <Route path="/info/:id" component={AnamneseInformation} /> 
                <Route path="/anamneses/:id" component={AnamneseList} /> 
                <Route path="/myanamneses/:id" component={AnamnesePacient} /> 
                <Route path="/perfil/:id" component={Perfil} /> 
                <Route path="/profile" component={PerfilMedico} />
                <Route path="/myprofile" component={PerfilPaciente} />
                <Route path="/signup/doctor" component={Signup} /> 
                <Route path="/signup/pacient" component={SignupPaciente} /> 
                <Route path="/FAQ" component={FAQ} />
            </Switch>
        </BrowserRouter>
    </React.Fragment>
)

export default App;