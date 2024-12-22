import React from "react";
import styles from "./Notfound.module.css";
import { useNavigate } from "react-router-dom";
function Notfound() {
  const navigate = useNavigate();
  return (
    <div className={styles.notfound}>
      <h2>404</h2>
      <h1>Page Not Found</h1>
      <p>Oops! It seems like the page you're looking for doesn't exist.</p>
      <button onClick={() => navigate("/")}>Go Back to Home</button>
    </div>
  );
}

export default Notfound;
