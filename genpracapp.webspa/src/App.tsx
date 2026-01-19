import { BrowserRouter } from "react-router-dom"
import AzureMsalProvider from "./providers/AzureMsalProvider"
import MuiThemeProvider from "./providers/MuiThemeProvider"
import AppRoutes from "./AppRoutes"

const App = () => {
  return (
    <AzureMsalProvider>
      <MuiThemeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MuiThemeProvider>
    </AzureMsalProvider>
  )
}

export default App;
