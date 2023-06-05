
import axios from "axios";
import { registerArg } from "../../erp/Model/UserModel";
import { loginArg } from "../../erp/Model/UserModel";



export const register = async(args:registerArg )=>{
     const {name,gstin,phone,email,building,landmark,district,pincode,state,activities,username,password,adress,inNo} = args
      console.log('asdas',name,gstin,phone,email,building,landmark,district,pincode,state,activities,username,password,adress,inNo)
         return axios.post(`/api/user/register`,{name,gstin,phone,email,building,landmark,district,pincode,state,activities,username,password,adress,inNo},{
        headers:{
            'Content-Type': 'application/json',
        }
        
    })
}


export const  reqLogin=(args:loginArg)=>{
     const {username,password} = args;
    return axios.post(`/api/user/login`,{username,password})
}


export const verify=(token:string)=>{
  return axios.get(`/api/user/verify/${token}`)   
    

}

export const getUserName=()=>{
      let token:any = sessionStorage.getItem('token')
       token = JSON.parse(token);
     return axios.get(`/api/user/getname/${token}`)
}




