import React, { useContext, useState } from 'react'
import styles from './ShareModal.module.css';
import { TiArrowSortedDown } from "react-icons/ti";
import { close_icon } from '../../assets/assets';
import classNames from 'classnames';
import { ThemeContext } from '../../context/ThemeContext';
import { ModalContext } from '../../context/ModalContext';
import { shareByEmail,shareByLink } from '../../apis/files';
import { toast } from "react-toastify";

function ShareModal() {
  const { shareModal, toggleShareModal } = useContext(ModalContext);
  const [togglePermission, setTogglePermission] = useState(false);
  const { isDarkTheme } = useContext(ThemeContext);
  const [permission, setPermission] = useState("view");
  const [email,setEmail] = useState("");
  const [link,setLink] = useState("");

  const handleTogglePermission = () => {
    setTogglePermission(!togglePermission);
  }

  
  const handlePermissionChange = (permission) => {
    setPermission(permission);
    handleTogglePermission();
  }

  const handleShareByEmail = async()=>{
    try{
      const res = await shareByEmail({email,permission});
      if(res && res.status === 200){
        toast.success(res.data.message);
      }
    }catch(err){
      console.error("Error sharing by email:", err);
    }
  }

  const handleShareByLink = async()=>{
    try{
      const res = await shareByLink({isPublic : true});
      setLink(res.data);
      nevigator.clipboard.w
    }catch(err){

    }
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
