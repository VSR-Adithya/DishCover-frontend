import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';

const themes = createTheme({
    //  style:{ backgroundImage:`url('https://static.vecteezy.com/system/resources/previews/001/849/553/original/modern-gold-background-free-vector.jpg')` },
    palette: {
        mode: 'dark',
    },
});
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Navbar() {
    const theme = useTheme();
    const location = useLocation();

    const [open, setOpen] = React.useState(false);

    const currentPage = location.pathname;

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handlelogout = () => {
        localStorage.removeItem('user')
        window.location.href = '/signin'
    }
    const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <ThemeProvider
            theme={themes}
        >
            <Box style={{
                background: 'linear-gradient(90deg, white 10%, #f4f6c6 90%)'
            }}>
                <Container  >
                    <Container component="main" maxWidth="lg" >
                        <CssBaseline />
                        <Box sx={{ display: 'flex' }} >
                            <CssBaseline />
                            <AppBar position="fixed" open={open}>
                                <Toolbar>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={handleDrawerOpen}
                                        edge="start"
                                        sx={{
                                            marginRight: 5,
                                            ...(open && { display: 'none' }),
                                        }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography style={{fontSize: "small"}}>
                                        {currentPage === '/profile' && <h1>Profile</h1>}
                                        {currentPage === '/saved' && <h1>Saved Recipes</h1>}
                                        {currentPage === '/dashboard' && <h1>Home</h1>}
                                    </Typography>

                                </Toolbar>
                            </AppBar>
                            <Drawer variant="permanent" open={open}>
                                <DrawerHeader>
                                    <IconButton onClick={handleDrawerClose}>
                                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                    </IconButton>
                                </DrawerHeader>
                                <Divider />
                                <List>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }} href="/dashboard"
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <DashboardIcon ></DashboardIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>

                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                        href="/profile"
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <AccountCircleIcon ></AccountCircleIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                        href="/saved"
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <FavoriteIcon></FavoriteIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="Saved" sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>

                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }} onClick={handlelogout}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <LogoutIcon></LogoutIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="LogOut" sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>

                                </List>
                                <Divider />

                            </Drawer>

                        </Box>
                    </Container>
                </Container>
            </Box>
        </ThemeProvider>
    );
}