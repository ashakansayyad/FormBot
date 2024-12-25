import React, { useState } from 'react';
import styles from './Navdashboard.module.css';
import {up_arrow,down_arrow} from '../../assets/assets';
function Navdashboard() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // document.body.className = isDarkTheme ? 'light-theme' : 'dark-theme'; 
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.navdashboard}>
      <div className={styles.navdashboard_toggleConatiner}>
        <div 
        onClick={toggleDropdown}
        className={styles.navdashboard_toggleConatiner_userInfo}>
            <p>Dewank Rastogi's workspace</p>
            <img src={down_arrow} alt="a" />
        </div>
        {
            isOpen && (
        <div className={styles.dropdownList}>
        <p>Settings</p>
        <p>Log Out</p>
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
      <button>Share</button>
    </div>
  );
}

export default Navdashboard;
