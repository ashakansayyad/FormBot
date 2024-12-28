import React, { useContext, useState, useEffect } from 'react'
import styles from './ShareModal.module.css';
import { TiArrowSortedDown } from "react-icons/ti";
import { close_icon } from '../../assets/assets';
import classNames from 'classnames';
import { ThemeContext } from '../../context/ThemeContext';
import { ModalContext } from '../../context/ModalContext';
function ShareModal() {
  const { shareModal, toggleShareModal } = useContext(ModalContext);
  const [togglePermission, setTogglePermission] = useState(false);
  const { isDarkTheme } = useContext(ThemeContext);
  const [permission, setPermission] = useState("view");


  const handleTogglePermission = () => {
    setTogglePermission(!togglePermission);
  }

  
  const handlePermissionChange = (permission) => {
    setPermission(permission);
    handleTogglePermission();
  }

  return (
    <>
      {shareModal && (
        <div className={styles.container}>
          <div className={styles.overlay} onClick={toggleShareModal}></div>
          <div
            className={classNames(styles.modalContent, {
              [styles.light]: !isDarkTheme,
              [styles.dark]: isDarkTheme,
            })}
          >

            <img onClick={toggleShareModal} src={close_icon} alt="icon" />

            <div className={styles.modalContent_emailTitleContainer}>
              <h2>Invite by Email</h2>

              <div className={styles.modalContent_optionsContainer}>
                <span onClick={handleTogglePermission} id={styles.title}>
                  {permission} <TiArrowSortedDown />
                </span>
                <div
                  style={{ display: togglePermission ? "block" : "none" }}
                  className={styles.modalContent_optionsContainer_options}
                >
                  <p onClick={() => handlePermissionChange("Edit")}>Edit</p>
                  <p onClick={() => handlePermissionChange("View")}>View</p>

                </div>
              </div>
            </div>
            <input type="email"
            placeholder='Enter email id'
            />
            <button className={styles.inviteByEmail}>Send Invite</button>
            <h2>Invite by link</h2>
            <button className={styles.inviteByLink}>Copy link</button>
          </div>
        </div>
      )}
    </>
  )
}

export default ShareModal
