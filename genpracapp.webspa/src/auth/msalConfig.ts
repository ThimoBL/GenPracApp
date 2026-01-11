import { LogLevel } from '@azure/msal-browser';

/**
* Configuration object to be passed to MSAL instance on creation. 
* For a full list of MSAL.js configuration parameters, visit:
* https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
*/

export const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_MSAL_CLIENT_ID, // This is the ONLY mandatory field that you need to supply.
        authority: import.meta.env.VITE_MSAL_AUTHORITY, // Replace the placeholder with your tenant info
        redirectUri: import.meta.env.VITE_MSAL_REDIRECT_URI, // Points to window.location.origin. You must register this URI on Microsoft Entra admin center/App Registration.
        postLogoutRedirectUri: import.meta.env.VITE_MSAL_LOGOUT_REDIRECT_URI, // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        allowNativeBroker: false,
        loggerOptions: {
            loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: ["openid", "profile"]
};

/**
 * Scopes for your API. You need to expose these in your API's app registration.
 * Format: api://<API_CLIENT_ID>/<SCOPE_NAME>
 */
export const apiRequest = {
    scopes: [`api://${import.meta.env.VITE_WEBAPI_CLIENT_ID}/Weatherforecast.Read`]
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};