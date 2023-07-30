import axios from "axios"
import { baseUrl } from "../Url/ProdUrl"


export const getIncAndExpByMonth=(token:string,month:number)=>{
    return  axios.get(`${baseUrl}/api/get/${month}/${token}/incomeandexpence`)
}