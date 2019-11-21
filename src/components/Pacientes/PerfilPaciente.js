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
    
    gridContainer: {
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5
    },
    
    profileMainInfo: {
        position: "relative",
        width: "50%",
        margin: "auto",
        alignContent: "center",
        alignItems: "center",
        spacing: '1'
    },
    wrapperCamera: {
        position: "relative",
        width: "fit-content",
        margin: "auto",
        alignContent: "center",
        alignItems: "center",
        spacing: '1'
    },
    avatar: {
        width: 150,
        height: 150,
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
    
    button: {
        marginTop: '0.8em',
        flex: 1,
    },
    
    buttonGrid: {
        marginBottom: 5,
        marginRight: 0,
        spacing: '1'
    },
    
    buttonText:{
        alignContent: "right",
        width: "50%",
        spacing: '1',
        textAlign: 'left'
    },
    buttonIco:{
        width: "50%",
        spacing: '1',
    },
    
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
              
                <Grid className={classes.gridContainerAvatar} container item xs>
                   
                    <div className={classes.profileMainInfo}>
                       <div className={classes.wrapperCamera}>
                            <Avatar className={classes.avatar} src={""} sizes="60" ></Avatar>
                            <IconButton className={classes.camera} color="primary" onClick={() => alert("change picture :)")}>
                                <MdCameraAlt />
                            </IconButton>
                        </div>
                    </div>
                    <div className={classes.profileMainInfo}>
                        <Typography variant="h6" gutterBottom>
                            Ana Marta Vasconcelos Dias (CPF: XXX.XXX.XXX-XX)
                        </Typography>
                        <Typography gutterBottom>Data Nascimento: XXXXXX</Typography>
                        <Typography gutterBottom>Sexo: XXXXXX</Typography>
                        <Typography gutterBottom>RG: XXXXXX</Typography>
                    </div>
                    
                </Grid>
              
                <Button variant="contained" color="primary" className={classes.button}>
                <Grid className={classes.buttonGrid} container>
                <Typography className={classes.buttonText}>ECOCARDIOGRAMA</Typography>
                <DoneAllIcon className={classes.buttonIco}/>                
                </Grid>
                </Button>
                
                <Button variant="contained" color="primary" className={classes.button}>
                <Grid className={classes.buttonGrid} container>
                <Typography className={classes.buttonText}>ECOCARDIOGRAMA</Typography>
                <DoneIcon className={classes.buttonIco}/>                
                </Grid>
                </Button>
                
                <Button variant="contained" color="secondary" className={classes.button}>
                <Grid className={classes.buttonGrid} container>
                <Typography className={classes.buttonText}>ECOCARDIOGRAMA</Typography>
                <LoopIcon className={classes.buttonIco}/>                
                </Grid>
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
