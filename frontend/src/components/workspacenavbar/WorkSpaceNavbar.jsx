import React from "react";
import styles from "./WorkSpaceNavbar.module.css";
import { useNavigate,useParams } from "react-router-dom";
import { generateShareLink } from "../../apis/form";
import { toast } from "react-toastify";


function WorkSpaceNavbar({ title, setTitle,handleSaveForm }) {
  const {parentFileId} = useParams();

  
  const navigate = useNavigate();
  const handleSaceClick = ()=>{
    handleSaveForm();
  };
  
  const handleShareForm=async()=>{
    try{
      const res = await generateShareLink(parentFileId);
      if(res && res.status === 200){
        toast.success("Link copied");
      }
    }catch(err){
      console.error("Error on generating shared form link: ",err);
    }
  }



  return (
    <div className={styles.formbotnavbar}>
      <input
        type="text"
        className={styles.formNameInput}
        placeholder="Enter Form Name"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
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
        <button 
        onClick={handleShareForm}
        id={styles.shareBtn}>Share</button>
        <button
          onClick={handleSaceClick}
          id={styles.saveBtn}>Save</button>
        <button
        onClick={()=>navigate('/dashboard')}
        id={styles.cancleBtn}
        >
        X</button>
      </div>
    </div>
  );
}

export default WorkSpaceNavbar;
