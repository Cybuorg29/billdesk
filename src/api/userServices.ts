import { registerArgs } from './../models/registerModels';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAppSelector } from '../store/app/hooks';
import { userDetailSchema } from '../models/userModel';
import { bankInterface } from '../store/features/bank/bankSlice';
// export const geti=async()=>{
//     try{
//         const result =  await axios.get(`${baseUrl}/api/user/register`)
//          if(result.status === 200){
//             toast.success('sucess')
//             // return result.data
//          }
//           toast.error('an error occured')
//     }catch(err:any){
//         toast.error(err.message)
//     }
// }
//  const baseUrl = 'https://billdesk-backend.vercel.app'
 export  const baseUrl = `http://localhost:5000`


export const signup=(user:registerArgs)=>{
   return axios.post(`${baseUrl}/api/user/signup`,{user})
}

export const login=(username:string,password:string)=>{
    return axios.post(`${baseUrl}/api/user/login`,{username,password})
}

export const getUserData=(token:any)=>{
    return axios.get(`${baseUrl}/api/user/getdata/${token}`)
}

export const setUpProfile=(client:userDetailSchema,bank:bankInterface,token:any)=>{
    console.log(client)
     let  bankDetail = {Accountname:'',no:'',isfc:'',bankName:'',branch:''}
       bankDetail.Accountname = bank.name;
       bankDetail.bankName = bank.bank;
       bankDetail.branch = bank.branch;
       bankDetail.isfc = bank.isfc;
       bankDetail.no = bank.no
       const file = client.image
       const user:any = client;
        delete user.image
       console.log(file)
    return axios.post(`${baseUrl}/api/profile/setup`,{bankDetail,token,file,user},{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })

}

export const  updateProfileImage=(image:any,token:any)=>{
    return axios.post(`${baseUrl}/api/profile/update/photo`,{image,token},{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    
}