import axios from "axios"
import { baseUrl } from "./userServices"
 

export const  getIncomeFromToken=(token:string)=>{
    return axios.get(`${baseUrl}/api/getincome/${token}`)

}