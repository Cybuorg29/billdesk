import { toast } from "react-toastify";
import { IMAGE, NAME } from "./constants/constants";
import { store } from "../../app/store";
import { initilise, userUpdate } from "../../features/user/userSlice";
import { InitialiseData, load } from "../../reducers/userReducer";
import { getUserData, updateProfileImage } from "../../../api/userServices";
import { userDetailSchema } from "../../../models/userModel";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { initliseBank } from "../../features/bank/bankSlice";
import { change } from "../../features/loader/loaderSlice";
import { initliseTrackerState, trackerSchema } from "../../features/tracker/trackerSlice";
import { trackerLoad } from "../../reducers/trackerReduces";


console.log(NAME)

export const UpdateUSer =async(type:string,data:any)=>{
    try{

        let payload:load = {type:'',data:''}

         payload={
            type:NAME,
            data:data
        }
        store.dispatch(userUpdate(payload))
    }catch(err:any){
        toast.error(err.message)
    }

    
}

export const initialiseUserData =async()=>{
    try{
        
        toast.success('in initlise')
        const {auth} = store.getState()
        const {token} = auth;
    
        const {data } = await getUserData(token)
    
        if(data.code===200){
            store.dispatch(initilise(data.user))
            store.dispatch(initliseBank(data.bank))
             let totalIncome = 0;
             let totalExpences = 0;
             data.income.map((index:any)=>{
                totalIncome = totalIncome + index.amount;
             })
             data.expences.map((index:any)=>{
                totalExpences = totalExpences + index.amount
             })
           const trackerPayload:trackerSchema = {
            totalExpences:totalExpences,
            totalIncome:totalIncome,
            expences:data?.expences,
            income:data.income

           }
                
             store.dispatch(initliseTrackerState(trackerPayload))
        }else{
            throw new Error(data?.message)
        }   
    }catch(err:any){
        toast.error('an error occured please try again or refresh ')
        console.log(err.message)
    }
     
}


  export const updateImage=async(image:any)=>{
    try{
         store.dispatch(change())
         const {auth} = store.getState()
          const {token} = auth 
        const {data} = await updateProfileImage(image,token)
        toast.success('image updated sucessfully');
         const pay:load = {
            type:'image',
            data:data?.image
         }
          store.dispatch(userUpdate(pay))
          store.dispatch(change())

    }catch(err:any){
        console.log(err.message)
        toast.error('an error occured please try again')
    }

}

