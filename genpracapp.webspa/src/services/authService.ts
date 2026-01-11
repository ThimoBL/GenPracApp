import { InteractionRequiredAuthError, PublicClientApplication } from "@azure/msal-browser";
import { apiRequest, msalConfig } from "../auth/msalConfig";

const instance = await PublicClientApplication.createPublicClientApplication(msalConfig);

export const authService = {
    getAccessToken: async (): Promise<string | null> => {
        const activeAccount = instance.getActiveAccount();

        if (!activeAccount) {
            throw new Error("No active account! Please sign in.");
        }

        const accessTokenRequest = {
            scopes: apiRequest.scopes
        };

        instance.acquireTokenSilent(accessTokenRequest)
            .then((accessTokenResponse) => {
                return accessTokenResponse.accessToken;
            })
            .catch((error) => {
                if (error instanceof InteractionRequiredAuthError) {
                    instance.acquireTokenRedirect(accessTokenRequest);
                }
                throw error;
            });
        return null;
    }
};

export default authService;