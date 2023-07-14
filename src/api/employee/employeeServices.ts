import axios from "axios"
import { baseUrl } from "../Url/ProdUrl"


export const getEmployees=(token:string)=>{
    return axios.get(`${baseUrl}/api/get/employee/${token}`)
}