import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Paper from '@material-ui/core/Paper';
import { Route } from 'react-router-dom';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    width: 94*window.innerWidth/100,
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PacienteCard(props) {
  const classes = useStyles();
  const { nome, upData, sexo, idade, estado, cidade } = props;

  return (
    <Paper className={classes.paper}>
      <Route render={({ history }) => (
          <ListItem button className={classes.card} onClick={() => history.push('/perfil_paciente')}>
            <ListItemAvatar>
                <Avatar aria-label="recipe" className={classes.avatar}>A</Avatar>
            </ListItemAvatar>
            <ListItemText primary={"Ana Marta"} secondary={"Último update: "+upData+" | "+sexo+" | "+idade+" anos"} />
          </ListItem>
      )}/>
    </Paper>
  );
}
