import React from 'react';
import clsx from 'clsx';
import { makeStyles, fade } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, CssBaseline, InputBase } from "@material-ui/core";
import { MdMenu, MdChevronLeft, MdHome, MdPerson, MdPeople, MdExitToApp, MdSearch, MdSend, MdChromeReaderMode } from 'react-icons/md';
import { Route } from 'react-router-dom';
import Auth from '../../utils/Auth';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: 400,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const id = Auth.getId();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleMenu = () => {
      setOpen(!open)
  }

  const handleChangeSearch = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = (e, value) => {
    e.preventDefault();
    alert("request pacient "+ value)
  }

  const handleKeyPress = (e, value) => {
    if (e.keyCode === 13) {
      return handleSubmit(e, value);
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            //className={classes.menuButton}
            className={clsx(classes.expand, {
              [classes.expandOpen]: open,
            })}
            onClick={handleMenu}
            aria-expanded={open}
            edge="start"
          >
            <MdMenu />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
              {props.title}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <MdSearch size={20} />
            </div>
            <InputBase
              placeholder="Pesquisar…"
              value={value}
              onChange={(e) => handleChangeSearch(e)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={(e) => handleKeyPress(e, value)}
            />
          </div>
          <IconButton color="inherit" onClick={(e) => handleSubmit(e, value)}>
            <MdSend />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={handleMenu}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleMenu}>
            <MdChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List>
            <Route render={({ history }) => (
                <ListItem button onClick={() => history.push('/home')}>
                  <ListItemIcon><MdHome size={30} /></ListItemIcon>
                  <ListItemText primary={"Homepage"}></ListItemText>
                </ListItem>
              )}
            />
            
            <Route render={({ history }) => (
                <ListItem button onClick={() => history.push('/pacientes')}>
                  <ListItemIcon><MdPeople size={30} /></ListItemIcon>
                  <ListItemText primary={"Pacientes"}></ListItemText>
                </ListItem>
              )}
            />

            <Route render={({ history }) => (
                <ListItem button onClick={() => history.push('/anamnese/' + id)}>
                    <ListItemIcon><MdChromeReaderMode size={30} /></ListItemIcon>
                    <ListItemText primary={"Anamnese"}></ListItemText>
                </ListItem>
              )}
            />
           
           <Route render={({ history }) => (
                <ListItem button onClick={() => history.push('/myperfil/' + id)}>
                    <ListItemIcon><MdPerson size={30} /></ListItemIcon>
                    <ListItemText primary={"Perfil"}></ListItemText>
                </ListItem>
              )}
            />
            
        </List>
        <Divider />
        <List>
            <ListItem button onClick={() => props.handleLogout()}>
                <ListItemIcon><MdExitToApp size={30} /></ListItemIcon>
                <ListItemText primary={"Sair"}></ListItemText>
            </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
          {props.component}
      </main>
    </div>
  );
}