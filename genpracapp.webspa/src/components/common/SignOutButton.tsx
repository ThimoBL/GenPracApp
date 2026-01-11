import { useMsal } from "@azure/msal-react";
import Button from "@mui/material/Button";

const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = () => {
        instance
            .logoutRedirect({
                postLogoutRedirectUri: window.location.origin,
            })
            .catch((error) => console.log(error));
        }

    return (
        <Button variant="contained" color="secondary" onClick={handleLogout}>
            Sign Out
        </Button>
    );
};

export default SignOutButton;
