import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { signup } from '../../apis/user';
import styles from './Signup.module.css';
import Form from '../../components/form/Form';
import {back_arrow,
  triangle_img,
  orange_circle_img,
  yellow_circle_img,
  userIcon,
  emailIcon,
  pwdIcon,
  pwdViewIcon,
  pwdHideIcon,
  google_icon} from '../../assets/assets';
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:"",
    cpassword:"",
  })

  const [error,setError] = useState({
    name:false,
    email:false,
    password:false,
    cpassword:false,
    isPasswordMatch:false,

  })


    // fields with validation
const formFields = [
    {
      name:"name",
      type:"text",
      label:"Username",
      icon:userIcon,
      placeholder:"Enter a username",
      value:formData.name,
      onChange:(e)=>{
        setFormData({...formData,name:e.target.value});
        setError({...error,name:false})
      }
    },
    {
      name:"email",
      type:"email",
      label:"Email",
      icon: emailIcon,
      placeholder:"Enter your email",
      value:formData.email,
      onChange:(e)=>{
        setFormData({...formData,email:e.target.value});
        setError({...error,email:false})
      }
    },
    {
      name:"password",
      type:"password",
      label:"Password",
      icon: pwdIcon,
      vicon: pwdViewIcon,
      hicon: pwdHideIcon,
      placeholder:"Enter Password",
      value:formData.password,
      onChange:(e)=>{
        setFormData({...formData,password:e.target.value});
        setError({...error,password:false,isPasswordMatch:false})
      }
    },
    {
      name:"cpassword",
      type:"password",
      label:"Confirm Password",
      icon: pwdIcon,
      vicon: pwdViewIcon,
      hicon: pwdHideIcon,
      placeholder:"Confirm Password",
      value:formData.cpassword,
      onChange:(e)=>{
        setFormData({...formData,cpassword:e.target.value});
        setError({...error,cpassword:false,isPasswordMatch:false})
      }
    }
  ]
  const errorMessage = {
    name :{message:"Name is required!"},
    email :{message:"Email is required!"},
    password :{message:"Password is required!"},
    cpassword :{message:"Confirm Password is required!"},
    isPasswordMatch :{ message:"enter same password in both fields!"},
  }

  // password validation regex
  const passwordPattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  // email validation regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //name validation 
  const namePattern = /^[a-zA-Z\s]*$/;

  const handleSignupSubmit =async(e)=>{
    e.preventDefault();
    let isError = false;

    if(!formData.name){
      setError((prev)=>({...prev,name:true}));
      isError = true;
    }else if(!namePattern.test(formData.name)){
      toast.error("Name can only contain alphabets.");
      isError = true;
    }

    if(!formData.email){
      setError((prev)=>({...prev,email:true}));
      isError =true;
    }else if(!emailPattern.test(formData.email)){
      toast.error("Please enter a valid email address");
      isError = true;
    }

    if(!formData.password){
      setError((prev)=>({...prev,password:true}));
      isError = true;
    }else if(!passwordPattern.test(formData.password)){
      toast.error( "Password must be at least 8 characters long, contain an uppercase letter, lowercase letter, symbol, and a number.");
      isError = true;
    }

    if(!formData.cpassword){
      setError((prev)=>({...prev,cpassword:true}));
      isError = true;
    }else if(formData.password !== formData.cpassword){
      setError((prev)=>({...prev,isPasswordMatch:true}));
      isError = true;
    }

    if(!isError){
      try{
        const {name,email,password} = formData;
        const userData = {name,email,password};

        const res = await signup(userData);
        if(res.status === 201){
          toast.success("User register successfully!");
          navigate('/login');
        }
      }catch(err){
        if(err.response && err.response.status === 400){
          toast.error(err.response.data.message);
        }else{
          console.error(err.response);
        }
      }
    }



  }


  return (
    <div className={styles.signup}>
      <div className={styles.signup_header}>
        <img onClick={()=>navigate(-1)} src={back_arrow} alt="icon" />
      </div>
      <div className={styles.signup_main}>
          <div className={styles.signup_main_left}>
            <img src={triangle_img} alt="icon" />
          </div>
          <div className={styles.signup_main_center}>
            <Form 
            formFields = {formFields}
            error = {error}
            errorMessage = {errorMessage}
            handleSubmit = {handleSignupSubmit}
            isSignup={true}
            />
            <div className={styles.signup_main_center_bootomContainer}>
              <p>OR</p>
              <button><span><img src={google_icon} alt="icon" /></span>Sign Up with Google</button>
              <p className={styles.alreadyAccount}>Already have an account ? <p id={styles.login_btn} onClick={()=>navigate('/login')}>Login</p></p>
            </div>
          </div>
          <div className={styles.signup_main_right}>
              <img src={orange_circle_img} alt="icon" />
          </div>
      </div>
      <div className={styles.signup_footer}>
          <img src={yellow_circle_img} alt="icon" />
      </div>
    </div>
  )
}

export default Signup
