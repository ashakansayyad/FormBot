import React from 'react'
import Navhome from '../../components/navhome/Navhome';
import Footer from '../../components/footer/Footer';
import styles from './Home.module.css';
import triangle_icon from '../../assets/home_triangle_img.svg'
import half_circle_icon from '../../assets/home_half_circle_img.svg';
import main_img from '../../assets/home_main_img.png';
function Home() {
  return (
    <div className={styles.home}>
      <Navhome/>
      <div className={styles.home_header}>
        <img src={triangle_icon} alt="icon" />
        <div className={styles.home_header_midContainer}>
          <h1>Build advanced chatbots
          <br /> visually</h1>
          <span>Typebot gives you powerful blocks to create unique chat experiences. Embed them <br />
          anywhere on your web/mobile apps and start collecting results like magic.</span>
          <button>Create a FormBot  for free</button>
        </div>
        <img src={half_circle_icon} alt="icon" />
      </div>
      <div className={styles.home_main}>
          <img src={main_img} alt="img" />
      </div>
      <Footer/>
    </div>
  )
}

export default Home
