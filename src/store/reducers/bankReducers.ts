import { PayloadAction } from "@reduxjs/toolkit";
import { bankInterface } from "../features/bank/bankSlice";

export const initialiseBankDetails=(state:bankInterface,action:PayloadAction<bankInterface>)=>{
    state.bank = action.payload.bank
    state.name = action.payload.name
    state.no = action.payload.no
    state.branch = action.payload.branch
    state.isfc = action.payload.isfc

}