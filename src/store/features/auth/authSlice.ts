import { createSlice } from "@reduxjs/toolkit"
import { pullToken, pushToken } from "../../reducers/authReducer"
import { RootState } from "../../app/store"


 export interface tokenSchema{
    token:string
    istoken:boolean
}

  const initialState:tokenSchema={
    token:'',
    istoken:false
    
}

const authSlice = createSlice({
    name:'token',
    initialState,
    reducers:{
        saveToken:pushToken,
        deleteToken:pullToken
    }
})

export const { saveToken,deleteToken} = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default authSlice.reducer


