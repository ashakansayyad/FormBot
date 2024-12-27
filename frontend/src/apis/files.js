import axios from 'axios';
import { addTokenToHeader } from '../utils/auth';

//add files or folder
export const createFilesOrFolder =async(data)=>{
    const headers = addTokenToHeader({headers:{}});
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/files`,data,{
        headers
    })
    return res;
}

// get all files and folder
export const getAllFilesOrFolder = async(parentId = null)=>{
    const headers = addTokenToHeader({headers:{}});
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/files`,{
        headers,
        params: { parentId }, 
    });
    return res;
}

// delete file or folder
export const deleteFileOrFolder =async(id)=>{
    const headers = addTokenToHeader({headers:{}});
    const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/files/${id}`,{
        headers
    });
    return res;
}