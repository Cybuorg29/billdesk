import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { userDetailSchema } from '../../../models/userModel'
import { InitialiseData, setValue } from '../../reducers/userReducer';


const initialState:userDetailSchema={
    name:'',
    gstin:'',
    phone:'',
    email:'',
    building:'',
    city:'',
    district:'',
    state:'',
    activities:'',
    pincode:'',
    image:''
}

export const UserSlice = createSlice({
    name:'userData',
    initialState,
    reducers:{
         initilise : InitialiseData,
          handleChange:setValue
    }
})



export const { initilise,handleChange} = UserSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default UserSlice.reducer