import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/user";
import styles from "./Login.module.css";
import Form from "../../components/form/Form";
import { toast } from "react-toastify";
import {back_arrow,
  triangle_img,
  orange_circle_img,
  yellow_circle_img,
  emailIcon,
  pwdIcon,
  pwdViewIcon,
  pwdHideIcon,
  google_icon} from '../../assets/assets';

function Login() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  // fields with validation
  const formFields = [
    {
      name: "email",
      type: "email",
      label: "Email",
      icon: emailIcon,
      placeholder: "Enter your email",
      value: formData.email,
      onChange: (e) => {
        setFormData({ ...formData, email: e.target.value });
        setError({ ...error, email: false });
      },
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      icon: pwdIcon,
      vicon: pwdViewIcon,
      hicon: pwdHideIcon,
      placeholder: "Enter Password",
      value: formData.password,
      onChange: (e) => {
        setFormData({ ...formData, password: e.target.value });
        setError({ ...error, password: false });
      },
    },
  ];

    // Error message handling
  const errorMessage = {
    email: { message: "Email is required!" },
    password: { message: "Password is required!" },
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let isError = false;

    if (!formData.email) {
      setError((prev) => ({ ...prev, email: true }));
      isError = true;
    } 

    if (!formData.password) {
      setError((prev) => ({ ...prev, password: true }));
      isError = true;
    } 

    if (!isError) {
      try {
        const res = await login(formData);
        if (res.status === 200) {
          toast.success("Logged in Successfully!");
          const token = res.data.token;
          localStorage.setItem("token",token);
          navigate("/");
        }
      } catch (err) {
        if (err.response.status === 400) {
          toast.error(err.response.data.message);
        }
      }
    }
  };

  useEffect(()=>{
    if(token){
      navigate('/settings');
    }
  },[])

  return (
    <div className={styles.login}>
      <div className={styles.login_header}>
        <img onClick={() => navigate(-1)} src={back_arrow} alt="icon" />
      </div>
      <div className={styles.login_main}>
        <div className={styles.login_main_left}>
          <img src={triangle_img} alt="icon" />
        </div>
        <div className={styles.login_main_center}>
          <Form
            formFields={formFields}
            error={error}
            errorMessage={errorMessage}
            handleSubmit={handleLoginSubmit}
            isLogin={true}
          />
          <div className={styles.login_main_center_bootomContainer}>
            <p>OR</p>
            <button>
              <span>
                <img src={google_icon} alt="icon" />
              </span>
              Sign Up with Google
            </button>
            <p className={styles.alreadyAccount}>
              Don’t have an account?{" "}
              <p id={styles.login_btn} onClick={() => navigate("/signup")}>
                {" "}
                Register now
              </p>
            </p>
          </div>
        </div>
        <div className={styles.login_main_right}>
          <img src={orange_circle_img} alt="icon" />
        </div>
      </div>
      <div className={styles.login_footer}>
        <img src={yellow_circle_img} alt="icon" />
      </div>
    </div>
  );
}

export default Login;
