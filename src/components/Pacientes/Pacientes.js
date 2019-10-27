import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Grid, Button } from '@material-ui/core';
import { PacienteCard, Menu } from '../components';
import { MdAdd } from 'react-icons/md';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'

class Pacientes extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      //isAutenticated: Auth.isUserAuthenticated(),
      isAutenticated: true,
    }
  }

  handleLogout = () => {
    Auth.unauthenticateUser();
    this.setState({ isAutenticated: false })
  }

  render(){
    const isAutenticated = this.state.isAutenticated;
    if (!isAutenticated || isAutenticated === undefined){
        return (
              <Redirect push to="/login" />
        );
    }

    const content = (
      <React.Fragment>
        <Grid container spacing={1}>
          <Grid item xs>
            <Button className="btn-add" variant="contained" color="primary" onClick={() => alert("should add pacient")}>
              <MdAdd size={25} /> Novo
            </Button>

          </Grid>
        </Grid>
        <List>
          <ListItem>
            <PacienteCard />
          </ListItem>
          <ListItem>
            <PacienteCard />
          </ListItem>
          <ListItem>
            <PacienteCard />
          </ListItem>
          <ListItem>
            <PacienteCard />
          </ListItem>
          <ListItem>
            <PacienteCard />
          </ListItem>
        </List>
      </React.Fragment>
    )

    return(
      <React.Fragment>
        <Menu title="Listagem de Pacientes" component={content} handleLogout={this.handleLogout} />
      </React.Fragment>
    )
  }
}

export default Pacientes;
