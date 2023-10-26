import { RootState } from '../../app/store';
import { initialiseBankDetails } from './../../reducers/bankReducers';
import { createSlice } from "@reduxjs/toolkit"


export interface bankInterface {
    name:string
    no:string
    isfc:string
    branch:string
    bank:string
}

const initialState:bankInterface={
    bank:'',
    name:'',
    no:'',
    isfc:'',
    branch:''    
}

 export const bankSlice = createSlice({
    name:'bankData',
    initialState,
    reducers:{
        initliseBank:initialiseBankDetails
    }
})

export const { initliseBank} =  bankSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default bankSlice.reducer