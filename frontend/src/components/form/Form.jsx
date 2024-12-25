import React, { useState } from "react";
import styles from "./Form.module.css";

const InputFields = ({
name,
type,
value,
label,
placeholder,
onChange,
icon,
vicon,
hicon
})=>{

  const [isPwdVisible,setIsPwdVisible] = useState(false);
  const handlePasswordVisible = ()=>{
    setIsPwdVisible(!isPwdVisible);
  }

  const inputType = type === "password" && isPwdVisible ? "text" : type;
  return (
    <div className = {styles.inputContainer}>
      <label htmlFor="name" className = {styles.inputlabel}>
        {label}
      </label>
      <input 
        className={styles.inputField}
        type = {inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{backgroundImage:`url(${icon})`}}
      />
      {
        type === "password" && (
          <img
          className={styles.iconToggle}
           src={isPwdVisible ? hicon : vicon} 
          onClick={handlePasswordVisible}
          />
        )
      }
    </div>
  )

}



function Form({
  formFields,
  error = {},
  errorMessage ={},
  isSignup,
  isLogin,
  handleSubmit
}) {
  return (
    <div className={styles.form}>
      {formFields.map((field, index) => (
        <React.Fragment key={index}>
          <InputFields
            name={field.name}
            key={index}
            type={field.type}
            label = {field.label}
            value={field.value}
            placeholder={field.placeholder}
            onChange={field.onChange}
            icon={field.icon}
            vicon={field?.vicon}
            hicon={field?.hicon}
          />
          {error?.[field.name] && (
            <p id={styles.error}>{errorMessage?.[field?.name].message}</p>
          )}
        </React.Fragment>
      ))}
      {error?.isPasswordMatch && (
        <p id={styles.error}>{errorMessage?.isPasswordMatch?.message}</p>
      )}
      <button onClick={handleSubmit}>
        {isSignup ? "Sign Up" : isLogin ? "Log In" :"Update"}
      </button>
    </div>
  );
}

export default Form;
