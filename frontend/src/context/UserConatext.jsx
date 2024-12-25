import React,{useState,useEffect,createContext} from 'react';
import {decodeToken} from 'react-jwt';
import { getUserData } from '../apis/user';

export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [loggedUserData,setLoggedUserData]=useState(null);
    const [loggedUserId,setLoggedUserId]=useState("");
    const [isLoading,setIsLoading] = useState(false);

// get logged in user data
const fetchUserData = async()=>{
    try{
      const token = localStorage.getItem("token");
      if(!token){
        setIsLoading(false);
      }
      const decoded = decodeToken(token);
      if(!decoded){
        setIsLoading(false);
        return null;
      }else {
        const userId = decoded?.id;
        setLoggedUserId(userId);
        const res = await getUserData(userId);
        if(res && res.data){
            setLoggedUserData(res.data);
        }
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
    loggedUserId,
    setLoggedUserId,
    isLoading,
    setIsLoading
  }}
  
  >
    {children}
  </UserContext.Provider>
)


}