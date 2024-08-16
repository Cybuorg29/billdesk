import { createSlice } from '@reduxjs/toolkit';
import { IInvoiceProduct } from './../../../models/inventory/productModel';
import { ICreateCreditNote, ICreditNote } from './model';
import { creditNoteReducer } from '../../reducers/creditNote/reducer';



export interface InitialCreditNoteStates {
    isLoaded: boolean,
    notes: ICreditNote[]
}

const initialState: InitialCreditNoteStates = {
    isLoaded: false,
    notes: []
}



const Slice = createSlice({
    name: 'Credit Note',
    initialState: initialState,
    reducers: {
        setCreditNote: creditNoteReducer
    }
})

export const { setCreditNote } = Slice.actions


export default Slice.reducer;