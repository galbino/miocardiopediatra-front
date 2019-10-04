import React from "react";
import { Paper, TextField, Grid, Button, InputAdornment, IconButton, MenuItem } from "@material-ui/core";
import { PostData, makeCancelable, GetData } from "../../utils/requests";
import SnackBar from "../../utils/Snackbar";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import InputMask from "react-input-mask";
import { Redirect } from 'react-router'
import Logo from "../../components/logo-miocardio.png";

class Signup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            nome: "",
            email: "",
            especialidadeArray: [{id: "", name: ""}],
            especialidade: "", especialidadeId: "",
            dataNascimento: "",
            crm: "",
            cpf: "",
            senha: "",
            confirmarSenha: "",
            telefone: "",
            estado: "AC",
            cidade: "",
            bairro: "",
            showPassword: false,
            showConfirmPassword: false,
            isDoctor: 1,
            estadoArray: [
                'AC' , 
                'AL' , 
                'AP' , 
                'AM' , 
                'BA' , 
                'CE' , 
                'DF' ,
                'ES' , 
                'GO' ,
                'MA' ,
                'MT' , 
                'MS' , 
                'MG' , 
                'PA' ,
                'PB' , 
                'PR' , 
                'PE' , 
                'PI' , 
                'RJ' , 
                'RN' , 
                'RS' , 
                'RO' , 
                'RR' , 
                'SC' , 
                'SP' , 
                'SE' , 
                'TO' , 
            ],
            redirect: "",
            touched: {
                nome: false,
                email: false,
                especialidade: false,
                dataNascimento: false,
                crm: false,
                cpf: false,
                senha: false,
                confirmarSenha: false,
                telefone: false,
                estado: false,
                cidade: false,
                bairro: false,
            },

            displayMessage: "",
            statusSnack: false,
            variant: "",

        }
    }

    cancelableFetchEspecialidade = makeCancelable(GetData("/especialidade"));

    componentDidMount(){
        this.cancelableFetchEspecialidade.promise
        .then(response => this.setState({ especialidadeArray: response.data }))
        .catch(reason => console.log(reason));
    }

    handleChange = (e) =>  {
        let input = e.target.name
        this.setState({ [input]: e.target.value })
    }

    handleInputChange = (e) => {
        this.setState({ especialidade: e.target.value })
    }

    handleBlur = field => () => {
        let touched = this.state.touched;
        touched[field] = true
        this.setState({ touched: touched })
    }

    validateFields = (data) => {
       return {
           nome: data.nome === "" || data.nome.length < 5,
           email: data.email === "" || !data.email.includes("@") || !data.email.includes("."),
           cpf: data.cpf === "" || data.cpf.includes("_"),
           senha: data.senha === "" || data.senha.length < 4,  
           confirmarSenha: data.confirmarSenha === "" || data.confirmarSenha !== data.senha,  
           dataNascimento: data.dataNascimento === "" || data.dataNascimento.includes("_"),
           especialidade: data.especialidade === "",
           crm: data.crm === "" || data.crm.length < 6,
           telefone: data.telefone === "" || data.telefone.includes("_"),
           estado: data.estado === "",
           cidade: data.cidade === "" || data.cidade.length < 4,
           bairro: data.bairro === "" || data.bairro.length < 4,
       }
    }

    handleConfirmar = (e) => {
        e.preventDefault();
        let { nome, email, cpf, dataNascimento, telefone, especialidade, crm, estado, cidade, bairro, senha, confirmarSenha, isDoctor } = this.state;
        if (nome === "" ||email === "" ||  cpf === "" || dataNascimento === "" || telefone === "" || especialidade === "" || crm === "" || estado === "" || cidade === "" || bairro === "" || senha === "" || confirmarSenha === "" ) {
            return this.setState({ statusSnack: true, displayMessage: "Preencha todos os campos.", variant: "warning" })
        } 
        dataNascimento = this.FormataStringData(dataNascimento);
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
        
        PostData("/signup", data).then(response => {
            if (response.errors.length === 0) {
                this.setState({ redirect: "/login", statusSnack: true, displayMessage: "Cadastrado com sucesso.", variant: "success", email: "", cpf: "", dataNascimento: "", telefone: "", especialidade: "", crm: "", estado: "", cidade: "", bairro: "", senha: "", confirmarSenha: ""  })
            } else {
                this.setState({ statusSnack: true, displayMessage: "Ocorreu um erro, tente novamente.", variant: "error" })
            }
        }).catch(err => console.log(err))
    }


    FormataStringData = (data) => {
        var dia  = data.split("/")[0];
        var mes  = data.split("/")[1];
        var ano  = data.split("/")[2];
        return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
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

    handleRedirect = () => {
        this.setState({ redirect: "/login" })
    }
    
    render(){
        if (this.state.redirect !== ""){
            return (
                <Redirect to={this.state.redirect} />
            );    
        }
        const { nome, email, especialidadeArray, especialidade, dataNascimento, crm, cpf, senha, confirmarSenha, telefone, estado, cidade, bairro, showPassword, showConfirmPassword } = this.state;
        let data = {
            nome: nome,
            email: email,
            especialidade: especialidade,
            dataNascimento: dataNascimento,
            crm: crm,
            cpf: cpf,
            senha: senha,
            confirmarSenha: confirmarSenha,
            telefone: telefone,
            estado: estado,
            cidade: cidade,
            bairro: bairro,
         
        }

        const errors = this.validateFields(data);
        const shouldMarkError = field => {
            const hasError = errors[field];      
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        };

        return(
            <React.Fragment>
                
                <SnackBar
                    statusSnack={this.state.statusSnack}
                    closeSnack={this.handleClose}
                    displayMessage={this.state.displayMessage}
                    variant={this.state.variant}
                />

                
                <div className="signup-box">
                    <div className="image-box" onClick={this.handleRedirect}>
                        <img style={{width: "200px", display: "block", margin: "auto"}} src={Logo}></img>
                    </div>
                    <Paper className="paper" elevation={3}>
                        <form>
                            <Grid className="grid-container" container>
                                <Grid item xs>
                                    <TextField 
                                        onBlur={this.handleBlur("nome")}
                                        error={shouldMarkError("nome")}
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
                                        error={shouldMarkError("email")}
                                        onBlur={this.handleBlur("email")}
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
                                    <InputMask mask="999.999.999-99" value={cpf} onChange={(e) => this.handleChange(e)} onBlur={this.handleBlur("cpf")}> 
                                        {inputProps => (
                                            <TextField
                                                {...inputProps}       
                                                error={shouldMarkError("cpf")}
                                                label="CPF"
                                                name="cpf"
                                                type="text"
                                                variant="outlined"
                                                fullWidth  
                                            />
                                        )}
                                    </InputMask>
                                </Grid>
                               
                                <Grid item xs>
                                    <InputMask mask="99/99/9999" value={dataNascimento} onChange={(e) => this.handleChange(e)}  onBlur={this.handleBlur("dataNascimento")}> 
                                        {inputProps => (
                                            <TextField
                                                {...inputProps}       
                                                label="Data de Nascimento"
                                                error={shouldMarkError("dataNascimento")}
                                                name="dataNascimento"
                                                type="text"
                                                variant="outlined"
                                                fullWidth  
                                            />
                                        )}
                                    </InputMask>
                                </Grid>
                            </Grid>
                            <Grid className="grid-container" container>
                                <Grid className="grid-item" item xs>
                                    
                                        
                                            <TextField
                                                select
                                                onBlur={this.handleBlur("especialidade")}
                                                value={especialidade}
                                                onChange={this.handleInputChange}
                                                id="esp"
                                                fullWidth
                                                error={shouldMarkError("especialidade")}
                                                variant="outlined"
                                                label="Especialidade"
                                                placeholder="Especialidade"
                                            >
                                                {especialidadeArray.map(esp => {
                                                     return <MenuItem key={esp.id} value={esp.id}>
                                                                {esp.name}
                                                            </MenuItem>
                                                })}
                                            </TextField>
                                    
                                </Grid>
                                <Grid className="grid-item" item xs>
                                    <TextField 
                                        name="crm"
                                        error={shouldMarkError("crm")}
                                        onBlur={this.handleBlur("crm")}
                                        value={crm}
                                        fullWidth
                                        type="number"
                                        label="CRM"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                 
                                <Grid item xs>
                                    <InputMask  type="tel" mask="(99) 99999-9999" value={telefone} onChange={(e) => this.handleChange(e)} onBlur={this.handleBlur("telefone")}> 
                                        {inputProps => (
                                            <TextField
                                                {...inputProps}       
                                                label="Telefone"
                                                error={shouldMarkError("telefone")}
                                                name="telefone"
                                                type="text"
                                                variant="outlined"
                                                fullWidth  
                                            />
                                        )}
                                    </InputMask>
                                </Grid>
                               
                            </Grid>
                            
                            <Grid className="grid-container" container>
                                <Grid className="grid-item" item xs>
                                    <TextField                       
                                        select
                                        onBlur={this.handleBlur("estado")}
                                        error={shouldMarkError("estado")}              
                                        name="estado"
                                        value={estado}
                                        fullWidth
                                        label="Estado"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    >
                                        {this.state.estadoArray.map(uf => {
                                            return <MenuItem key={uf} value={uf}>{uf}</MenuItem>
                                        })}
                                    </TextField>
                                </Grid>
                                <Grid className="grid-item"  item xs>
                                    <TextField       
                                        error={shouldMarkError("cidade")}     
                                        onBlur={this.handleBlur("cidade")}                                  
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
                                        error={shouldMarkError("bairro")}     
                                        onBlur={this.handleBlur("bairro")}                                
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
                                        error={shouldMarkError("senha")}     
                                        onBlur={this.handleBlur("senha")}                             
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
                                        error={shouldMarkError("confirmarSenha")}
                                        onBlur={this.handleBlur("confirmarSenha")}         
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
                            
                            <Button style={{float: "right"}} variant="contained" color="primary" onClick={(e) => this.handleConfirmar(e)}>Confirmar</Button>
                        </form>
                    </Paper>
                </div>
            </React.Fragment>
        );
    }

}

export default Signup;
