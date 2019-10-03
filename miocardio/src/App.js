import React, { Component} from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginPage, HomePage, Signup } from './components/components';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={LoginPage} /> 
            <Route path="/login" exact={true} component={LoginPage} /> 
            <Route path="/home" component={HomePage} /> 
            <Route path="/signup" component={Signup} /> 
        </Switch>
    </BrowserRouter>
)

export default App;