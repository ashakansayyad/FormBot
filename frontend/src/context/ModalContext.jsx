import React, { useState, createContext } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [folderModal,setFolderModal] = useState(false);
  const [deleteModal,setDeleteModal] = useState(false);

  const toggleLogoutModal = () => {
    setLogoutModal(!logoutModal);
  };

  const toggleFolderModal = ()=>{
    setFolderModal(!folderModal);
  }
  const toggleDeleteModal = ()=>{
    setDeleteModal(!deleteModal);
  }
  return (
    <ModalContext.Provider
      value={{
        logoutModal,
        folderModal,
        deleteModal,
        setLogoutModal,
        setFolderModal,
        setDeleteModal,
        toggleLogoutModal,
        toggleFolderModal,
        toggleDeleteModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
