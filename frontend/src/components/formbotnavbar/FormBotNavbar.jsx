import React from "react";
import styles from "./FormBotNavbar.module.css";

function FormBotNavbar() {
  return (
    <div className={styles.formbotnavbar}>
      <input
        type="text"
        className={styles.formNameInput}
        placeholder="Enter Form Name"
      />
      <div className={styles.flowResponseContainer}>
        <button id={styles.flowBtn}>Flow</button>
        <button id={styles.responseBtn}>Response</button>
      </div>
      <div className={styles.navdashboard_themeContainer}>
        <p>Light</p>
        <div className={styles.theme_toggle}>
          <input
            type="checkbox"
            id="themeCheckbox"
            // onChange={toggleTheme}
            // checked={isDarkTheme}
          />
          <label htmlFor="themeCheckbox" className={styles.toggle}></label>
        </div>
        <p>Dark</p>
      </div>
      <div className={styles.threeButtonsContainer}>
        <button id={styles.shareBtn}>Share</button>
        <button id={styles.saveBtn}>Save</button>
        <button id={styles.cancleBtn}>X</button>
      </div>
    </div>
  );
}

export default FormBotNavbar;
