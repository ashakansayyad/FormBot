import React from 'react'
import formbot_icon from '../../assets/FormBot_icon.svg'
import link_icon from '../../assets/footer_link_icon.svg'
import styles from './Footer.module.css'
function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_formbot}>
        <div>
            <a href="#">
            <img src={formbot_icon} alt="icon" />
            <h3>FormBot</h3>
            </a>
        </div>
        <p>Made with ❤️ by <br />
        @cuvette</p>
      </div>
      <div className={styles.footer_product}>
            <p><b>Product</b></p>
            <span>
                <div>
                    <p>Status</p>
                    <img src={link_icon} alt="link" />
                </div>
                <div>
                    <p>Documentation</p>
                    <img src={link_icon} alt="link" />
                </div>
                <div>
                    <p>Roadmap</p>
                    <img src={link_icon} alt="link" />
                </div>
                <p>Pricing</p>
            </span>
      </div>
      <div className={styles.footer_community}>
            <p><b>Community</b></p>
            <span>
                <div>
                    <p>Discord</p>
                    <img src={link_icon} alt="link" />
                </div>
                <div>
                    <p>GitHub repository</p>
                    <img src={link_icon} alt="link" />
                </div>
                <div>
                    <p>Twitter</p>
                    <img src={link_icon} alt="link" />
                </div>
                <div>
                    <p>LinkedIn</p>
                    <img src={link_icon} alt="link" />
                </div>
                <div>
                    <p>OSS Friends</p>
                    <img src={link_icon} alt="link" />
                </div>
            </span>
      </div>
      <div className={styles.footer_company}>
            <p><b>Company</b></p>
            <div>
                <span>About</span>
                <span>Contact</span>
                <span>Terms of Service</span>
                <span>Privacy Policy</span>
            </div>
      </div>
    </div>
  )
}

export default Footer
