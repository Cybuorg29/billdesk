
import axios from "axios";
import { registerArg } from "../../erp/Model/RegisterModel";

export const register = async(args:registerArg )=>{
     const {name,gstin,phone,email,building,landmark,district,pincode,state,activities,username,password,adress,inNo} = args
      console.log('asdas',name,gstin,phone,email,building,landmark,district,pincode,state,activities,username,password,adress,inNo)
         return axios.post(`/api/user/register`,{name,gstin,phone,email,building,landmark,district,pincode,state,activities,username,password,adress,inNo},{
        headers:{
            'Content-Type': 'application/json',
        }
        
    })
}


// // export const register = async(name,gstin,phone,email,building,landmark,district,pincode,state,activities,username,password,adress,inNo)=>{
// //     console.log(adress)
// //     return axios.post(`/api/user/register`,{name,gstin,phone,email,building,landmark,district,pincode,state,activities,username,password,adress,inNo},{
// //         headers:{
// //             'Content-Type': 'application/json',
// //         }
        
// //     })
// // }

export const aaa =()=>{
    console.log('asdas')
}