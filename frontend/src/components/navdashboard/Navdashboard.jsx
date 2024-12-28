import React, { useState, useContext } from 'react';
import styles from './Navdashboard.module.css';
import classNames from 'classnames'; 
import { SlArrowDown,SlArrowUp  } from "react-icons/sl";
import { up_arrow, down_arrow } from '../../assets/assets';
import { UserContext } from '../../context/UserConatext';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from '../../context/ModalContext';
import LogoutModal from '../logoutmodal/LogoutModal';
import ShareModal from '../sharemodal.jsx/ShareModal';
import { ThemeContext } from '../../context/ThemeContext';
function Navdashboard() {
  const { loggedUserName } = useContext(UserContext);
  const { logoutModal, toggleLogoutModal } = useContext(ModalContext);
  const { shareModal, toggleShareModal } = useContext(ModalContext);
  const {isDarkTheme,toggleTheme} = useContext(ThemeContext);

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={classNames(styles.navdashboard, {
        [styles.light]: !isDarkTheme,
        [styles.dark]: isDarkTheme,
      })}>
      <div 
      className={classNames(styles.navdashboard_toggleConatiner, {
        [styles.light]: !isDarkTheme,
        [styles.dark]: isDarkTheme,
      })}
     >
        <div
          onClick={toggleDropdown}
          className={styles.navdashboard_toggleConatiner_userInfo}>
          <p>{loggedUserName && loggedUserName}'s workspace</p>
          {
            !isDarkTheme ? isOpen ?<SlArrowUp />:<SlArrowDown />  :
            <img src={isOpen ? up_arrow : down_arrow} alt="a" />
          }
        </div>
        {
          isOpen && (
            <div
            className={classNames(styles.dropdownList, {
              [styles.light]: !isDarkTheme,
              [styles.dark]: isDarkTheme,
            })}
          >
              <span onClick={()=>b=navigate('/settings')} id={styles.settings}>Settings</span>
              <span onClick={toggleLogoutModal} id={styles.logout}>Log Out</span>
            </div>

          )
        }
      </div>
      <div className={styles.navdashboard_themeContainer}>
        <p>Light</p>
        <div className={styles.theme_toggle}>
          <input
            type="checkbox"
            id="themeCheckbox"
            onChange={toggleTheme}
            checked={isDarkTheme}
          />
          <label htmlFor="themeCheckbox" className={styles.toggle}></label>
        </div>
        <p>Dark</p>
      </div>
      <button onClick={toggleShareModal}>Share</button>
      {logoutModal && <LogoutModal/>}
      {shareModal && <ShareModal/>}
    </div>
  );
}

export default Navdashboard;
