import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginPage, Controller, HomePage, Signup, SignupPaciente, Pacientes, Perfil, Anamnese, PerfilPaciente } from './components/components';

const App = () => (
    <React.Fragment>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={LoginPage} />
                <Route path="/login" exact={true} component={LoginPage} />
                <Route path="/home" component={HomePage} />
                <Route path="/pacientes" component={Pacientes} />
                <Route path="/anamnese" component={Anamnese} />
                <Route path="/perfil" component={Perfil} />
                <Route path="/signup/doctor" component={Signup} />
                <Route path="/signup/pacient" component={SignupPaciente} />
                <Route path="/perfil_paciente" component={PerfilPaciente} />
            </Switch>
        </BrowserRouter>
    </React.Fragment>
)

export default App;
