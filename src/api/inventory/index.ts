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

export const delProduct=(token:string,_id:string)=>{
    return axios.get(`${baseUrl}/api/delete/product/${token}/${_id}`);

}

export const AddStockApi=(value:any,price:any,total:any,token:any,_id:any,date:any)=> axios.post(`${baseUrl}/api/add/stock`,{value,price,total,token,_id,date})