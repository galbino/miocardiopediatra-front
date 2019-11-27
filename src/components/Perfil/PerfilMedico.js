import React from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'
import { Menu } from '../components';
import { withStyles, Grid, TextField, Avatar, IconButton, Paper, Button, MenuItem, Typography } from '@material-ui/core';
import { MdCameraAlt, MdLockOutline } from 'react-icons/md';
import InputMask from 'react-input-mask';
import { GetData, PatchData, makeCancelable } from '../../utils/requests';
import SnackBar from "../../utils/Snackbar";

const styles = {
    avatar: {
        width: 130,
        height: 130,
    
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
    changePassword: {
        color: "white",
        backgroundColor: "#3f51b5",
        marginLeft: 5,
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
            is_doctor: Auth.getRole(),
            user_id: props.match.params.id,
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
            sexoArray: ["Outro", "Masculino", "Feminino"],
            especialidade_id: "",
            data: {
                name: "",
                email: "",
                cpf: "",
                data_nasc: "",
                crm: "",
                especialidade: "",
                telefone: "",
                estado: "",
                cidade: "",
                bairro: "",
            },
            statusSnack: false,
            displayMessage: "",
            variant: "",
            especialidadeArray: []
        }
    }

    handleLogout = () => {
        Auth.unauthenticateUser();
        this.setState({ isAutenticated: false })
    }

    handleInputChange = (e) => {
        let data = this.state.data
        data.especialidade = e.target.value
        this.setState({ data: data, especialidade_id: e.target.value })
    }
   
    cancelableFetchEspecialidade = makeCancelable(GetData("/especialidade"));

    componentDidMount(){
        GetData("/profile").then(response => {
            if (response.errors.length === 0){
                let responseJSON = response.data;
                let data = {
                    name: responseJSON.name === null ? "" : responseJSON.name,
                    email: responseJSON.email === null ? "" : responseJSON.email,
                    cpf: responseJSON.cpf === null ? "" : responseJSON.cpf,
                    data_nasc: responseJSON.data_nasc === null ? "" : responseJSON.data_nasc,
                    especialidade: responseJSON.especialidade === null ? "" : responseJSON.especialidade.name,
                    crm: responseJSON.crm === null ? "" : responseJSON.crm,
                    sexo: responseJSON.sexo === null ? "" : responseJSON.sexo,
                    peso: responseJSON.peso === null ? "" : responseJSON.peso,
                    altura: responseJSON.altura === null ? "" : responseJSON.altura,
                    telefone: responseJSON.telefone === null ? "" : responseJSON.telefone,
                    estado: responseJSON.estado === null ? "" : responseJSON.estado,
                    cidade: responseJSON.cidade === null ? "" : responseJSON.cidade,
                    bairro: responseJSON.bairro === null ? "" : responseJSON.bairro,
                }
                this.setState({ data: data })
            } else {
                console.log("erro ao carregar")
            }
        }).catch(() => console.log("erro de conexao/request"));

        this.cancelableFetchEspecialidade.promise
        .then(response =>  {
            if (response.errors.length === 0) {
                this.setState({ especialidadeArray: response.data })
            }
        }).catch(reason => console.log(reason));
    }

    handleConfirmar = () => {
        let data = {
            name: this.state.data.name,
            state: this.state.data.estado,
            date: this.state.data.data_nasc,
            phone: this.state.data.telefone,
            gender: this.state.data.sexo,
            city: this.state.data.cidade,
            neighbourhood: this.state.data.bairro,
            crm: this.state.data.crm,
            phone_resp: this.state.data.telefone,
            height: this.state.data.altura,
            weigth: this.state.data.peso,
            obs: this.state.data.observacao,
            speciality_id: this.state.data.especialidade,
        }
        PatchData("/profile", data).then(response => {
            if (response.errors.length === 0) {
                this.setState({
                    statusSnack: true,
                    displayMessage: "Informações atualizadas com sucesso.", 
                    variant: "success",
                })
            } else {
                this.setState({ statusSnack: true, displayMessage: response.errors[0].message, variant: "warning"})
            }
        }).catch(() => this.setState({ statusSnack: true, displayMessage: "Falha de conexão com o servidor", variant: "error" }));
    }

    handleChange = (e) => {
        let name = e.target.name
        let data = this.state.data
        data[name] = e.target.value
        this.setState({ data: data })
    }

    render(){
        const { classes } = this.props
        const  { isAutenticated, data, user_id, especialidadeArray, is_doctor } = this.state;
        
        if (!isAutenticated || isAutenticated === undefined){
            return (
                 <Redirect push to="/login" />
            );    
        }

        const content = (
            <React.Fragment>   
                <SnackBar
                    statusSnack={this.state.statusSnack}
                    closeSnack={this.handleClose}
                    displayMessage={this.state.displayMessage}
                    variant={this.state.variant}
                />              
                
                <Paper className="profile-paper" elevation={3}>
                        <form>
                            
                            <Grid className="grid-container" container>
                                <Grid item xs>
                                    <div className={classes.wrapperCamera}>
                                        <Avatar className={classes.avatar} src={""} alt="profile-image" sizes="60" >
                                            {data.name !== undefined && data.name.charAt(0).toUpperCase()}
                                        </Avatar>
                                        {/* <IconButton className={classes.camera} color="primary" onClick={() => alert("change picture :)")}>
                                            <MdCameraAlt />
                                        </IconButton> */}
                                    </div>
                                </Grid>
                                <Grid item xs>
                                    <Grid container>
                                        <Grid style={{marginBottom: "16px"}} item xs={12}>
                                            <TextField 
                                                // onBlur={this.handleBlur("nome")}
                                                // error={shouldMarkError("nome")}
                                                
                                                InputLabelProps={{ shrink: true }}
                                                name="nome"
                                                value={data.name || ''}
                                                fullWidth
                                                label="Nome Completo"
                                                variant="outlined"
                                                onChange={(e) => this.handleChange(e)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField 
                                                name="email"
                                                
                                                // error={shouldMarkError("email")}
                                                // onBlur={this.handleBlur("email")}
                                                InputLabelProps={{ shrink: true }}
                                                value={data.email || ''}
                                                fullWidth
                                                label="Email"
                                                variant="outlined"
                                                onChange={(e) => this.handleChange(e)}
                                            />
                                        </Grid>
                                    </Grid>
                                    
                                </Grid>
                            </Grid>
                    
                            <Grid className="grid-container" container>
                                <Grid className="grid-item" item xs>
                                    <InputMask mask="999.999.999-99"  InputLabelProps={{ shrink: true }} value={data.cpf || ''}> 
                                        {inputProps => (
                                            <TextField
                                                {...inputProps}                                               
                                                // error={shouldMarkError("cpf")}
                                                label="CPF"
                                                name="cpf"
                                                type="text"
                                                variant="outlined"
                                                fullWidth  
                                            />
                                        )}
                                    </InputMask>
                                </Grid>
                                <Grid className="grid-item" item xs>
                                <TextField 
                                        select
                                        name="sexo"
                                        value={data.sexo}
                                        fullWidth
                                        label="Sexo"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        {this.state.sexoArray.map(sexo => {
                                            return <MenuItem key={sexo} value={sexo}>{sexo}</MenuItem>
                                        })}
                                    </TextField>
                                </Grid>
                               
                               
                                <Grid item xs>
                                    <InputMask mask="99/99/9999"  onChange={this.handleChange} InputLabelProps={{ shrink: true }} value={data.data_nasc || ''}> 
                                        {inputProps => (
                                            <TextField   
                                                {...inputProps} 
                                               
                                                label="Data de Nascimento"
                                                //error={shouldMarkError("dataNascimento")}
                                                name="data_nasc"
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
                                                //onBlur={this.handleBlur("especialidade")}
                                                value={data.especialidade}
                                                onChange={this.handleInputChange}
                                                name="especialidade"
                                                fullWidth
                                                //error={shouldMarkError("especialidade")}
                                                variant="outlined"
                                                label="Especialidade"
                                                InputLabelProps={{ shrink: true }}
                                                placeholder="Especialidade"
                                            >
                                                {especialidadeArray.map(esp => {
                                                     return <MenuItem key={esp.id} name={esp.name} value={esp.id}>{esp.name}</MenuItem>
                                                })}
                                            </TextField>  
                                    
                                </Grid>
                                <Grid className="grid-item" item xs>
                                    <TextField 
                                        name="crm"
                                        value={data.crm}
                                        fullWidth
                                        type="text"
                                        label="CRM"
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                 
                                <Grid item xs>
                                    <InputMask mask="(99) 99999-9999"  InputLabelProps={{ shrink: true }} value={data.telefone || ''}  onChange={(e) => this.handleChange(e)}> 
                                        {inputProps => (
                                            <TextField
                                                
                                                label="Telefone"
                                                InputLabelProps={{ shrink: true }} 
                                                // value={data.telefone || ''}
                                                   
                                                // error={shouldMarkError("telefone")}
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
                                            
                                            name="estado"
                                            value={data.estado}
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
                                        // error={shouldMarkError("cidade")}     
                                        // onBlur={this.handleBlur("cidade")}                                  
                                        // name="cidade"
                                        InputLabelProps={{ shrink: true }}
                                        
                                        value={data.cidade || ''}
                                        fullWidth
                                        label="Cidade"
                                        variant="outlined"
                                       // onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField         
                                        // error={shouldMarkError("bairro")}     
                                        // onBlur={this.handleBlur("bairro")}                                
                                        // name="bairro"
                                        InputLabelProps={{ shrink: true }}
                                        
                                        value={data.bairro || ''}
                                        fullWidth
                                        label="Bairro"
                                        variant="outlined"
                                       // onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                            </Grid>
                            
                            {/* <Grid className="grid-container" container>
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
                            </Grid> */}
                            {/* <div style={{display: "flex", alignItems: "center" }}>
                                <Typography variant="body1">Trocar Senha</Typography>
                                <IconButton  className={classes.changePassword} color="primary" onClick={() => alert("change password :)")}>
                                    <MdLockOutline />
                                </IconButton>

                            </div> */}

                            <Button style={{float: "right"}} variant="contained" color="primary" onClick={(e) => this.handleConfirmar(e)}>Confirmar</Button>
                        </form>
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