import { createSlice } from "@reduxjs/toolkit"
import { ISalesOrder } from "../../../pages/salesOrders/Model/model"
import { changeSalesOrdersReducer } from "../../reducers/salesOrders/reducer"


export interface Sales_Orders_slice {
    isLoaded: boolean
    Sales_Orders: ISalesOrder[]
}
const initialState: Sales_Orders_slice = {
    isLoaded: false,
    Sales_Orders: []
}

const salesOrderSlice = createSlice({
    name: 'Sales Orders',
    initialState: initialState,
    reducers: {
        setSalesOrderReducer: changeSalesOrdersReducer
    }
})


export const { setSalesOrderReducer } = salesOrderSlice.actions;

export default salesOrderSlice.reducer;