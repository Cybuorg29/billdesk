import { PayloadAction } from "@reduxjs/toolkit";
import { tokenSchema } from "../features/auth/authSlice";


export const pushToken=(state:tokenSchema,action:PayloadAction<tokenSchema>)=>{
    state.token = action.payload.token;
    state.istoken = true
     const token = JSON.stringify(action.payload.token)
    sessionStorage.setItem('token',token)

}

export const pullToken =(state:tokenSchema)=>{
      state.istoken = false
}