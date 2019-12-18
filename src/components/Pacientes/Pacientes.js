import React from 'react';
import { Modal, Paper, Grid, Button, List, ListItem, ListItemAvatar, ListItemSecondaryAction, CircularProgress, ListItemText, Avatar, IconButton } from '@material-ui/core';
import { PacienteCard, Menu } from '../components';
import NewPaciente from '../Pacientes/NewPaciente';
import { MdAdd, MdMoreVert } from 'react-icons/md';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'
import { GetData } from '../../utils/requests';

class Pacientes extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isAutenticated: Auth.isUserAuthenticated(),
      listPacientes: [],
      openModal: false,
      loading: true,
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

  handleOpenProfile = (id) => {
    this.setState({ redirect: "/profile", user_id: id })
  }

  handleNewUser = (info) => {
      let array = this.state.listPacientes;
      array.id = info.id
      array.name = info.name
      array.unshift(array);
      this.setState({ listPacientes: array, openModal: false });
  }

  componentDidMount(){
    GetData("/patient").then(response => {
      if (response.errors.length === 0){
        this.setState({ listPacientes: response.data, loading: false })
      } else {
        console.log("erro ao carregar")
      }
    }).catch(() => console.log("erro de conexao/request"));
  }

  render(){
    const { isAutenticated, openModal, listPacientes, loading } = this.state;
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
        <List>
        <Grid container alignContent="center" alignItems="center" spacing={2}>
        {loading &&
          <div style={{position: "relative", marginTop: "15%", left: "50%"}}>
            <CircularProgress />
          </div>
        }
        {listPacientes.map((paciente, index) => {
          return <Grid key={index} item>
            
                <PacienteCard nome={paciente.name} id={paciente.id} />
                
            </Grid>
         
    
        })}
        </Grid>
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
