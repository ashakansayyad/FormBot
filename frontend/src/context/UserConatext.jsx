import React,{useState,useEffect,createContext} from 'react';
import { decodeToken  } from "react-jwt";
import { getUserData } from '../apis/user';

export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [loggedUserData,setLoggedUserData]=useState("");
    const [loggedUserId,setLoggedUserId]=useState("");
    const [isLoading,setIsLoading] = useState(false);
    const [loggedUserName,setLoggedUserName] = useState("");

    

// get logged in user data
const fetchUserData = async()=>{
    try{
      const token = localStorage.getItem("token");
      if(!token)return setIsLoading(false);

      const decoded =await decodeToken (token);
      if(!decoded) return setIsLoading(false);

      const userId = decoded?.id;
      
      
      setLoggedUserId(userId);

      const res = await getUserData(userId);
      if(res?.data){
        setLoggedUserData(res.data);
        setLoggedUserName(res.data.name);
      }
  
    }catch(err){
        console.error(err);
    } finally {
        setIsLoading(false);
    }
}

useEffect(()=>{
    fetchUserData();
   
},[]);


return (
  <UserContext.Provider
  
  value={{
    loggedUserData,
    setLoggedUserData,
    setLoggedUserId,
    setIsLoading,
    loggedUserId,
    isLoading,
    loggedUserName
  }}
  
  >
    {children}
  </UserContext.Provider>
)


}