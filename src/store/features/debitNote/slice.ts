import { createSlice } from "@reduxjs/toolkit"
import { IDebitNote } from "./model"
import { RootState } from "../../app/store"
import { debitNoteReducer } from "../../reducers/debitNote/reducer"
export interface IinitiliseDebitNote {
    isLoaded: boolean,
    notes: IDebitNote[]
}


const initileState: IinitiliseDebitNote = {
    isLoaded: false,
    notes: []
}


const Debit_Note_Slice = createSlice({
    initialState: initileState,
    name: 'Debit Note',
    reducers: {
        setDebitNote: debitNoteReducer

    }
})


export const { setDebitNote } = Debit_Note_Slice.actions

// export const selectCount = (state: RootState) => state.counter.value

export default Debit_Note_Slice.reducer;