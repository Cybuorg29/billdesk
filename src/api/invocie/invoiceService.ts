import axios from "axios"


export const getInvoices=()=>{
     let id:any = sessionStorage.getItem('id')
       id = JSON.parse(id)
    return axios.get(`/api/invoice/getinvoice/${id}`)

}

export const getInvoiceClientData =(id:string)=>{
   console.log('id',id)
  return axios.get(`/api/user/getclientdata/${id}`)

}