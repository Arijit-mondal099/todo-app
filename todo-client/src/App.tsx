import type React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";

const App: React.FC = () => {
  const { token } = useAppContext()

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Navbar />
        <Toaster />

        <Routes>
          <Route path="/" element={token ? <Home /> : <Navigate to={"/login"} replace />} />
          <Route path="/login" element={!token ? <Login /> : <Navigate to={"/"} replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
