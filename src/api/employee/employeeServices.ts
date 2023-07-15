import axios from "axios"
import { baseUrl } from "../Url/ProdUrl"


export const getEmployees=(token:string)=>{
    return axios.get(`${baseUrl}/api/get/employee/${token}`)
}

export const postEmployee=(data:any,token:string)=>{
        console.log(data.image)
      const image:any = data?.image;
       delete data.image;
    return axios.post(`${baseUrl}/api/create/employee`,{data,token,image},
    {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    });
     
}   