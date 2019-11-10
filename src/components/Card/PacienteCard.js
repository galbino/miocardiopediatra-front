import React from 'react';
import { Paper, Avatar, Menu, MenuItem, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Route } from 'react-router-dom';
import { deepPurple } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { MdMoreVert } from 'react-icons/md';

const useStyles = makeStyles(theme => ({
  paper: { 
    //marginBottom: "1em",
    width: 385,
    maxWidth: 385,
  },
  card: {
    //width: 94*window.innerWidth/100,
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    backgroundColor: deepPurple[500],
  },
  menu: {
    maxHeight: 48 * 4.5,
    width: 200,
  }
}));

export default function PacienteCard(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { nome, id } = props;
  const menuOptions = ["Visualizar Perfil"];
  
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper className={classes.paper} elevation={2}>
      <Route render={({ history }) => (
        
          <ListItem button className={classes.card} onClick={() => history.push('/anamnese/' + id)}>
            <ListItemAvatar>
              <Avatar aria-label="recipe" className={classes.avatar}>{nome.charAt(0).toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={nome}  />
            <ListItemSecondaryAction>
              <IconButton onClick={handleClick}>
                <MdMoreVert />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                className={classes.menu}
              >
                {menuOptions.map(option => (
                  <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => history.push('/perfil/' + id)}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </ListItemSecondaryAction>
          </ListItem>
        
      )}/>
    </Paper>
  );
}
