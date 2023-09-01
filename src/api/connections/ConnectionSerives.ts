import axios from "axios"
import { baseUrl } from "../Url/ProdUrl"

export const postConnection=async(generalInfo:any,bankInfo:any,token:string)=>{
      generalInfo.Accountname = generalInfo?.name;
     delete generalInfo?.name;
      console.log(generalInfo,bankInfo)
    return axios.post(`${baseUrl}/api/create/connection`,{generalInfo,bankInfo,token});
}