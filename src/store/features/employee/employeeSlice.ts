import { createSlice } from "@reduxjs/toolkit"
import { initEmployee } from "../../reducers/employeeReducer"
import { RootState } from "../../app/store"

 export interface employeeObject{
   
}

export interface employeeArray{
    employee:employeeObject[]
    isEmployee:boolean
}


const initialState:employeeArray={
    employee:[],
     isEmployee :false
}


const employeeSlice= createSlice({
    name:'employees',
    initialState,
    reducers:{
        setEmployee:initEmployee

    }
})

export const { setEmployee } = employeeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default employeeSlice.reducer





