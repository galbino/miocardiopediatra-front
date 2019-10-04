import React from "react";
import { Paper, TextField, Grid, Button, InputAdornment, IconButton, MenuItem } from "@material-ui/core";
import { PostData, GetData } from "../../utils/requests";
import SnackBar from "../../utils/Snackbar";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";


class Signup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            nome: "",
            email: "",
            especialidadeArray: [{id: "", name: ""}],
            especialidade: "",
            dataNascimento: "",
            crm: "",
            cpf: "",
            senha: "",
            confirmarSenha: "",
            telefone: "",
            estado: "",
            cidade: "",
            bairro: "",
            showPassword: false,
            showConfirmPassword: false,
            isDoctor: true,


            displayMessage: "",
            statusSnack: false,
            variant: "",

        }
    }

    componentDidMount(){
        GetData("/especialidade").then(response => {
            if (response.error.length === 0) {
                this.setState({ especialidadeArray: response.data.especialidade })
            }
        }).catch(err => console.log(err))
    }

    handleChange = (e) =>  {
        let input = e.target.name
        this.setState({ [input]: e.target.value })
    }

    handleConfirmar = () => {
        const { nome, email, especialidade, dataNascimento, crm, cpf, senha, telefone, estado, cidade, bairro, isDoctor } = this.state;
        let data = {
            nome: nome,
            email: email,
            especialidade: especialidade,
            dataNascimento: dataNascimento,
            crm: crm,
            cpf: cpf,
            senha: senha,
            telefone: telefone,
            estado: estado,
            cidade: cidade,
            bairro: bairro,
            isDoctor: isDoctor
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
        const { nome, email, especialidadeArray, especialidade, dataNascimento, crm, cpf, senha, confirmarSenha, telefone, estado, cidade, bairro, showPassword, showConfirmPassword } = this.state;
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
                                        value={email}
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="grid-container" container>
                                <Grid className="grid-item" item xs>
                                    <TextField                                     
                                        name="cpf"
                                        value={cpf}
                                        fullWidth
                                        label="CPF"
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
                                        select
                                        name="especialidade"
                                        value={especialidade}
                                        fullWidth
                                        label="Especialidade"
                                        variant="outlined"
                                        onChange={(e) => this.handleInputChange(e)}
                                    >   
                                        {especialidadeArray.map(especialidade => {
                                            return <MenuItem key={especialidade.id} value={especialidade.id}>{especialidade.name}</MenuItem>
                                        })}
                                        
                                    </TextField>
                                </Grid>
                                <Grid className="grid-item" item xs>
                                    <TextField 
                                        name="crm"
                                        value={crm}
                                        fullWidth
                                        label="CRM"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                 
                                <Grid item xs>
                                    <TextField 
                                        name="telefone"
                                        value={telefone}
                                        fullWidth
                                        label="Telefone"
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
                            
                            <Button style={{float: "right"}} variant="contained" color="primary" onClick={() => this.handleConfirmar()}>Confirmar</Button>
                        </form>
                    </Paper>
                </div>
            </React.Fragment>
        );
    }

}

export default Signup;
