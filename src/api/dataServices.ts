import axios from "axios"
import { baseUrl } from "./Url/ProdUrl"
 

export const  getIncomeByToken=(token:string)=>{
    return axios.get(`${baseUrl}/api/income/getall/${token}`)

}

export const getExpencesbyToken=(token:string)=>{
    return axios.get(`${baseUrl}/api/expence/getall/${token}`)
}

export const addExpences=(data:any)=>{
     
    return axios.post(`${baseUrl}/api/create/expence`,{data})
}