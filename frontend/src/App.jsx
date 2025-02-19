import React from "react";
import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import { Home, Login, Signup, Notfound, Settings,Dashboard,FormBot } from "./pages/pages";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserConatext";
import { ModalProvider } from "./context/ModalContext";
import { ThemeProvider } from "./context/ThemeContext";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <ModalProvider>
        <ThemeProvider>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/formbot" element={<FormBot/>}/>
            <Route path="*" element={<Notfound />} />
          </Routes>
        </BrowserRouter>
        </ThemeProvider>
      </ModalProvider>
    </UserProvider>
  );
}

export default App;
