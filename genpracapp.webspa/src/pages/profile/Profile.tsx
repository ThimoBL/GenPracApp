import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { Alert, Box, Button, Card, CardContent, Typography, Divider, Stack } from "@mui/material";
import { useState } from "react";
import SignOutButton from "../../components/common/SignOutButton";
import { apiRequest } from "../../auth/msalConfig";

const Profile = () => {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    const [isLoggingToken, setIsLoggingToken] = useState(false);
    const [tokenError, setTokenError] = useState<string | null>(null);

    const handleLogAccessToken = async () => {
        if (!activeAccount) return;

        setTokenError(null);
        setIsLoggingToken(true);

        try {
            const tokenResponse = await instance.acquireTokenSilent({
                account: activeAccount,
                scopes: apiRequest.scopes,
            });

            // Note: this logs to the browser devtools console.
            console.log("Access token:", tokenResponse.accessToken);
        } catch (err) {
            if (err instanceof InteractionRequiredAuthError) {
                const tokenResponse = await instance.acquireTokenPopup({
                    account: activeAccount,
                    scopes: apiRequest.scopes,
                });
                console.log("Access token:", tokenResponse.accessToken);
            } else {
                setTokenError(err instanceof Error ? err.message : String(err));
            }
        } finally {
            setIsLoggingToken(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <Card sx={{ minWidth: 400, maxWidth: 600 }}>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Profile
                    </Typography>
                    {activeAccount ? (
                        <>
                            <Divider sx={{ my: 2 }} />
                            <Stack spacing={2}>
                                {tokenError && <Alert severity="error">{tokenError}</Alert>}
                                <Box>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Name
                                    </Typography>
                                    <Typography variant="body1">
                                        {activeAccount.name || "N/A"}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Username
                                    </Typography>
                                    <Typography variant="body1">
                                        {activeAccount.username || "N/A"}
                                    </Typography>
                                </Box>
                                {activeAccount.idTokenClaims && 'email' in activeAccount.idTokenClaims && (
                                    <Box>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            Email
                                        </Typography>
                                        <Typography variant="body1">
                                            {String(activeAccount.idTokenClaims.email)}
                                        </Typography>
                                    </Box>
                                )}
                            </Stack>
                            <Divider sx={{ my: 3 }} />
                            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                <Button
                                    variant="outlined"
                                    onClick={handleLogAccessToken}
                                    disabled={isLoggingToken}
                                >
                                    {isLoggingToken ? "Getting token…" : "Log access token"}
                                </Button>
                                <SignOutButton />
                            </Box>
                        </>
                    ) : (
                        <Typography>No user logged in</Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default Profile;
