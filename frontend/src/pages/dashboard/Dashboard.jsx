import React, { useContext, useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import classNames from 'classnames'; 
import { ThemeContext } from '../../context/ThemeContext';
import CreateFilesModal from "../../components/filesmodal/CreateFilesModal";
import DeleteFilesModal from "../../components/deletefilesmodal/DeleteFilesModal";
import Navdashboard from "../../components/navdashboard/Navdashboard";
import {
  delete_icon,
  folder_icon,
  create_file_icon,
} from "../../assets/assets";
import {useNavigate} from 'react-router-dom'
import { ModalContext } from "../../context/ModalContext";
import { getAllFilesOrFolder } from "../../apis/files";

function Dashboard() {
  const { folderModal, toggleFolderModal } = useContext(ModalContext);
  const { deleteModal, toggleDeleteModal } = useContext(ModalContext);
   const {isDarkTheme} = useContext(ThemeContext);
  const [files, setFiles] = useState([]);
  const [creationType, setCreationType] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [isParentId, setIsParentId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const fetchFilesOrFolders = async (parentId = null) => {
    try {
      const res = await getAllFilesOrFolder(parentId);
      if (res && res.data) {
        setFiles(res.data.files);
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const handleCrateFilesModal = (type) => {
    setCreationType(type);
    if (type === "folder") {
      setSelectedFolderId(null);
    }
    toggleFolderModal();
  };

  const handleDeleteFilesModal = (fileId, type) => {
    setSelectedFileId(fileId);
    setCreationType(type);
    toggleDeleteModal();
  };

  const filterFolders = files.filter((item) => item.type === "folder");
  const filterFiles = files.filter((item) => item.type === "file");

 

  const handleFolderClick = (folderId) => {
    setSelectedFolderId(folderId); // Set selected folder
  };
  useEffect(() => {
    fetchFilesOrFolders(selectedFolderId);
  }, [selectedFolderId]);

  useEffect(()=>{
    if(!token){
      navigate('/');
    }
  },[]);

  return (
    <div 
    className={classNames(styles.dashboard, {
            [styles.light]: !isDarkTheme,
            [styles.dark]: isDarkTheme,
          })}
   >
      <Navdashboard />
      <div className={styles.dashboard_foldersConatiner}>
        <div
          onClick={() => handleCrateFilesModal("folder")}
          className={classNames(styles.create_folderConatiner, {
            [styles.light]: !isDarkTheme,
            [styles.dark]: isDarkTheme,
          })}
         
        >
          <img src={folder_icon} alt="icon" />
          <p>Create a folder</p>
        </div>
        {filterFolders?.map((item) => (
          <div
            key={item._id}
            className={classNames(styles.folderConatiner, {
              [styles.light]: !isDarkTheme,
              [styles.dark]: isDarkTheme,
            })}
          
            onClick={() => handleFolderClick(item._id)}
            style={{
              backgroundColor: isDarkTheme ? selectedFolderId === item._id && "white" : selectedFolderId === item._id && "black",
              color:isDarkTheme ? selectedFolderId === item._id && "black" : selectedFolderId === item._id && "white"  ,
            }}
          >
            <p>{item.name}</p>
            <img
              src={delete_icon}
              alt="icon"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering folder selection when deleting
                handleDeleteFilesModal(item._id, item.type);
              }}
            />
          </div>
        ))}
      </div>
      <div className={styles.dashboard_filesContainer}>
        <div
          onClick={() => handleCrateFilesModal("files")}
          className={styles.create_fileContainer}
        >
          <img src={create_file_icon} alt="icon" />
          <p>Create a typebot</p>
        </div>
        {filterFiles?.map((item) => (
          <div key={item._id} 
          className={classNames(styles.fileContainer, {
            [styles.light]: !isDarkTheme,
            [styles.dark]: isDarkTheme,
          })}
        >
            <img
              src={delete_icon}
              alt="icon"
              onClick={() => handleDeleteFilesModal(item._id, item.type)}
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      {folderModal && (
        <CreateFilesModal
          creationType={creationType}
          selectedFolderId={selectedFolderId}
          fetchFilesOrFolders={fetchFilesOrFolders}
        />
      )}
      {deleteModal && (
        <DeleteFilesModal
          creationType={creationType}
          selectedFileId={selectedFileId}
          selectedFolderId={selectedFolderId}
          isParentId={isParentId}
          fetchFilesOrFolders={fetchFilesOrFolders}
        />
      )}
    </div>
  );
}

export default Dashboard;
