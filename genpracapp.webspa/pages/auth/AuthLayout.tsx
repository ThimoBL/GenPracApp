import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Outlet />
        </Grid>
    );
};

export default AuthLayout;