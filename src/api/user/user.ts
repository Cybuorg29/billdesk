
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




