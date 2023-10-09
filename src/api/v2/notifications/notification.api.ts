import axios from "axios"
import { v2Url } from "../../Url/ProdUrl"

export const getUpdates=(id:string)=>{
    return axios.get(`${v2Url}/api/user/get/update/${id}`)
}