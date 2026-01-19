import { Box, Typography, Container, Paper, Stack, Divider } from '@mui/material';

const About = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 6 }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        About GenPracApp
                    </Typography>
                    <Divider sx={{ my: 3 }} />

                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium', mt: 2 }}>
                                Our Mission
                            </Typography>
                            <Typography variant="body1" paragraph>
                                GenPracApp is dedicated to streamlining healthcare practice management through
                                innovative technology solutions. We believe that by simplifying administrative tasks,
                                healthcare professionals can focus more on what matters most - patient care.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
                                What We Offer
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Our comprehensive platform provides healthcare professionals with tools to:
                            </Typography>
                            <Stack spacing={1} sx={{ pl: 2 }}>
                                <Typography variant="body1">
                                    • Securely manage patient records and medical histories
                                </Typography>
                                <Typography variant="body1">
                                    • Efficiently schedule and track appointments
                                </Typography>
                                <Typography variant="body1">
                                    • Streamline prescription management
                                </Typography>
                                <Typography variant="body1">
                                    • Automate routine administrative workflows
                                </Typography>
                            </Stack>
                        </Box>

                        <Box>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
                                Our Commitment
                            </Typography>
                            <Typography variant="body1" paragraph>
                                We are committed to maintaining the highest standards of data security and privacy.
                                All patient information is encrypted and stored in compliance with healthcare regulations
                                and industry best practices.
                            </Typography>
                        </Box>

                        <Box sx={{ mt: 4, p: 3, bgcolor: 'primary.light', borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                                Contact Us
                            </Typography>
                            <Typography variant="body2">
                                For more information or support, please reach out to our team at support@genpracapp.com
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Box>
        </Container>
    );
};

export default About;
