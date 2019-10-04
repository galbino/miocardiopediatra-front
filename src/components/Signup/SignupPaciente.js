import React from "react";
import { Paper, TextField, Grid, Button, InputAdornment, IconButton } from "@material-ui/core";
import { PostData } from "../../utils/requests";
import SnackBar from "../../utils/Snackbar";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";


class Signup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            nome: "",
            emailResponsavel: "",
            cpfResponsavel: "",
            dataNascimento: "", 
            altura: "",
            peso: "",
            sexo: "", 
            estado: "",
            cidade: "",
            bairro: "",
            telefonePaciente: "",
            telefoneResponsavel: "",
            senha: "",
            confirmarSenha: "",
            observacoes: "",
            isDoctor: false,

            showPassword: false,
            showConfirmPassword: false,
            
            displayMessage: "",
            statusSnack: false,
            variant: "",

        }
    }

    handleChange = (e) =>  {
        let input = e.target.name
        this.setState({ [input]: e.target.value })
    }

    handleConfirmar = () => {
        const { nome, emailResponsavel, cpfResponsavel, dataNascimento, altura, peso, sexo, estado, cidade, bairro, telefonePaciente, telefoneResponsavel, senha, observacoes, isDoctor  } = this.state;
        let data = {
            nome: nome,
            emailResponsavel: emailResponsavel,
            cpfResponsavel: cpfResponsavel,
            dataNascimento: dataNascimento,
            altura: altura,
            peso: peso,
            sexo: sexo,
            estado: estado,
            cidade: cidade,
            bairro: bairro,
            telefonePaciente: telefonePaciente,
            telefoneResponsavel: telefoneResponsavel,
            senha: senha,
            observacoes: observacoes,
            isDoctor: isDoctor,
        }
        this.setState({ statusSnack: true, displayMessage: "Cadastrado com sucessso", variant: "success" })
        PostData("/login", data).then(response => {
            if (response.error.length === 0) {
                alert("sucesso")
            } else {
                alert("rip")
            }
        }).catch(err => console.log(err))
    }

    handleShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    handleShowConfirmPassword = () => {
        this.setState({ showConfirmPassword: !this.state.showConfirmPassword })
    }

    handleClose = () => {
        this.setState({ statusSnack: false })
    }

    render(){
        const { nome, emailResponsavel, cpfResponsavel, dataNascimento, altura, peso, sexo, estado, cidade, bairro, telefonePaciente, telefoneResponsavel, senha, confirmarSenha, observacoes, showPassword, showConfirmPassword } = this.state;
        return(
            <React.Fragment>
                
                <SnackBar
                    statusSnack={this.state.statusSnack}
                    closeSnack={this.handleClose}
                    displayMessage={this.state.displayMessage}
                    variant={this.state.variant}
                />

                
                <div className="signup-box">
                    <Paper className="paper" elevation={3}>
                        <form>
                            <Grid className="grid-container" container>
                                <Grid item xs>
                                    <TextField 
                                        name="nome"
                                        value={nome}
                                        fullWidth
                                        label="Nome Completo"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="grid-container" container>
                                <Grid item xs>
                                    <TextField 
                                        name="email"
                                        value={emailResponsavel}
                                        fullWidth
                                        label="Email do Responsável"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="grid-container" container>
                                <Grid className="grid-item" item xs>
                                    <TextField 
                                        name="cpfResponsavel"
                                        value={cpfResponsavel}
                                        fullWidth
                                        label="CPF do Responsavel"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField 
                                        name="dataNascimento"
                                        value={dataNascimento}
                                        fullWidth
                                        label="Data de Nascimento"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="grid-container" container>
                                <Grid className="grid-item" item xs>
                                    <TextField                                     
                                        name="altura"
                                        value={altura}
                                        fullWidth
                                        label="Altura"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                                <Grid className="grid-item" item xs>
                                    <TextField 
                                        name="peso"
                                        value={peso}
                                        fullWidth
                                        label="Peso"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField 
                                        name="sexo"
                                        value={sexo}
                                        fullWidth
                                        label="Sexo"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                            </Grid>
                            
                            <Grid className="grid-container" container>
                                <Grid className="grid-item" item xs>
                                    <TextField                                     
                                        name="estado"
                                        value={estado}
                                        fullWidth
                                        label="Estado"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                                <Grid className="grid-item"  item xs>
                                    <TextField                                     
                                        name="cidade"
                                        value={cidade}
                                        fullWidth
                                        label="Cidade"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField                                     
                                        name="bairro"
                                        value={bairro}
                                        fullWidth
                                        label="Bairro"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="grid-container" container>
                                <Grid className="grid-item" item xs>
                                    <TextField 
                                        name="telefonePaciente"
                                        value={telefonePaciente}
                                        fullWidth
                                        label="Telefone Paciente"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField 
                                        name="telefoneResponsavel"
                                        value={telefoneResponsavel}
                                        fullWidth
                                        label="Telefone Responsável"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="grid-container" container>
                                <Grid className="grid-item" item xs>
                                    <TextField                                     
                                        name="senha"
                                        value={senha}
                                        fullWidth
                                        label="Senha"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                        InputProps={{
                                            endAdornment: (
                                              <InputAdornment position="end">
                                                <IconButton onClick={this.handleShowPassword}>
                                                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                                </IconButton>
                                              </InputAdornment>
                                            ),
                                        }}
                                        type={showPassword ? "text" : "password"}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField 
                                        name="confirmarSenha"
                                        value={confirmarSenha}
                                        fullWidth
                                        label="Confirmar Senha"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                        InputProps={{
                                            endAdornment: (
                                              <InputAdornment position="end">
                                                <IconButton onClick={this.handleShowConfirmPassword}>
                                                  {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                                </IconButton>
                                              </InputAdornment>
                                            ),
                                        }}
                                        type={showConfirmPassword ? "text" : "password"}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="grid-container" container>
                                <Grid item xs>
                                    <TextField 
                                        multiline
                                        rows={5}
                                        name="observacoes"
                                        value={observacoes}
                                        fullWidth
                                        label="Observações"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                            </Grid>
                            
                           
                            <Button style={{float: "right"}} variant="contained" color="primary" onClick={() => this.handleConfirmar()}>Confirmar</Button>
                        </form>
                    </Paper>
                </div>
            </React.Fragment>
        );
    }

}

export default Signup;
