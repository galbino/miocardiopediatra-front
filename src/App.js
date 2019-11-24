import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginPage, HomePage, Signup, SignupPaciente, Pacientes, Perfil, Anamnese, AnamneseList, AnamneseInformation, PerfilMedico } from './components/components';

const App = () => (
    <React.Fragment>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={LoginPage} /> 
                <Route path="/login" exact={true} component={LoginPage} /> 
                <Route path="/home" component={HomePage} /> 
                <Route path="/pacientes" component={Pacientes} /> 
                <Route path="/anamnese/:id" component={Anamnese} /> 
                <Route path="/info/:id" component={AnamneseInformation} /> 
                <Route path="/anamneses/:id" component={AnamneseList} /> 
                <Route path="/perfil/:id" component={Perfil} />
                <Route path="/myperfil" component={PerfilMedico} />
                <Route path="/signup/doctor" component={Signup} /> 
                <Route path="/signup/pacient" component={SignupPaciente} /> 
            </Switch>
        </BrowserRouter>
    </React.Fragment>
)

export default App;