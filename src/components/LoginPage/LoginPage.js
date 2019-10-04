import React from 'react';
import { Modal, Paper, Button, TextField, Grid, Typography } from '@material-ui/core';
import { Redirect } from 'react-router'
import { PostData } from '../../utils/requests';

class LoginPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            senha: "",
            redirect: "",
            openModal: false,
        }
    }

    handleLogin = () => {
        let data = {
            email: this.state.email,
            password: this.state.senha
        }
        PostData("/login", data).then(response => {
            if (response.errors.length === 0) {
                this.setState({ redirect: "/home" })
            } else {
                alert("rip")
            }
        }).catch(err => console.log(err))
    }


    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;        
        this.setState({
            [name]: value
        })
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
        this.setState({ redirect: "signup-doctor" })
    }
    
    handleRedirectPaciente = () => {
        this.setState({ redirect: "signup-pacient" })
    }

    render() {
        const { openModal, } = this.state;
        if (this.state.redirect !== ""){
            return (
                <Redirect to={this.state.redirect} />
            );    
        }
        return(
            <React.Fragment>
                <Modal className="modal" open={openModal} onClose={this.handleModalClose} closeAfterTransition>
                    <Paper className="modal-paper">
                       <Paper name="doctor" className="modal-paper-item" elevation={7} onClick={this.handleRedirectDoctor}>
                            imagem doctor
                       </Paper>
                       <Paper id="paciente" className="modal-paper-item" elevation={7} onClick={this.handleRedirectPaciente}>
                            imagem paciente
                       </Paper>
                    </Paper>
                </Modal>

               <div className="login-box">
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
                            type="password"
                            onChange={this.handleChange}
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
               
            </React.Fragment>
        );
    }

}

export default LoginPage;