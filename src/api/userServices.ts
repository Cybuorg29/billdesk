import { registerArgs } from './../models/registerModels';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAppSelector } from '../store/app/hooks';
import { userDetailSchema } from '../models/userModel';
import { bankInterface } from '../store/features/bank/bankSlice';
// export const geti=async()=>{
//     try{
//         const result =  await axios.get(`/api/user/register`)
//          if(result.status === 200){
//             toast.success('sucess')
//             // return result.data
//          }
//           toast.error('an error occured')
//     }catch(err:any){
//         toast.error(err.message)
//     }
// }


export const signup=(user:registerArgs)=>{
   return axios.post(`/api/user/signup`,{user})
}

export const login=(username:string,password:string)=>{
    return axios.post(`/api/user/login`,{username,password})
}

export const getUserData=(token:any)=>{
    return axios.get(`/api/user/getdata/${token}`)

}

export const setUpProfile=(client:userDetailSchema,bank:bankInterface,token:any)=>{
     let  bankDetail = {Accountname:'',no:'',isfc:'',bankName:'',branch:''}
       bankDetail.Accountname = bank.name;
       bankDetail.bankName = bank.bank;
       bankDetail.branch = bank.branch;
       bankDetail.isfc = bank.isfc;
       bankDetail.no = bank.no
       const user = client
       const image = client.image
       console.log(image)
    return axios.post(`/api/profile/setup`,{user,bankDetail,token,image},{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })

}