import { Box, Typography, Container, Stack, Button, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 6, textAlign: 'center' }}>
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Welcome to GenPracApp
                    </Typography>
                    <Typography variant="h5" color="textSecondary" paragraph sx={{ mt: 3, mb: 4 }}>
                        Your comprehensive practice management solution
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ mb: 4, textAlign: 'left' }}>
                        GenPracApp is designed to help healthcare professionals manage their practice efficiently.
                        With our platform, you can:
                    </Typography>
                    <Stack spacing={2} sx={{ textAlign: 'left', mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircleIcon color="primary" />
                            <Typography variant="body1">
                                Manage patient records securely
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircleIcon color="primary" />
                            <Typography variant="body1">
                                Schedule appointments with ease
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircleIcon color="primary" />
                            <Typography variant="body1">
                                Track medical history and prescriptions
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircleIcon color="primary" />
                            <Typography variant="body1">
                                Streamline administrative tasks
                            </Typography>
                        </Box>
                    </Stack>
                    <Box sx={{ mt: 5 }}>
                        <Typography variant="body1" color="textSecondary" paragraph>
                            Ready to get started?
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/auth/signin')}
                            sx={{ mt: 2, px: 4, py: 1.5 }}
                        >
                            Sign In or Register
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Welcome;
