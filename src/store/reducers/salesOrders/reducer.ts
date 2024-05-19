import { actionPayload } from "./../../payload/payloadModel";
import { ISalesOrder } from "../../../pages/salesOrders/Model/model";
import { PayloadAction } from "@reduxjs/toolkit";
import { Sales_Orders_slice } from "../../features/SalesOrders/SalesOrderSlice";
import { toast } from "react-toastify";
import removeIndex from "../../../utils/removeIndex";

export const SalesOrderActions = {
    set: "set",
    push: "push",
    delete: "delete",
};

export type payloadTypes = {} & (
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

export function changeSalesOrdersReducer(
    state: Sales_Orders_slice,
    action: PayloadAction<actionPayload>
) {
    const type = action.payload.type;
    const data = action.payload.data

    switch (type) {
        case SalesOrderActions.set:
            state.isLoaded = true;
            state.Sales_Orders = data
            break;
        case SalesOrderActions.push:
            state.Sales_Orders = [...state.Sales_Orders, data];
            break;
        case SalesOrderActions.delete:
            state.Sales_Orders = removeIndex(state.Sales_Orders, data);
            break;
        default:
            toast.error("error getting command for sales orders")
            break;
    }
}
