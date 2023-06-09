
import axios from "axios";
import { registerArg, addUserModelInterface } from "../../erp/Model/UserModel";
import { loginArg } from "../../erp/Model/UserModel";
import { toast } from "react-toastify";



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




export const addClient=(client:addUserModelInterface)=>{
   try{
      let token:any = sessionStorage.getItem('token')
       if(!token||token===undefined||token===null){
        toast.error('an error occured please refresh')
       }else{
         token = JSON.parse(token)
          toast.success('sending request')
         return axios.post('/api/user/addclient',{client,token})
        }
    }catch(err:any){
      toast.error(err.message)
    }
  
  
}

export const getUserData=(token:any)=>{
  return axios.get(`/api/user/getuser/${token}`)

}
export const getClients=()=>{
   try{
       let token:any = sessionStorage.getItem('token')
        if(!token){
          toast.error('an error occured')
        }else{
              token = JSON.parse(token)
          return axios.get(`/api/user/getclients/${token}`)
        }

   }catch(err:any){
    toast.error(err.message)
   }
}





