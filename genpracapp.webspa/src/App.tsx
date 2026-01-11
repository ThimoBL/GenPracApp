import type { PublicClientApplication } from "@azure/msal-browser"
import { MsalProvider } from "@azure/msal-react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"

const App = ({ instance }: { instance: PublicClientApplication }) => {
  return (
    <MsalProvider instance={instance}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </MsalProvider>
  )
}

export default App;
