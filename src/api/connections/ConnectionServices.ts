import axios from "axios"
import { baseUrl, v2Url } from "../Url/ProdUrl"
import { toast } from "react-toastify";

export const postConnection=async(generalInfo:any,bankInfo:any,token:string)=>{
      bankInfo.Accountname = bankInfo?.name;
     delete bankInfo?.name;
      console.log(generalInfo,bankInfo)
    return axios.post(`${baseUrl}/api/user/create/connection`,{generalInfo,bankInfo,token});
}

export async function getConnectionsData(id:string) {
      return await axios.get(`${v2Url}/api/user/get/connectiondata/${id}`);
  
}

export async function deleteConnectionApi(token:string,id:string,role:number) {
    return await axios.get(`${v2Url}/api/user/delete/connection/${token}/${id}/${role}`);
}



export async function CreateRequest(_id:string,id:string,type:Number) {
    return axios.post(`${v2Url}/api/user/create/connection/request`,{_id,id,type});
    
}