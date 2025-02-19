import React, { useState } from 'react'
import styles from './FormBot.module.css';
import FormBotNavbar from '../../components/formbotnavbar/FormBotNavbar';
import FormBotFields from '../../components/formbotfields/FormBotFields';
import {
  text_babble,
  image_babble,
  video_babble,
  gif_babble,
  text_inputs,
  buttons_inputs,
  phone_inputs,
  email_inputs,
  ratings_inputs,
  date_inputs,
  number_inputs,
  formbot_start_icon
} from "../../assets/assets";

function FormBot() {
  const [babblesAndInputs, setBabblesAndInputs] = useState([]);
  const handleInputs = (type)=>{
    
    setBabblesAndInputs([...babblesAndInputs,type]);
  
    }

  return (
    <div className={styles.formbot}>
      <FormBotNavbar />
      <div className={styles.formbotMainContainer}>
        <div className={styles.formbotMainContainer_left}>
          <div className={styles.formbotMainContainer_left_babblesContainer}>
            <h3>Bubbles</h3>
            <div>
              <button onClick={()=>handleInputs("babbleText")}><img src={text_babble} />Text</button>
              <button onClick={()=>handleInputs("babbleImage")}><img src={image_babble} />Image</button>
              <button onClick={()=>handleInputs("babbleVideo")}><img src={video_babble} />Video</button>
              <button onClick={()=>handleInputs("babbleGif")}><img src={gif_babble} />GIF</button>
            </div>
          </div>
          <div className={styles.formbotMainContainer_left_inputsContainer}>
            <h3>Inputs</h3>
            <div>
              <button onClick={()=>handleInputs("InputText")}><img src={text_inputs} />Text</button>
              <button onClick={()=>handleInputs("InputNumber")}><img src={number_inputs} />Number</button>
              <button onClick={()=>handleInputs("InputEmail")}><img src={email_inputs} />Email</button>
              <button onClick={()=>handleInputs("InputPhone")}><img src={phone_inputs} />Phone</button>
              <button onClick={()=>handleInputs("InputDate")}><img src={date_inputs} />Date</button>
              <button onClick={()=>handleInputs("InputRating")}><img src={ratings_inputs} />Rating</button>
              <button onClick={()=>handleInputs("InputButtons")}><img src={buttons_inputs} />Buttons</button>
            </div>

          </div>
        </div>
        <div className={styles.formbotMainContainer_right}>
          <span>
            <img src={formbot_start_icon} />
            Start
          </span>
          <FormBotFields 
          babblesAndInputs={babblesAndInputs}
          />
        </div>

      </div>
    </div>
  )
}

export default FormBot
