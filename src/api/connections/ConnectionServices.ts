import axios from "axios"
import { baseUrl } from "../Url/ProdUrl"
import { toast } from "react-toastify";

export const postConnection=async(generalInfo:any,bankInfo:any,token:string)=>{
      bankInfo.Accountname = bankInfo?.name;
     delete bankInfo?.name;
      console.log(generalInfo,bankInfo)
    return axios.post(`${baseUrl}/api/user/create/connection`,{generalInfo,bankInfo,token});
}

export async function getConnectionsData(token:string) {
      return await axios.get(`${baseUrl}/api/user/get/connectiondata/${token}`)
  
}

export async function deleteConnectionApi(token:string,id:string,role:number) {
    return await axios.get(`${baseUrl}/api/user/delete/connection/${token}/${id}/${role}`);
}

