import React, { Component} from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginPage, HomePage, Signup, SignupPaciente } from './components/components';

const App = () => (
    <React.Fragment>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={LoginPage} /> 
                <Route path="/login" exact={true} component={LoginPage} /> 
                <Route path="/home" component={HomePage} /> 
                <Route path="/signup-doctor" component={Signup} /> 
                <Route path="/signup-pacient" component={SignupPaciente} /> 
            </Switch>
        </BrowserRouter>
    </React.Fragment>
)

export default App;