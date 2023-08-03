import axios from "axios"
import { baseUrl } from "../Url/ProdUrl"

export const getProducts=()=>{
    return axios.get(`${baseUrl}/api/get/products`)
}