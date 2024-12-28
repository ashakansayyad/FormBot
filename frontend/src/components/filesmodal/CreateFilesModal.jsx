import React, { useContext,useState,useEffect} from 'react'
import styles from './CreateFilesModal.module.css';
import { toast } from "react-toastify";
import classNames from 'classnames'; 
import { ThemeContext } from '../../context/ThemeContext';
import { ModalContext } from '../../context/ModalContext';
import { createFilesOrFolder } from '../../apis/files';


function CreateFilesModal({creationType,selectedFolderId,fetchFilesOrFolders}) {
    const { folderModal, toggleFolderModal } = useContext(ModalContext);
     const {isDarkTheme} = useContext(ThemeContext);
    const [newName, setNewName] = useState("");
    const [isFolder,setIsFolder] = useState(false);



    const handleCreateFolder = async(fileType,parentId = selectedFolderId)=>{
        try{
            if(!newName.trim()){
                toast.error("Please provide a name!");
                return;
            }
            
            const data = {name:newName,type:fileType,parentId}
            const res = await createFilesOrFolder(data);
            if(res && res.status === 201){
                toast.success(res.data);
                fetchFilesOrFolders(selectedFolderId);
                toggleFolderModal();
            }
        }catch(err){
            console.error("error occured: ",err);
             if (err.response.status === 400) {
                      toast.error(err.response.data.message);
            }
        }
    }

    useEffect(()=>{
        setIsFolder(creationType === "folder");
    },[creationType]);
   
    return (
        <>
            {folderModal && (
                <div className={styles.container}>
                    <div className={styles.overlay} onClick={toggleFolderModal}></div>
                    <div 
                     className={classNames(styles.modalContent, {
                                [styles.light]: !isDarkTheme,
                                [styles.dark]: isDarkTheme,
                              })}
                   >
                        <p>Create New {isFolder ? "Folder" : "File"}</p>
                        <input
                         type="text"
                            placeholder={isFolder ? 'Enter folder name' : 'Enter file name'}
                            onChange={(e)=>setNewName(e.target.value)}
                        />
                        <div className={styles.modalContent_footer_two_btn}>
                            
                            <button id={styles.done}  onClick={()=>handleCreateFolder(isFolder ? "folder" : "file")}>
                                Done
                            </button>
                            <p>|</p>
                            <button 
                            onClick={toggleFolderModal}
                              className={classNames(styles.cancle, {
                                [styles.light]: !isDarkTheme,
                                [styles.dark]: isDarkTheme,
                              })}
                           >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CreateFilesModal
