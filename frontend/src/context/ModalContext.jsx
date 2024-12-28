import React, { useState, createContext } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [folderModal, setFolderModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const toggleLogoutModal = () => {
    setLogoutModal(!logoutModal);
  };

  const toggleFolderModal = () => {
    setFolderModal(!folderModal);
  };
  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const toggleShareModal = ()=>{
    setShareModal(!shareModal);
  }
  return (
    <ModalContext.Provider
      value={{
        logoutModal,
        folderModal,
        deleteModal,
        shareModal,
        setLogoutModal,
        setFolderModal,
        setDeleteModal,
        toggleLogoutModal,
        toggleFolderModal,
        toggleDeleteModal,
        toggleShareModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
