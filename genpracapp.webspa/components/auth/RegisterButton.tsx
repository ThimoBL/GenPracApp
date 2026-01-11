import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../src/msalConfig";
import Button from "@mui/material/Button";

const RegisterButton = () => {
    const { instance } = useMsal();

    const handleRegister = () => {
        instance
            .loginRedirect({
                ...loginRequest,
                prompt: 'create',
            })
            .catch((error) => console.log(error));
    };

    return (
        <Button variant="outlined" color="primary" onClick={handleRegister}>
            Register
        </Button>
    );
};

export default RegisterButton;
