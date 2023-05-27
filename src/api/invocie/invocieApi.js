
import axios from "axios";
  const baseURL = `http://localhost:5000`

  axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    },
  });
export const getTerm=(id,cid)=>{
    console.log('id',id,'cid',cid)
    return  axios.get(`${baseURL}/api/invoice/getterm/${id}/${cid}`)
}

export const pushInvoice=(invoice)=>{
   let id = sessionStorage.getItem('id')
    id = JSON.parse(id)

  return axios.post(`/api/invoice/addinvoice/${id}`,{invoice})  
}


export const getInvoice=()=>{
   const id  = JSON.parse(sessionStorage.getItem('id'))
   console.log(id)
  return axios.get(`/api/invoice/getinvoice/${id}`)

}