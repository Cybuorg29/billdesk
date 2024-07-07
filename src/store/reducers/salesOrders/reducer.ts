import { actionPayload } from "./../../payload/payloadModel";
import { ISalesOrder } from "../../../pages/salesOrders/Model/model";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import removeIndex from "../../../utils/removeIndex";
import { Sales_Orders_slice } from "../../features/salesOrders/SalesOrderSlice";

export const SalesOrderActions = {
    set: "set",
    push: "push",
    delete: "delete",
};

export type salesOrderPayloadTypes = {} & (
    | {
        type: "set";
        data: ISalesOrder[];
    }
    | {
        type: "push"
        data: ISalesOrder
    } |
    {
        type: "delete"
        data: number
    }
);


export const changeSalesOrdersReducer = (state: any, action: PayloadAction<actionPayload>) => {
    const type = action.payload.type;
    const data = action.payload.data

    switch (type) {
        case SalesOrderActions.set:
            state.isLoaded = true;
            state.Sales_Orders = data
            toast.success("Sucessfully Fetched Sales Order")
            break;
        case SalesOrderActions.push:
            state.Sales_Orders = [...state.Sales_Orders, data];
            toast.success("Sales Order Added")
            break;
        case SalesOrderActions.delete:
            state.Sales_Orders = removeIndex(state.Sales_Orders, data);
            toast.success("Sales Order Deleted")
            break;
        default:
            toast.error("error getting command for sales orders")
            break;
    }
}
