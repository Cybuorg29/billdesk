import { PayloadAction } from "@reduxjs/toolkit";
import { tokenSchema } from "../features/auth/authSlice";
import { actionPayload } from "../payload/payloadModel";


export const pushToken=(state:tokenSchema,action:PayloadAction<actionPayload>)=>{

     console.log('adasdasdadasdadasdada')
    state.token = action.payload.data.token;
    state.istoken = true
     const token = JSON.stringify(action.payload.data.token)
    sessionStorage.setItem('token',token)

}


export const pullToken =(state:tokenSchema)=>{
      state.istoken = false
}