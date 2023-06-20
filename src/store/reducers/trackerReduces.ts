import { PayloadAction } from "@reduxjs/toolkit"
import { trackerSchema } from "../features/tracker/trackerSlice"


export interface  trackerLoad{
    type:string
    data:any
}



export const initialiseTracker=(state:trackerSchema,action:PayloadAction<trackerSchema>)=>{
    console.log('action',action.payload)
    state.totalIncome = action.payload.totalIncome 
    state.totalExpences = action.payload.totalExpences
    state.expences = action.payload.expences
    state.income = action.payload.income
}