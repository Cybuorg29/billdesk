import { PayloadAction } from "@reduxjs/toolkit";
import {  ITERMSOBJ } from "../../features/terms";
import { actionPayload } from "../../payload/payloadModel";


export const termActions = {
    set:'set',

}

export const setTerms=(state:ITERMSOBJ,action:PayloadAction<actionPayload>)=>{
    const type = action.payload.type;
    const data = action.payload.data;
     switch (type){
       case termActions.set:{
        state.terms = data;
         state.isLoaded = true
        break;
       }
     }
}