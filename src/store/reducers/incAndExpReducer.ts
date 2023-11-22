import { PayloadAction } from "@reduxjs/toolkit";
import { incomeArray } from "../features/IncomeAndExpences/IncomeAndExpences";

export interface IncomeAndExpencespayload {
  type: string;
  data: any;
}

export const changeIncomeAndExpencesState = (
  state: incomeArray,
  action: PayloadAction<IncomeAndExpencespayload>
) => {
  const data = action.payload.data;
  const type = action.payload.type;
  switch (type) {
    case "income":
      state.income = data;
      state.isIncome = true;
      break;
    case "expences":
      state.expences = data;
      state.isExpences = true;
      break;
    case "totalIncomes":
      state.totalIncome = data;
      break;
    case "totalExpences":
      state.totalExpences = data;
      break;
    case "initlise":
         let totalIncome = 0;
         let totalExpences = 0;

         data.income.map((index:any)=>{
            totalIncome  = totalIncome + index.amount;
          return 0;
         })
         data.expences.map((index:any)=>{
          totalExpences = totalExpences + index.amount;
          return 0;  
         })
      state.income = data.income.reverse();
      state.expences = data.expences.reverse();
      state.totalExpences = totalExpences;
      state.totalIncome = totalIncome;
      state.isExpences = true;
      state.isIncome = true;
      state.month = parseInt(data.month);
      break;
      case 'pushExpence':
         state.expences.push(data);
        break
        case 'pushIncome':
          state.income.push(data);
          break;
  }
};
