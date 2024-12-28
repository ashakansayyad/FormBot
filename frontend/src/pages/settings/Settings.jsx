import React,{useState,useEffect,useContext} from 'react'
import style from './Settings.module.css';
import Form from '../../components/form/Form';
import { getUserData, updateUser } from '../../apis/user';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserConatext';
import { ModalContext } from '../../context/ModalContext';
import LogoutModal from '../../components/logoutmodal/LogoutModal';
import {toast} from 'react-toastify';
import {
  userIcon,
  logout_icon,
  emailIcon,
  pwdIcon,
  pwdViewIcon,
  pwdHideIcon,
} from '../../assets/assets';

function Settings() {
  const {loggedUserId,setLoggedUserData} = useContext(UserContext);
  const { logoutModal, toggleLogoutModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [formData,setFormData]= useState({
    name:"",
    email:"",
    oldPassword:"",
    newPassword:"",
  })

  const formFields = [
      {
        name:"name",
        type:"text",
        icon:userIcon,
        placeholder:"Name",
        value:formData.name,
        onChange:(e)=>{
          setFormData({...formData,name:e.target.value});
    
        }
      },
      {
        name:"email",
        type:"email",
        icon: emailIcon,
        placeholder:"Update Email",
        value:formData.email,
        onChange:(e)=>{
          setFormData({...formData,email:e.target.value});
        }
      },
      {
        name:"oldPassword",
        type:"password",
        icon: pwdIcon,
        vicon: pwdViewIcon,
        hicon: pwdHideIcon,
        placeholder:"Old Password",
        value:formData.oldPassword,
        onChange:(e)=>{
          setFormData({...formData,oldPassword:e.target.value});
          
        }
      },
      {
        name:"newPassword",
        type:"password",
        icon: pwdIcon,
        vicon: pwdViewIcon,
        hicon: pwdHideIcon,
        placeholder:"New Password",
        value:formData.newPassword,
        onChange:(e)=>{
          setFormData({...formData,newPassword:e.target.value});
        
      }
    }
    ]

  const isValidEmail = (email)=>{
    const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const isValidPassword =(pwd)=>{
    const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(pwd);
  }

  const isValidName = (name)=>{
    const nameRegex = /^[a-zA-Z\s]*$/;
    return nameRegex.test(name);
  }


  const fetchUserData = async()=>{
    try{
      const res = await getUserData(loggedUserId);
      if(res && res.data){
        setFormData({
          name:res.data.name || "",
          email:res.data.email || "",
        })
      }
    }catch(err){
        console.error("Error occured while fetching user data: ",err);
    }
  }




  const handleUpdateSubmit = async(e)=>{
    e.preventDefault();


    // if all fields are empty
    if(!formData.name &&
        !formData.email && 
        !formData.oldPassword &&
        !formData.newPassword
    ){
      toast.error("At least one field is required to update");
      return ;
    }

    //check email validation
    if(formData.email && !isValidEmail(formData.email)){
      toast.error("Please Enter a valid email address");
      return;
    }
    //check name validation
    if(formData.name && !isValidName(formData.name)){
      toast.error("Name can only contain alphabets.");
      return;
    }
    //check new password validation
    if(formData.newPassword && !isValidPassword(formData.newPassword)){
      toast.error("Password must be at least 8 characters long, contain an uppercase letter, lowercase letter, symbol, and a number.");
      return;
    }

    // check which fields are filled in
    const {name,email,oldPassword,newPassword} = formData;
    const fieldsToUpdate = { name, email, oldPassword, newPassword };

  
  
    if((oldPassword && !newPassword) || (!oldPassword && newPassword)){
      toast.error("Both old and new passwords are required to change the password.")
      return;
    }

    try{
      const res = await updateUser(loggedUserId,fieldsToUpdate);
      if(res && res.status === 200){
        toast.success("Your information is updated successfully! ");
      }

      // redirect to login page when email or password is changed
      if(email || newPassword){
        localStorage.removeItem("token");
        setLoggedUserData(null);
        toast.info("Please log in again due to email/password change.");
        navigate('/login');
      }


    } catch (err) {
      console.error("err.response: ",err.response);
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message || err.response.data);
      } else {
        console.error("err.response: ",err.response);
      }
    }

  }
  useEffect(()=>{
    fetchUserData();
  },[]);

  return (
    <div className={style.settings}>
      <header>
            <h2>Settings</h2>
      </header>
      <main>
        <Form 
          formFields={formFields}
          handleSubmit={handleUpdateSubmit}
        />
      </main>
      <footer>
        <div>
            <img src={logout_icon} alt="icon" />
            <button onClick={toggleLogoutModal}>Log out</button>
        </div>
      </footer>
      {logoutModal && <LogoutModal/>}
    </div>
  )
}

export default Settings
