import { createSlice } from "@reduxjs/toolkit";
import { ConnectionModel } from "../../../models/Client/Connection/ConnectionsModel";
import { RootState } from "../../app/store";
import { changeConnection } from "../../reducers/connections/connectionReducers";



const initialState:ConnectionModel={
    isConnection:false,
    connections:[],
}

export const ConnectionSlice= createSlice({
    name:'Connections',
    initialState,
    reducers:{
        setConnections:changeConnection
    }
})

export const {setConnections  } = ConnectionSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default ConnectionSlice.reducer