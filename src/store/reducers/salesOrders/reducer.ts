import { actionPayload } from "./../../payload/payloadModel";
import { ICreateSalesOrder, ISALES_ORDER_PRODUCT, ISalesOrder } from "../../../pages/salesOrders/Model/model";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import removeIndex from "../../../utils/removeIndex";
import { Sales_Orders_slice } from "../../features/salesOrders/SalesOrderSlice";

export const SalesOrderActions = {
    set: "set",
    push: "push",
    delete: "delete",
    updateStockthroughInvoice: "updateStockThroughInvoice",
    updateStockthroughCreditNote: "updateStockThroughCreditNote"
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
    } | {
        type: 'updateStockThroughInvoice'
        data: {
            id: string,
            list: {
                name: string
                qty: number
            }[]
        }
    } | {
        type: 'updateStockThroughCreditNote'
        data: {
            id: string,
            list: {
                name: string
                qty: number
            }[]
        }
    }
);


export const changeSalesOrdersReducer = (state: any, action: PayloadAction<actionPayload>) => {
    const type = action.payload.type;
    const data = action.payload.data;
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
        case SalesOrderActions.updateStockthroughInvoice:
            try {
                // toast("start" + data.id)
                let int = state.Sales_Orders.findIndex((order: ISalesOrder) => order._id === data.id);
                // toast('int' + int)
                if (int === -1) {
                    throw new Error("Cannot find Sales Order")
                }
                let order: ISalesOrder = state.Sales_Orders[int];
                // toast("found" + order?._id)
                data?.list.map((value: { name: string, qty: number }) => {
                    // toast()
                    const index = order.product.findIndex((product: ISALES_ORDER_PRODUCT) => product.name.toUpperCase() === value.name.toUpperCase());
                    // toast('index' + index)
                    if (index === -1) toast.error("Error Updating Sales Order ON Current Session Please Refresh To See The Change");
                    else order.product[index].delivered = parseInt(`${order?.product[index].delivered}`) + parseInt(`${value.qty}`)
                });
                state.Sales_Orders[int] = order;
            } catch (err: any) {
                toast.error(err.message)
                console.log(err.message)

            }
            toast.success("Sales Order Updated")
            break;



        case SalesOrderActions.updateStockthroughCreditNote:
            try {
                // toast("start" + data.id)
                let int = state.Sales_Orders.findIndex((order: ISalesOrder) => order._id === data.id);
                // toast('int' + int)
                if (int === -1) {
                    throw new Error("Cannot find Sales Order")
                }
                let order: ISalesOrder = state.Sales_Orders[int];
                // toast("found" + order?._id)
                data?.list.map((value: { name: string, qty: number }) => {
                    // toast()
                    const index = order.product.findIndex((product: ISALES_ORDER_PRODUCT) => product.name.toUpperCase() === value.name.toUpperCase());
                    // toast('index' + index)
                    if (index === -1) toast.error("Error Updating Sales Order ON Current Session Please Refresh To See The Change");
                    else order.product[index].delivered = parseInt(`${order?.product[index].delivered}`) - parseInt(`${value.qty}`)
                });
                state.Sales_Orders[int] = order;
            } catch (err: any) {
                toast.error(err.message)
                console.log(err.message)

            }
            toast.success("Sales Order Updated")
            break;



        default:
            toast.error("error getting command for sales orders")
            break;
    }
}
