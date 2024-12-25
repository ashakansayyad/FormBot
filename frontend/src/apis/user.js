import axios from "axios";
import { addTokenToHeader } from "../utils/auth";

// signup user api
export const signup = async(data)=>{
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/signup`,data,{
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
        },
    });

    return res;
}


// login user api
export const login = async(data)=>{
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/login`,data,{
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
        },
    });
    return res;
}

// update user information
export const updateUser = async(id,data)=>{
const headers = addTokenToHeader({headers:{}});
const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/user/${id}`,data,{headers}
);
return res;
}

// get logged user data
export const getUserData=async(id)=>{
    const headers = addTokenToHeader({headers:{}})
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/${id}`,{
        headers
    });
    return res;
}