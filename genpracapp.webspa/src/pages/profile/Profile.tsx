import { useMsal } from "@azure/msal-react";
import { Box, Card, CardContent, Typography, Divider, Stack } from "@mui/material";
import SignOutButton from "../../components/common/SignOutButton";

const Profile = () => {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
        >
            <Card sx={{ minWidth: 400, maxWidth: 600 }}>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Profile
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
                    ) : (
                        <Typography>No user logged in</Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default Profile;
