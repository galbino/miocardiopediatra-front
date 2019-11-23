import React from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'
import { Menu } from '../components';
import { withStyles, Grid, TextField, Avatar, IconButton, Paper, Button, Typography } from '@material-ui/core';
import { MdCameraAlt, MdLockOutline } from 'react-icons/md';
import InputMask from 'react-input-mask';
import { GetData } from '../../utils/requests';

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
            user_id: props.match.params.id,
            data: {
                name: "",
                email: "",
                cpf: "",
                data_nasc: "",
                telefone: "",
                estado: "",
                cidade: "",
                bairro: "",
            }
        }
    }

    handleLogout = () => {
        Auth.unauthenticateUser();
        this.setState({ isAutenticated: false })
    }

    componentDidUpdate(prevProps){
        if (prevProps.match.params.id !== this.props.match.params.id){
            GetData("/patient/" + this.props.match.params.id).then(response => {
                if (response.errors.length === 0){
                    let responseJSON = response.data;
                    let data = {
                        name: responseJSON.name === null ? "" : responseJSON.name,
                        email: responseJSON.email === null ? "" : responseJSON.email,
                        cpf: responseJSON.cpf === null ? "" : responseJSON.cpf,
                        data_nasc: responseJSON.data_nasc === null ? "" : responseJSON.data_nasc,
                        telefone: responseJSON.estado === null ? "" : responseJSON.telefone,
                        estado: responseJSON.estado === null ? "" : responseJSON.estado,
                        cidade: responseJSON.cidade === null ? "" : responseJSON.cidade,
                        bairro: responseJSON.bairro === null ? "" : responseJSON.bairro,
                    }
                    this.setState({ data: data })
                } else {
                    console.log("erro ao carregar")
                }
            }).catch(() => console.log("erro de conexao/request"));
        }
    }


    componentDidMount(){
     
        GetData("/patient/" + this.state.user_id).then(response => {
            if (response.errors.length === 0){
                let responseJSON = response.data;
                let data = {
                    name: responseJSON.name === null ? "" : responseJSON.name,
                    email: responseJSON.email === null ? "" : responseJSON.email,
                    cpf: responseJSON.cpf === null ? "" : responseJSON.cpf,
                    data_nasc: responseJSON.data_nasc === null ? "" : responseJSON.data_nasc,
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
    }

    render(){
        const { classes } = this.props
        const  { isAutenticated, data, user_id } = this.state;
        
        if (!isAutenticated || isAutenticated === undefined){
            return (
                 <Redirect push to="/login" />
            );    
        }

        const content = (
            <React.Fragment>                   
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
                                                disabled
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
                                                disabled
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
                                    <InputMask mask="999.999.999-99" disabled InputLabelProps={{ shrink: true }} value={data.cpf || ''}> 
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
                               
                                <Grid item xs>
                                    <TextField   
                                        InputLabelProps={{ shrink: true }} value={data.data_nasc || ''} 
                                        label="Data de Nascimento"
                                        //error={shouldMarkError("dataNascimento")}
                                        disabled
                                        name="dataNascimento"
                                        type="text"
                                        variant="outlined"
                                        fullWidth  
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="grid-container" container>
                                <Grid className="grid-item" item xs>
                                    <TextField 
                                        name="peso"
                                        disabled
                                        value={data.peso}
                                        fullWidth
                                        type="text"
                                        label="Peso"
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                            
                                    
                                </Grid>
                                <Grid className="grid-item" item xs>
                                    <TextField 
                                        name="altura"
                                        disabled
                                        value={data.altura}
                                        fullWidth
                                        type="text"
                                        label="Altura"
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                 
                                <Grid item xs>
                            
                                    <TextField
                                        disabled
                                        label="Telefone"
                                        InputLabelProps={{ shrink: true }} 
                                        value={data.telefone || ''}
                                            onChange={(e) => this.handleChange(e)}
                                        // error={shouldMarkError("telefone")}
                                        name="telefone"
                                        type="text"
                                        variant="outlined"
                                        fullWidth  
                                    />
                                  
                                </Grid>
                               
                            </Grid>
                            
                            <Grid className="grid-container" container>
                                <Grid className="grid-item" item xs>
                                    <TextField                       
                                       // select
                                        // onBlur={this.handleBlur("estado")}
                                        // error={shouldMarkError("estado")}              
                                        // name="estado"
                                        value={data.estado || ''}
                                        fullWidth
                                        label="Estado"
                                        variant="outlined"
                                        disabled
                                        InputLabelProps={{ shrink: true }}
                                        //onChange={(e) => this.handleChange(e)}
                                    />
                                    
                                </Grid>
                                <Grid className="grid-item"  item xs>
                                    <TextField       
                                        // error={shouldMarkError("cidade")}     
                                        // onBlur={this.handleBlur("cidade")}                                  
                                        // name="cidade"
                                        InputLabelProps={{ shrink: true }}
                                        disabled
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
                                        disabled
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
                <Menu title={Auth.getId() === user_id ? "Meu Perfil" : data.name} component={content} handleLogout={this.handleLogout} />
            </React.Fragment>
        )
    }
}

export default withStyles(styles) (Perfil);