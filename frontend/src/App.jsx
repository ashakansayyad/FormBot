import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Signup, Notfound, Settings,Dashboard } from "./pages/pages";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserConatext";
import { ModalProvider } from "./context/ModalContext";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <ModalProvider>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </UserProvider>
  );
}

export default App;
