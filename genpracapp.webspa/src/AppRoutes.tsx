import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/auth/SignIn";
import Profile from "./pages/profile/Profile";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Auth Layout - No app bar, just centered card */}
            <Route element={<AuthLayout />}>
                <Route path="/auth/signin" element={<SignIn />} />
            </Route>

            {/* Main Layout - With app bar and navigation */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<Welcome />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                {/* Add more protected routes here */}
            </Route>

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
