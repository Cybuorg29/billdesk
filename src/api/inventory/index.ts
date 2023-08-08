import axios from "axios"
import { baseUrl } from "../Url/ProdUrl"
import { createProductObj } from "../../models/inventory/productModel"

export const getProductsByToken=(token:any)=>{
    return axios.get(`${baseUrl}/api/get/products/${token}`)
}

export const  pushProduct=(token:string,product:createProductObj)=>{
    const image = product.image
    delete product.image;
    return axios.post(`${baseUrl}/api/create/product`,{token,product,image},{
        headers:{
            "Content-Type":'multipart/form-data'
        }
    })
}