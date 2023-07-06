import { PayloadAction } from "@reduxjs/toolkit";
import { incomeArray } from "../features/IncomeAndExpences/IncomeAndExpences";

  export interface IncomeAndExpencespayload {
    type:string
    data:any
}


export const changeIncomeAndExpencesState=(state:incomeArray,action:PayloadAction<IncomeAndExpencespayload>)=>{
       const data = action.payload.data
       const type = action.payload.type
      switch(type){
        case 'income':
            state.income = data
            state.isIncome = true
            break;
            case 'expences':
                state.expences = data
                state.isExpences = true
                break;
                case 'totalIncomes':
                  state.totalIncome = data
                  break;
                  case 'totalExpences':
                    state.totalExpences = data
                    break; 
                    case 'initlise':
                      state.income = data.income;
                      state.expences = data.expence;
                      state.totalExpences = data.totalExpences;
                      state.totalIncome = data.totalIncome
      }
}


