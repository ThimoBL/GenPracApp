import { Card, CardContent, Stack, Typography } from "@mui/material";
import SignInButton from "../../components/common/SignInButton";
import RegisterButton from "../../components/common/RegisterButton";

const SignIn = () => {
    return (
        <Card sx={{ minWidth: 400, maxWidth: 500, px: 2, py: 3 }}>
            <CardContent>
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome
                </Typography>
                <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 4 }}>
                    Please sign in or register to continue
                </Typography>
                <Stack spacing={2} direction="column">
                    <SignInButton />
                    <RegisterButton />
                </Stack>
            </CardContent>
        </Card>
    );
};

export default SignIn;