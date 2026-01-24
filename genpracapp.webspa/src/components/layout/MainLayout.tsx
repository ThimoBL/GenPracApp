import { Outlet, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Container, IconButton, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { useState } from 'react';

const MainLayout = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ mr: 4 }}>
                        GenPracApp
                    </Typography>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/about">
                        About
                    </Button>
                    <Button color="inherit" component={Link} to="/uploads">
                        Uploads
                    </Button>
                    <Button color="inherit" component={Link} to="/profile" sx={{ mr: 'auto' }}>
                        Profile
                    </Button>
                    <UnauthenticatedTemplate>
                        <Button color="inherit" component={Link} to="/auth/signin">Login</Button>
                    </UnauthenticatedTemplate>
                    <AuthenticatedTemplate>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
                    </AuthenticatedTemplate>
                </Toolbar>
            </AppBar>
            <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
                <Outlet />
            </Container>
        </Box>
    );
};

export default MainLayout;
