import { ThemeProvider, createTheme } from '@mui/material/styles';

interface MuiThemeProviderProps {
    children?: React.ReactNode;
}

const theme = createTheme();

export default function MuiThemeProvider(props: MuiThemeProviderProps) {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
}