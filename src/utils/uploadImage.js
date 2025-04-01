import { API_PATH } from "./apipath";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formdate=new FormData();
    // append image file to form data
    formdate.append("image",imageFile);

    try{
        const response = await axiosInstance.post(API_PATH.IMAGE.UPLOAD_IMAGE,formdate,{
            headers:{
                "Content-Type":"multipart/form-data", // sethe content type to multipart/form-data
            },
        });
        return response.data; // return  response data
    }catch(err){   
        console.error("Error uploading image:",err);
        throw err; // rethrow the error for handling in the calling function
    }
}

export default uploadImage;