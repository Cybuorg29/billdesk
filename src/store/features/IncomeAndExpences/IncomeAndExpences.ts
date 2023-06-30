import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import {  changeIncomeAndExpencesState} from "../../reducers/incAndExpReducer"


//interface for object inside incomearray
  export interface  incomeAndExpencesObjectSchema{
    title:string
    amount:number
    category:string
    id:string
    date:string
}
//interface for income array 
  export interface incomeArray{
   income:incomeAndExpencesObjectSchema[]
   expences:incomeAndExpencesObjectSchema[]
   isIncome:boolean
   isExpences:boolean
}

const initialState:incomeArray={
    income:[],
    expences:[],
    isExpences:false,
    isIncome:false
    
}


const ProfitAndLossSlice = createSlice({
     name: 'income',
    initialState,
    reducers:{
        setIncome:changeIncomeAndExpencesState,
       
    }
})

// export const { switch } = loaderSlice.actions
export const {setIncome} =  ProfitAndLossSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default ProfitAndLossSlice.reducer
