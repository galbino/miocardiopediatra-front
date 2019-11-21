import React from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'
import { Menu } from '../components';
import { withStyles, Grid, TextField, Avatar, IconButton, Paper } from '@material-ui/core';
import { MdCameraAlt } from 'react-icons/md';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import LoopIcon from '@material-ui/icons/Loop';






const styles = {
    avatar: {
        width: 150,
        height: 150,
    },
    wrapperCamera: {
        position: "relative",
        width: "fit-content",
        margin: "auto",
    },
    picDesc: {
      position: "relative",
      width: "fit-content",
      margin: "auto",
    },
    camera: {
        position: "absolute",
        bottom: 0,
        right: 0,
        color: "white",
        backgroundColor: "#3f51b5",
        '&:hover': {
            backgroundColor: "#002984"
        }
    },
    gridContainer: {
        marginBottom: 5,
    },
    button: {
        marginBottom: '0.8em',
        alignContent:'right',
        flex: 1
    }
}

class PerfilPaciente extends React.Component {
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
        const { classes } = this.props
        const isAutenticated = this.state.isAutenticated;
        if (!isAutenticated || isAutenticated === undefined){
            return (
                 <Redirect push to="/login" />
            );
        }

        const content = (
            <React.Fragment>
              <Paper className="paper">
                <Grid className={classes.gridContainer} container alignContent="center" alignItems="center" spacing={1} item xs>
                   <div className={classes.wrapperCamera}>
                        <Avatar className={classes.avatar} src={""} alt="profile-image" sizes="60" >
                        </Avatar>
                        <IconButton className={classes.camera} color="primary" onClick={() => alert("change picture :)")}>
                            <MdCameraAlt />
                        </IconButton>
                    </div>
                </Grid>
                <Grid className={classes.gridContainer} container alignContent="center" alignItems="center" spacing={1} item xs>
                  <div className={classes.picDesc}>
                    <Typography variant="h6" gutterBottom>
                      Ana Marta Vasconcelos Dias (CPF: XXX.XXX.XXX-XX)
                    </Typography>
                  </div>
                </Grid>
                <Grid className={classes.gridContainer} container alignContent="center" alignItems="center" spacing={1}>
                  <Grid item xs>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Typography gutterBottom>Data Nascimento: XXXXXX</Typography>
                          <Typography gutterBottom>Sexo: XXXXXX</Typography>
                          <Typography gutterBottom>RG: XXXXXX</Typography>
                        </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                
                <Button variant="contained" color="primary" className={classes.button} endIcon={<DoneAllIcon />}>
                <text>oi</text>
                </Button>
                
                <Button variant="contained" color="primary" className={classes.button} endIcon={<DoneIcon />}>
                <text>oi</text>
                </Button>
                
                <Button variant="contained" color="secondary" className={classes.button} endIcon={<LoopIcon />}>
                Exame de Sangue
                </Button>
              
              </Paper>
            </React.Fragment>
        )

        return(
            <React.Fragment>
                <Menu title="Meu Perfil" component={content} handleLogout={this.handleLogout} />
            </React.Fragment>
        )
    }
}

export default withStyles(styles, makeStyles) (PerfilPaciente);
