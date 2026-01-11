import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { Navigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import SignInButton from "../../components/auth/SignInButton";
import RegisterButton from "../../components/auth/RegisterButton";

const SignIn = () => {
    return (
        <Box>
            <AuthenticatedTemplate>
                <Navigate to="/profile" replace />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Box textAlign="center">
                    <Typography variant="h4" gutterBottom>
                        Welcome
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                        Please sign in or register to continue
                    </Typography>
                    <Stack spacing={2} direction="row" justifyContent="center">
                        <SignInButton />
                        <RegisterButton />
                    </Stack>
                </Box>
            </UnauthenticatedTemplate>
        </Box>
    );
};

export default SignIn;