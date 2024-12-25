import React from 'react'
import styles from './Dashboard.module.css';
import Navdashboard from '../../components/navdashboard/Navdashboard';

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <Navdashboard/>
      
    </div>
  )
}

export default Dashboard
