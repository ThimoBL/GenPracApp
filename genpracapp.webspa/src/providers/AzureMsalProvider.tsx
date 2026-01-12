import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "../auth/msalConfig";
import { MsalProvider } from "@azure/msal-react";

interface MsalProviderProps {
    children: React.ReactNode;
}

export default function AzureMsalProvider(props: MsalProviderProps) {
    /**
    * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
    * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
    */
    const msalInstance = new PublicClientApplication(msalConfig);

    // Default to using the first account if no account is active on page load
    if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
        // Account selection logic is app dependent. Adjust as needed for different use cases.
        msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
    }

    // Listen for sign-in event and set active account
    msalInstance.addEventCallback((event: any) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
            const account = event.payload.account;
            msalInstance.setActiveAccount(account);
        }
    });

    return (
        <MsalProvider instance={msalInstance}>
            {props.children}
        </MsalProvider>
    );
};