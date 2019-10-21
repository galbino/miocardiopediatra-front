import React from 'react';
import { Grid, Button, IconButton } from '@material-ui/core';
import PacienteCard from '../Card/PacienteCard';
import { MdAdd } from 'react-icons/md';

class Pacientes extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  render(){
    return(
      <React.Fragment>
        <Grid container spacing={1}>
          <Grid item xs>
            <Button className="btn-add" variant="contained" color="primary" onClick={() => alert("should add pacient")}>
              <MdAdd size={25} /> Novo
            </Button>
            
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          
          <Grid item xs>
            <PacienteCard />

          </Grid>
          <Grid item xs>
            <PacienteCard />
          </Grid>
          <Grid item xs>
            <PacienteCard />
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default Pacientes;
