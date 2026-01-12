import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Box, Card, CardContent, Typography, Divider, Stack, Button } from "@mui/material";
import SignOutButton from "../components/common/SignOutButton";
import SignInButton from "../components/common/SignInButton";
import RegisterButton from "../components/common/RegisterButton";
import { apiRequest } from "../auth/msalConfig";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

const Home = () => {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    const getWeatherData = async () => {
        const accessTokenRequest = {
            scopes: apiRequest.scopes
        };

        instance.acquireTokenSilent(accessTokenRequest)
            .then((accessTokenResponse) => {
                let accessToken = accessTokenResponse.accessToken;

                console.log("Access Token:", accessToken);

                // Call your API with the access token
                fetch(import.meta.env.VITE_WEBAPI_BASE_URL + "weatherforecast", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Weather Data:", data);
                    })
                    .catch(error => {
                        console.error("Error fetching weather data:", error);
                    });
            })
            .catch((error) => {
                if (error instanceof InteractionRequiredAuthError) {
                    instance.acquireTokenRedirect(accessTokenRequest);
                }
                console.log(error);
            });
    };

    const testApiConnection = async () => {
        const accessTokenRequest = {
            scopes: apiRequest.scopes
        };

        instance.acquireTokenSilent(accessTokenRequest)
            .then((accessTokenResponse) => {
                let accessToken = accessTokenResponse.accessToken;

                console.log("Access Token:", accessToken);

                // Call your API with the access token
                fetch(import.meta.env.VITE_WEBAPI_BASE_URL + "weatherforecast/test-auth", {
                    method: "GET",
                    // headers: {
                    //     Authorization: `Bearer ${accessToken}`
                    // }
                })
                    .then(data => {
                        console.log("Tested api:", data);
                    })
                    .catch(error => {
                        console.error("Error fetching weather data:", error);
                    });
            })
            .catch((error) => {
                if (error instanceof InteractionRequiredAuthError) {
                    instance.acquireTokenRedirect(accessTokenRequest);
                }
                console.log("Error retreiving acquireTokenSilent: ", error);
            });
    };


    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="#f5f5f5"
        >
            <Card sx={{ minWidth: 400, maxWidth: 600 }}>
                <CardContent>
                    <AuthenticatedTemplate>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Welcome Back!
                        </Typography>
                        {activeAccount ? (
                            <>
                                <Divider sx={{ my: 2 }} />
                                <Stack spacing={2}>
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
                                    <Box>
                                        <Button variant="contained" color="secondary" onClick={getWeatherData}>Get Weather Data</Button>
                                        <Divider sx={{ my: 3 }} />
                                        <Button variant="contained" color="primary" onClick={testApiConnection}>Test api Connection</Button>
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
                                <Box>
                                    <SignOutButton />
                                </Box>
                            </>
                        ) : null}
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
                </CardContent>
            </Card>
        </Box>
    );
};

export default Home;
