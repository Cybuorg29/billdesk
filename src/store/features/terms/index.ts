import { createSlice } from "@reduxjs/toolkit";
import { setTerms } from "../../reducers/term/term.reducer";

export interface ITERMS {
    name: string,
    terms: string[],
    id: string
}

export interface ITERMSOBJ{
    isLoaded:boolean,
    terms:ITERMS[]
}

const initialState:ITERMSOBJ = {
    isLoaded:false,
    terms:[]
};

const  termSlice =  createSlice({
    name:'Terms',
    initialState:initialState,
    reducers:{
       set:setTerms
    }
});
export const { set} = termSlice.actions

export default termSlice.reducer
