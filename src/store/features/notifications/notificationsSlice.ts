import { createSlice } from "@reduxjs/toolkit";
import { notificationModel } from "../../reducers/notifications/notification.model";
import { changeNotifications } from "../../reducers/notifications/notifications.Reducers";
import { RootState } from "../../app/store";





export  interface Inotifications{
   notification:notificationModel[]
}

const initialState:Inotifications={
    notification:[]
}


const notificationSlice=createSlice({
    name:'notifications',
    initialState:initialState,
    reducers:{
        setNotifications:changeNotifications
    }
})


export const  {setNotifications} = notificationSlice.actions;
export const selectCount = (state: RootState) => state.counter.value


export default notificationSlice.reducer;