import React from 'react';
import { Modal, Paper, Button, TextField, Typography, InputAdornment, IconButton, LinearProgress } from '@material-ui/core';
import { Redirect } from 'react-router'
import { PostData } from '../../utils/requests';
import Auth from '../../utils/Auth';
import SnackBar from "../../utils/Snackbar";
import Logo from "../../components/logo-miocardio.png";
import Doctor from "../../components/doctor.png";
import Pacient from "../../components/pacient.png";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

class LoginPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            senha: "",
            redirect: "",
            openModal: false,
            displayMessage: "",
            statusSnack: false,
            variant: "",
            showPassword: false,
            loading: false,
        }
    }

    handleKeyPress = (e) => {
        if (e.keyCode === 13) return this.handleLogin()
    }

    handleLogin = () => {
        this.setState({ loading: true })
        let data = {
            email: this.state.email,
            password: this.state.senha
        }
        PostData("/login", data).then(response => {
            if (response.errors.length === 0) {
                Auth.authenticateUser(response.data.id)
                this.setState({ redirect: "/home", loading: false })
            } else {
                this.setState({ displayMessage: "Erro ao conectar, tente novamente", variant: "warning", statusSnack: true, loading: false })
            }
        }).catch(err => this.setState({ displayMessage: "Ocorreu um erro.", variant: "error", statusSnack: true, loading: false }))
    }


    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;        
        this.setState({
            [name]: value
        })
    }

    handleShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    validateForm = () => {
        const { senha, email } = this.state;
        if (senha.length > 4 && email.length > 4 && email.includes("@") && email.includes(".")) return true
    }

    handleModalOpen = () => {
        this.setState({ openModal: true })
    }

    handleModalClose = () => {
        this.setState({ openModal: false })
    }

    handleRedirectDoctor = () => {
        this.setState({ redirect: "signup/doctor" })
    }
    
    handleRedirectPaciente = () => {
        this.setState({ redirect: "signup/pacient" })
    }

    handleClose = () => {
        this.setState({ statusSnack: false })
    }

    render() {
        const { openModal, loading } = this.state;
        if (this.state.redirect !== ""){
            return (
                <Redirect push to={this.state.redirect} />
            );    
        }
        return(
            <React.Fragment>
                <Modal className="modal" open={openModal} onClose={this.handleModalClose} closeAfterTransition >
                    <Paper className="modal-paper">
                        
                       <Paper name="doctor" className="modal-paper-item" elevation={5} onClick={this.handleRedirectDoctor}>
                            <Typography style={{padding: "0.5em"}} variant="h5" align="center">Profissional da Saúde</Typography>
                            <div className="image-box-modal" onClick={this.handleRedirectDoctor}>
                            
                                <img alt="doctor" style={{width: "95px", display: "block", margin: "auto"}} src={Doctor}></img>
                            </div>
                       </Paper>
                       <Paper id="paciente" className="modal-paper-item" elevation={5} onClick={this.handleRedirectPaciente}>
                            <Typography  style={{padding: "0.5em"}}  variant="h5" align="center">Paciente</Typography>
                            <div className="image-box-modal" onClick={this.handleRedirectPacient}>
                                <img alt="paciente" style={{width: "95px", display: "block", margin: "auto"}} src={Pacient}></img>
                            </div>
                       </Paper>
                    </Paper>
                </Modal>
                {loading && <LinearProgress />}
               <div className="login-box">
                    <div className="image-box" onClick={this.handleRedirect}>
                        <img alt="logo" style={{width: "200px", display: "block", margin: "auto"}} src={Logo}></img>
                    </div>
                    <Paper className="paper" elevation={3}>
                        {/* <div className="header">
                            <div className="login">
                                <Typography align="center">Login</Typography>
                            </div>
                            <div className="cadastro">
                                <Typography align="center">Cadastro</Typography>
                            </div>
                        </div> */}
                        
                        <TextField 
                            className="email"
                            name="email"
                            value={this.state.email}
                            fullWidth
                            label="Email"
                            variant="outlined"
                            onChange={this.handleChange}
                        />
                        <TextField 
                            className="senha"
                            name="senha"
                            value={this.state.senha}
                            fullWidth
                            label="Senha"
                            variant="outlined"
                            type={this.state.showPassword ? "text" : "password"}
                            onChange={this.handleChange}
                            onKeyDown={(e) => this.handleKeyPress(e)}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton onClick={this.handleShowPassword}>
                                      {this.state.showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                            }}
                        />
                        <Typography 
                            gutterBottom
                            variant="caption"
                            align="right"
                            noWrap
                            onClick={this.handleModalOpen}
                            style={{cursor: "pointer"}}
                        >
                            {/* Ainda não é cadastrado? <a href="/signup">Clique aqui</a> */}
                            Ainda não é cadastrado?
                        </Typography>
                        <Button className="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={!this.validateForm()}
                            size="large"
                            onClick={this.handleLogin}
                        >
                            Login
                        </Button>
                    </Paper>
                </div>
                   
                <SnackBar
                    statusSnack={this.state.statusSnack}
                    closeSnack={this.handleClose}
                    displayMessage={this.state.displayMessage}
                    variant={this.state.variant}
                />

            </React.Fragment>
        );
    }

}

export default LoginPage;