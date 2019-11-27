import React from "react";
import { TextField, Grid, Button, InputAdornment, IconButton, MenuItem, Typography } from "@material-ui/core";
import { PostData } from "../../utils/requests";
import SnackBar from "../../utils/Snackbar";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import InputMask from "react-input-mask";


export default class NewPaciente extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            nome: "",
            email: "",
            emailResponsavel: "",
            cpfResponsavel: "",
            dataNascimento: "", 
            altura: "",
            peso: "",
            sexo: "Outro", 
            sexoArray: ["Outro", "Masculino", "Feminino"],
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
            estado: "AC",
            cidade: "",
            bairro: "",
            telefonePaciente: "",
            telefoneResponsavel: "",
            senha: "",
            confirmarSenha: "",
            observacoes: "",
            isDoctor: 0,
            showPassword: false,
            showConfirmPassword: false,


            touched: {
                nome: false,
                email: false,
                emailResponsavel: false,
                cpfResponsavel: false,
                dataNascimento: false,
                altura: false,
                peso: false,
                sexo: false,
                estado: false,
                cidade: false,
                bairro: false,
                telefonePaciente: false,
                telefoneResponsavel: false,
                senha: false,
                confirmarSenha: false,
            },
            
            displayMessage: "",
            statusSnack: false,
            variant: "",
            redirect: "",
        }
    }

    handleChange = (e) =>  {
        let input = e.target.name
        this.setState({ [input]: e.target.value })
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    FormataStringData = (data) => {
        var dia  = data.split("/")[0];
        var mes  = data.split("/")[1];
        var ano  = data.split("/")[2];
        return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
    }

    handleConfirmar = (e) => {
        e.preventDefault();
        let { nome, email, emailResponsavel, cpfResponsavel, dataNascimento, altura, peso, sexo, estado, cidade, bairro, telefonePaciente, telefoneResponsavel, senha, confirmarSenha, observacoes, isDoctor  } = this.state;
        if (nome === "" || email === "" || emailResponsavel === "" ||  cpfResponsavel === "" || dataNascimento === "" || altura === "" || peso === "" || sexo === "" || estado === "" || cidade === "" || bairro === "" || telefonePaciente === "" || telefoneResponsavel === "" || senha === "" || confirmarSenha === "" ) {
            return this.setState({ statusSnack: true, displayMessage: "Preencha todos os campos.", variant: "warning" })
        } 
        dataNascimento = this.FormataStringData(dataNascimento);
        let data = {
            nome: nome,
            email: email,
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
            isDoctor: isDoctor,
            observacoes: observacoes,
        }
        
        
        PostData("/signup", data).then(response => {
            if (response.errors.length === 0) {
                this.setState({  statusSnack: true, displayMessage: "Cadastrado com sucessso.", variant: "success", nome: "", email: "", emailResponsavel: "", cpfResponsavel: "", dataNascimento: "", altura: "", peso: "", sexo: "", estado: "", cidade: "", bairro: "", telefonePaciente: "", telefoneResponsavel: "", senha: "", confirmarSenha: "", observacoes: "" })
                this.props.handleNewUser(response.data); // back precisa mandar { dados cadastrais }
            } else {
                this.setState({ statusSnack: true, displayMessage: response.errors[0].message, variant: "warning" })
            }
        }).catch(err => this.setState({ statusSnack: true, displayMessage: "Falha ao conectar ao servidor.", variant: "error"}))
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

    handleBlur = field => () => {
        let touched = this.state.touched;
        touched[field] = true
        this.setState({ touched: touched })
    }

    validateFields = (data) => {
        return {
            nome: data.nome === "" || data.nome.length < 5,
            email: data.email === "" || !data.email.includes("@") || !data.email.includes("."),
            emailResponsavel: data.emailResponsavel === "" || !data.emailResponsavel.includes("@") || !data.emailResponsavel.includes("."),
            cpfResponsavel: data.cpfResponsavel === "" || data.cpfResponsavel.includes("_"),
            dataNascimento: data.dataNascimento === "" || data.dataNascimento.includes("_"),
            altura: data.altura === "",
            peso: data.peso === "",
            sexo: data.sexo === "" || data.sexo === "Outro",
            estado: data.estado === "",
            cidade: data.cidade === "" || data.cidade.length < 4,
            bairro: data.bairro === "" || data.bairro.length < 4,
            telefonePaciente: data.telefonePaciente === "" || data.telefonePaciente.includes("_"),
            telefoneResponsavel: data.telefoneResponsavel === "" || data.telefoneResponsavel.includes("_"),
            senha: data.senha === "" || data.senha.length < 4,  
            confirmarSenha: data.confirmarSenha === "" || data.confirmarSenha !== data.senha,  
        }
     }

    render(){
        const { nome, email, emailResponsavel, cpfResponsavel, dataNascimento, altura, peso, sexo, estado, cidade, bairro, telefonePaciente, telefoneResponsavel, senha, confirmarSenha, observacoes, showPassword, showConfirmPassword } = this.state;
        let data = {
            nome: nome,
            email: email,
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
            confirmarSenha: confirmarSenha,
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
                        <Typography color="primary" variant="h5" gutterBottom>Cadastrar novo paciente</Typography>
                        <form>
                            <Grid className="grid-container" spacing={2} container>
                                <Grid item xs>
                                    <TextField 
                                        onBlur={this.handleBlur("nome")}
                                        error={shouldMarkError("nome")}
                                        name="nome"
                                        type="text"
                                        value={nome}
                                        fullWidth
                                        label="Nome Completo"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="grid-container" spacing={2} container>
                                <Grid item xs>
                                    <TextField 
                                        onBlur={this.handleBlur("email")}
                                        error={shouldMarkError("email")}
                                        name="email"
                                        value={email}
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="grid-container" spacing={2} container>
                                <Grid item xs>
                                    <TextField 
                                        onBlur={this.handleBlur("emailResponsavel")}
                                        error={shouldMarkError("emailResponsavel")}
                                        name="emailResponsavel"
                                        value={emailResponsavel}
                                        fullWidth
                                        label="Email do Responsável"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="grid-container" spacing={2} container>
                                <Grid className="grid-item" item xs>
                                    <InputMask mask="999.999.999-99" value={cpfResponsavel} onChange={(e) => this.handleChange(e)} onBlur={this.handleBlur("cpfResponsavel")}> 
                                        {inputProps => (
                                            <TextField
                                                {...inputProps}       
                                                error={shouldMarkError("cpfResponsavel")}
                                                label="CPF do Responável"
                                                name="cpfResponsavel"
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
                            <Grid className="grid-container" spacing={2} container>
                                <Grid className="grid-item" item xs>
                                    <InputMask mask="9,99" value={altura} onChange={(e) => this.handleChange(e)}  onBlur={this.handleBlur("altura")}> 
                                        {inputProps => (
                                            <TextField
                                                {...inputProps}       
                                                label="Altura"
                                                error={shouldMarkError("altura")}
                                                name="altura"
                                                type="text"
                                                variant="outlined"
                                                fullWidth  
                                            />
                                        )}
                                    </InputMask>
                                </Grid>
                                <Grid className="grid-item" item xs>
                                    <InputMask mask="99,99" value={peso} onChange={(e) => this.handleChange(e)}  onBlur={this.handleBlur("peso")}> 
                                        {inputProps => (
                                            <TextField
                                                {...inputProps}       
                                                label="Peso"
                                                error={shouldMarkError("peso")}
                                                name="peso"
                                                type="text"
                                                variant="outlined"
                                                fullWidth  
                                            />
                                        )}
                                    </InputMask>
                                </Grid>
                                <Grid item xs>
                                    <TextField 
                                        select
                                        onBlur={this.handleBlur("sexo")}
                                        error={shouldMarkError("sexo")}
                                        name="sexo"
                                        value={sexo}
                                        fullWidth
                                        label="Sexo"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    >
                                        {this.state.sexoArray.map(sexo => {
                                            return <MenuItem key={sexo} value={sexo}>{sexo}</MenuItem>
                                        })}
                                    </TextField>
                                </Grid>
                            </Grid>
                            
                            <Grid className="grid-container" spacing={2} container>
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
                                        onChange={(e) => this.handleInputChange(e)}
                                    >
                                        {this.state.estadoArray.map(uf => {
                                            return <MenuItem key={uf} value={uf}>{uf}</MenuItem>
                                        })}
                                    </TextField>
                                </Grid>
                                <Grid className="grid-item"  item xs>
                                    <TextField                        
                                        onBlur={this.handleBlur("cidade")}
                                        error={shouldMarkError("cidade")}             
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
                                        onBlur={this.handleBlur("bairro")}
                                        error={shouldMarkError("bairro")}
                                        name="bairro"
                                        value={bairro}
                                        fullWidth
                                        label="Bairro"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="grid-container" spacing={2} container>
                                <Grid className="grid-item" item xs>
                                    <InputMask  type="tel" mask="(99) 99999-9999" value={telefonePaciente} onChange={(e) => this.handleChange(e)} onBlur={this.handleBlur("telefonePaciente")}> 
                                        {inputProps => (
                                            <TextField
                                                {...inputProps}       
                                                label="Telefone do Paciente"
                                                error={shouldMarkError("telefonePaciente")}
                                                name="telefonePaciente"
                                                type="text"
                                                variant="outlined"
                                                fullWidth  
                                            />
                                        )}
                                    </InputMask>
                                </Grid>
                                <Grid item xs>
                                    <InputMask  type="tel" mask="(99) 99999-9999" value={telefoneResponsavel} onChange={(e) => this.handleChange(e)} onBlur={this.handleBlur("telefoneResponsavel")}> 
                                        {inputProps => (
                                            <TextField
                                                {...inputProps}       
                                                label="Telefone do Responsável"
                                                error={shouldMarkError("telefoneResponsavel")}
                                                name="telefoneResponsavel"
                                                type="text"
                                                variant="outlined"
                                                fullWidth  
                                            />
                                        )}
                                    </InputMask>
                                </Grid>
                            </Grid>
                            <Grid className="grid-container" spacing={2} container>
                                <Grid className="grid-item" item xs>
                                    <TextField                                     
                                        onBlur={this.handleBlur("senha")}
                                        error={shouldMarkError("senha")}
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
                                        onBlur={this.handleBlur("confirmarSenha")}
                                        error={shouldMarkError("confirmarSenha")}
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
                            <Grid className="grid-container" spacing={2} container>
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
                            
                           
                            <Button style={{float: "right", marginTop: "10px"}} variant="contained" color="primary" onClick={(e) => this.handleConfirmar(e)}>Confirmar</Button>
                        </form>
            </React.Fragment>
        );
    }

}

