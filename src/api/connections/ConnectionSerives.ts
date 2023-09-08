import axios from "axios"
import { baseUrl } from "../Url/ProdUrl"

export const postConnection=async(generalInfo:any,bankInfo:any,token:string)=>{
      generalInfo.Accountname = generalInfo?.name;
     delete generalInfo?.name;
      console.log(generalInfo,bankInfo)
    return axios.post(`${baseUrl}/api/user/create/connection`,{generalInfo,bankInfo,token});
}

export async function getConnectionsData(token:string) {
      return await axios.get(`${baseUrl}/api/user/get/connectiondata/${token}`)
  
}