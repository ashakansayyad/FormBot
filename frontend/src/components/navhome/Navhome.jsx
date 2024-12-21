import React from 'react'
import styles from './Navhome.module.css';
import formbot_icon from '../../assets/FormBot_icon.svg';
function Navhome() {
  return (
    <div className={styles.navhome}>
      <div className={styles.navhome_left}>
        <img src={formbot_icon} alt="icon" />
        <h3>FormBot</h3>
      </div>
      <div className={styles.navhome_right}>
        <button id={styles.signinBtn}>Sign in</button>
        <button id={styles.formbotBtn}>Create a FormBot</button>
      </div>
    </div>
  )
}

export default Navhome
