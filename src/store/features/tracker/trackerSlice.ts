import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { initialiseTracker } from "../../reducers/trackerReduces"



export interface trackerSchema{
    totalExpences:number
    totalIncome:number
    income:any[]
    expences:any[]
}



const initialState:trackerSchema = {
    totalExpences:0,
    totalIncome:0,
    income:[],
    expences:[]
}

const trackerSlice = createSlice({
     name: 'tracker',
    initialState,
    reducers:{
        initliseTrackerState:initialiseTracker
    }
})


export const { initliseTrackerState} = trackerSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default trackerSlice.reducer