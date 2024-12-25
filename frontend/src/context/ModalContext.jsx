import React, { useState, createContext } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const toggleLogoutModal = () => {
    setLogoutModal(!logoutModal);
  };

  return (
    <ModalContext.Provider
      value={{
        logoutModal,
        setLogoutModal,
        toggleLogoutModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
