import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, CssBaseline } from "@material-ui/core";
import { MdMenu, MdChevronLeft, MdHome, MdPerson, MdPeople, MdExitToApp } from 'react-icons/md';

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
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  
  const [open, setOpen] = React.useState(false);

  const handleMenu = () => {
      setOpen(!open)
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
            onClick={handleMenu}
            edge="start"
          >
            <MdMenu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Miocardio Pediatria
          </Typography>
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
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleMenu}>
            <MdChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List>
                        <ListItem button>
                            <ListItemIcon><MdHome size={30} /></ListItemIcon>
                            <ListItemText primary={"Homepage"}></ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><MdPeople size={30} /></ListItemIcon>
                            <ListItemText primary={"Pacientes"}></ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><MdPerson size={30} /></ListItemIcon>
                            <ListItemText primary={"Perfil"}></ListItemText>
                        </ListItem>
                       
                    </List>
                    <Divider />
                    <List>
                        <ListItem button>
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
        Homepage
      </main>
    </div>
  );
}