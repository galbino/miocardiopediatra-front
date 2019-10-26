import React from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router'
import { Menu } from '../components';
import { Paper, Grid, RadioGroup, Radio, FormControlLabel  } from '@material-ui/core';

class Anamnese extends React.Component {
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
        const isAutenticated = this.state.isAutenticated;
        if (!isAutenticated || isAutenticated === undefined){
            return (
                 <Redirect push to="/login" />
            );    
        }
       
        const content = (
            <React.Fragment>
                <Paper className="paper">
                    <Grid container alignContent="center" alignItems="center" spacing={1}>
                        <Grid item xs>
                            Apresenta dispineia aos esforcos?
                            <RadioGroup aria-label="position" name="position" value={1} onChange={() => alert("change")} row>
                                <FormControlLabel
                                    value="top"
                                    control={<Radio color="primary" />}
                                    label="Top"
                                    labelPlacement="top"
                                />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                </Paper>
            </React.Fragment>
        )

        return(
           <React.Fragment>
               <Menu title="Anamnese" component={content} handleLogout={this.handleLogout} />
           </React.Fragment>     
        )
    }

}

export default Anamnese;
