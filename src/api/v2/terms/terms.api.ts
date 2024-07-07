import axios from "axios";
import { baseUrl, v2Url } from "../../Url/ProdUrl";
import { toast } from "react-toastify";
import { ITERMS } from "../../../store/features/terms";

export function  getTermsApi(token:string){
    return  toast.promise(axios.get(`${v2Url}/api/user/terms/get/${token}`),{pending:'getting data'})
    //  return axios.get(')
}

export function createTermApi(terms:ITERMS,token:string){
    return  toast.promise(axios.post(`${v2Url}/api/user/terms/create`,{...terms,token}),{pending:'getting data'})
  
}