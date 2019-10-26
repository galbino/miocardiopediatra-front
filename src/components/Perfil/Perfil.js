import React from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'
import { Menu } from '../components';
import { withStyles, Grid, TextField, Avatar, IconButton, Paper } from '@material-ui/core';
import { MdCameraAlt } from 'react-icons/md';

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
    }
}

class Perfil extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isAutenticated: Auth.isUserAuthenticated(),
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
                <Grid className={classes.gridContainer} container alignContent="center" alignItems="center" spacing={1}>
                    <Grid item xs>
                        <TextField
                            name="nome"
                            fullWidth
                            variant="outlined"
                            label="Nome"
                            placeholder="Nome"
                        />
                    </Grid>
                </Grid>
                <Grid className={classes.gridContainer} container alignContent="center" alignItems="center" spacing={1}>
                    <Grid item xs>
                       <div className={classes.wrapperCamera}>
                            <Avatar className={classes.avatar} src={""} alt="profile-image" sizes="60" >
                                
                            </Avatar>
                            <IconButton className={classes.camera} color="primary" onClick={() => alert("change picture :)")}>
                                <MdCameraAlt />
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <Grid container spacing={1}>
                        <Grid item xs={12}>
                                <TextField
                                    name="indentidade"
                                    fullWidth
                                    variant="outlined"
                                    label="Identidade"
                                    placeholder="Identidade"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="dataNascimento"
                                    fullWidth
                                    variant="outlined"
                                    label="Data de Nascimento"
                                    placeholder="Data de Nascimento"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="sexo"
                                    fullWidth
                                    variant="outlined"
                                    label="Sexo"
                                    placeholder="Sexo"
                                />
                            </Grid>
                        
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className={classes.gridContainer} container alignContent="center" alignItems="center" spacing={1}>
                    <Grid item xs>
                        <TextField
                            name="altura"
                            fullWidth
                            variant="outlined"
                            label="Altura"
                            placeholder="Altura"
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            name="peso"
                            fullWidth
                            variant="outlined"
                            label="Peso"
                            placeholder="Peso"
                        />
                    </Grid>
                </Grid>
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

export default withStyles(styles) (Perfil);