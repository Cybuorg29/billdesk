import { PayloadAction } from "@reduxjs/toolkit";
import { bankInterface } from "../features/bank/bankSlice";

export const initialiseBankDetails=(state:bankInterface,action:PayloadAction<bankInterface>)=>{
    state = action.payload

}