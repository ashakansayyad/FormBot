import axios from "axios";
import { addTokenToHeader } from "../utils/auth";

// create form

export const createForm = async (data) => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/form/create-form`,
    data,
    {
      headers,
    }
  );
  return res;
};

// get specefic form
export const getFormsData = async (id) => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/form/get-form/${id}`,
    {
      headers,
    }
  );
  return res;
};

// update form
export const updateForm = async (id, data) => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/form/update-form/${id}`,
    data,
    {
      headers,
    }
  );
  return res;
};

// generate form share link
export const generateShareLink = async(parentId) => {
  const headers = addTokenToHeader({ headers: {} });
  const res = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/formsahre/${parentId}`,
    {
      headers,
    }
  );
  return res;
};


// get shared form for public
export const getSharedForm =async(id)=>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/formsahre/form-view/${id}`);
    return res;
}