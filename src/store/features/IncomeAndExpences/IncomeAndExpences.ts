import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { changeIncomeAndExpencesState } from "../../reducers/incAndExpReducer"
import { IIncome } from "../../../models/incomeAndExp/incomeInterface"
import { IExpence } from "../../../models/incomeAndExp/expenceInterface"


//interface for object inside incomearray
export interface incomeAndExpencesObjectSchema {
  title: string
  amount: number
  category: string
  id: string
  date: string
  E_id: string
  createdAt: string
}
//interface for income array 
export interface incomeArray {
  income: IIncome[]
  expences: IExpence[]
  totalIncome: number
  totalExpences: number
  isIncome: boolean
  isExpences: boolean
  from: string,
  to: string,
  month: number
}


const date = new Date();


const initialState: incomeArray = {
  income: [],
  expences: [],
  isExpences: false,
  isIncome: false,
  totalExpences: 0,
  totalIncome: 0,
  from: `${date.getFullYear()}-${date.getMonth() + 1}-01`,
  to: `${date.getFullYear()}-${date.getMonth() + 1}-${new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()}`,
  month: 1

}


const ProfitAndLossSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setIncomeAndExpence: changeIncomeAndExpencesState,

  }
})

// export const { switch } = loaderSlice.actions
export const { setIncomeAndExpence } = ProfitAndLossSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default ProfitAndLossSlice.reducer
