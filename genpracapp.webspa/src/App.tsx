import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AzureMsalProvider from "./providers/AzureMsalProvider"
import MuiThemeProvider from "./providers/MuiThemeProvider"
import MainLayout from "./components/layout/MainLayout"

const App = () => {
  return (
    <AzureMsalProvider>
      <MuiThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MuiThemeProvider>
    </AzureMsalProvider>
  )
}

export default App;
