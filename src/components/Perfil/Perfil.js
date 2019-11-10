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
            data: "",
        }
    }

    handleLogout = () => {
        Auth.unauthenticateUser();
        this.setState({ isAutenticated: false })
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

    render(){
        const { classes } = this.props
        const  { isAutenticated, data, user_id } = this.state;
        const { name, email, cpf, data_nasc, telefone, estado, cidade, bairro } = data;
        if (!isAutenticated || isAutenticated === undefined){
            return (
                 <Redirect push to="/login" />
            );    
        }

        const content = (
            <React.Fragment>
                {/* <Paper className="paper">
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
                </Paper> */}
                <Paper className="profile-paper" elevation={3}>
                        <form>
                            <Grid className="grid-container" container>
                                <Grid item xs>
                                    <div className={classes.wrapperCamera}>
                                        <Avatar className={classes.avatar} src={""} alt="profile-image" sizes="60" >
                                            {name !== undefined && name.charAt(0)}
                                        </Avatar>
                                        <IconButton className={classes.camera} color="primary" onClick={() => alert("change picture :)")}>
                                            <MdCameraAlt />
                                        </IconButton>
                                    </div>
                                </Grid>
                                <Grid item xs>
                                    <Grid container>
                                        <Grid style={{marginBottom: "16px"}} item xs={12}>
                                            <TextField 
                                                // onBlur={this.handleBlur("nome")}
                                                // error={shouldMarkError("nome")}
                                                name="nome"
                                                value={name}
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
                                                value={email}
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
                                <Grid item xs>
                                    
                                </Grid>
                            </Grid>
                            <Grid className="grid-container" container>
                                <Grid className="grid-item" item xs>
                                    <InputMask mask="999.999.999-99" value={cpf} onChange={(e) => this.handleChange(e)}> 
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
                                    <InputMask mask="99/99/9999" value={data_nasc} onChange={(e) => this.handleChange(e)}> 
                                        {inputProps => (
                                            <TextField
                                                {...inputProps}       
                                                label="Data de Nascimento"
                                                // error={shouldMarkError("dataNascimento")}
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
                                                // onBlur={this.handleBlur("especialidade")}
                                                // value={especialidade}
                                                onChange={this.handleInputChange}
                                                id="esp"
                                                fullWidth
                                                // error={shouldMarkError("especialidade")}
                                                variant="outlined"
                                                label="Especialidade"
                                                placeholder="Especialidade"
                                            >
                                                {/* {especialidadeArray.map(esp => {
                                                     return <MenuItem key={esp.id} value={esp.id}>
                                                                {esp.name}
                                                            </MenuItem>
                                                })} */}
                                            </TextField>
                                    
                                </Grid>
                                <Grid className="grid-item" item xs>
                                    <TextField 
                                        name="crm"
                                        // error={shouldMarkError("crm")}
                                        // onBlur={this.handleBlur("crm")}
                                        // value={crm}
                                        fullWidth
                                        type="number"
                                        label="CRM"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                 
                                <Grid item xs>
                                    <InputMask  type="tel" mask="(99) 99999-9999" value={telefone} onChange={(e) => this.handleChange(e)}> 
                                        {inputProps => (
                                            <TextField
                                                {...inputProps}       
                                                label="Telefone"
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
                                        // onBlur={this.handleBlur("estado")}
                                        // error={shouldMarkError("estado")}              
                                        // name="estado"
                                        value={estado}
                                        fullWidth
                                        label="Estado"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    >
                                        {/* {this.state.estadoArray.map(uf => {
                                            return <MenuItem key={uf} value={uf}>{uf}</MenuItem>
                                        })} */}
                                    </TextField>
                                </Grid>
                                <Grid className="grid-item"  item xs>
                                    <TextField       
                                        // error={shouldMarkError("cidade")}     
                                        // onBlur={this.handleBlur("cidade")}                                  
                                        // name="cidade"
                                        value={cidade}
                                        fullWidth
                                        label="Cidade"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField         
                                        // error={shouldMarkError("bairro")}     
                                        // onBlur={this.handleBlur("bairro")}                                
                                        // name="bairro"
                                        value={bairro}
                                        fullWidth
                                        label="Bairro"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange(e)}
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
                            <div style={{display: "flex", alignItems: "center" }}>
                                <Typography variant="body1">Trocar Senha</Typography>
                                <IconButton  className={classes.changePassword} color="primary" onClick={() => alert("change password :)")}>
                                    <MdLockOutline />
                                </IconButton>

                            </div>

                            <Button style={{float: "right"}} variant="contained" color="primary" onClick={(e) => this.handleConfirmar(e)}>Confirmar</Button>
                        </form>
                    </Paper>
            </React.Fragment>
        )

        return(
            <React.Fragment>
                <Menu title={Auth.getId() === user_id ? "Meu Perfil" : name} component={content} handleLogout={this.handleLogout} />
            </React.Fragment>
        )
    }
}

export default withStyles(styles) (Perfil);