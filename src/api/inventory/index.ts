import axios from "axios"
import { baseUrl } from "../Url/ProdUrl"

export const getProductsByToken=(token:any)=>{
    return axios.get(`${baseUrl}/api/get/products/${token}`)
}