import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../src/msalConfig";
import Button from "@mui/material/Button";

const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance
            .loginRedirect({
                ...loginRequest,
                prompt: 'select_account',
            });
    };

    return (
        <Button variant="contained" color="primary" onClick={handleLogin}>
            Sign In
        </Button>
    );
};

export default SignInButton;
