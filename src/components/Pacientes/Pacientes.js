import React from 'react';
import { Modal, Paper, Grid, Button } from '@material-ui/core';
import { PacienteCard, Menu } from '../components';
import { MdAdd } from 'react-icons/md';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'
import NewPaciente from '../Pacientes/NewPaciente';

class Pacientes extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isAutenticated: Auth.isUserAuthenticated(),
      listPacientes: [],
      openModal: false,
    }
  }

  handleLogout = () => {
    Auth.unauthenticateUser();
    this.setState({ isAutenticated: false })
  }

  
  handleOpenModalPaciente = () => {
    this.setState({ openModal: true })
  }

  handleCloseModalPaciente = () => {
      this.setState({ openModal: false })
  }

  handleNewUser = (info) => {
    let array = this.state.listPacientes;
    array.unshift(info);
    this.setState({ listPacientes: array })
}

  render(){
    const { isAutenticated, openModal, } = this.state;
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
        <Button className="btn-add" variant="contained" color="primary" onClick={() => this.handleOpenModalPaciente()}>
            <MdAdd size={25} /> Novo
        </Button>
        <Grid container spacing={1}>
          <Grid item xs>
            
          </Grid>
        </Grid>
        <Grid container spacing={1}>          
          <Grid item xs>
            <PacienteCard />    
          </Grid>
          {/* <Grid item xs>
            <PacienteCard />
          </Grid>
          <Grid item xs>
            <PacienteCard />
          </Grid> */}
        </Grid>
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
