import React, { useContext, useState, useEffect } from "react";
import styles from "./DeleteFileModal.module.css";
import { ModalContext } from "../../context/ModalContext";
import classNames from 'classnames';
import { ThemeContext } from '../../context/ThemeContext';
import { deleteFileOrFolder } from "../../apis/files";
import { toast } from "react-toastify";
function DeleteFilesModal({
  creationType,
  selectedFileId,
  fetchFilesOrFolders,
  selectedFolderId,
}) {
  const { deleteModal, toggleDeleteModal } = useContext(ModalContext);
  const [isFolder, setIsFolder] = useState(false);
  const { isDarkTheme } = useContext(ThemeContext);
  const handleDelete = async () => {
    try {
      const res = await deleteFileOrFolder(selectedFileId);
      if (res) {
        toast.success(res.data.message);

        fetchFilesOrFolders(selectedFolderId); // Refresh files after deletion
        toggleDeleteModal();
      }
    } catch (err) {
      console.error("Error deleting file/folder:", err);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    setIsFolder(creationType === "folder");
  }, [creationType]);

  return (
    <>
      {deleteModal && (
        <div className={styles.container}>
          <div className={styles.overlay} onClick={toggleDeleteModal}></div>
          <div
            className={classNames(styles.modalContent, {
              [styles.light]: !isDarkTheme,
              [styles.dark]: isDarkTheme,
            })}
          >
            <p>
              Are you sure you want to delete this{" "}
              {isFolder ? "Folder" : "File"} ?
            </p>

            <div className={styles.modalContent_footer_two_btn}>
              <button id={styles.done} onClick={handleDelete}>
                Confirm
              </button>
              <p>|</p>
              <button
                onClick={toggleDeleteModal}
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
  );
}

export default DeleteFilesModal;
