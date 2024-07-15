import { toast } from "react-toastify";
import { ICreateSalesOrder } from "../../../pages/salesOrders/Model/model";
import { store } from "../../app/store";
import { CreateSalesOrderApi, deleteSalesOrderApi, getSalesOrderApi } from "../../../api/v2/salesOrder/api";
import { responceObj } from "../../../models/responce";
import { actionPayload } from "../../payload/payloadModel";
import { SalesOrderActions, salesOrderPayloadTypes } from "../../reducers/salesOrders/reducer";
import { setSalesOrderReducer } from "../../features/salesOrders/SalesOrderSlice";
import { change } from "../../features/loader/loaderSlice";
import { IcreateInvoice } from "../../../models/invoice/invoice.model";
import { IInvoiceProduct } from "../../../models/inventory/productModel";
import { updateInventoryStockThroughInvoice } from "../products/update/updateStockThroughInvoice";

export async function initliseSalesOrdersAction() {
    store.dispatch(change())
    try {
        const { auth } = store.getState();
        const { data } = await getSalesOrderApi(auth.token);
        const res: responceObj = data;
        if (res.code !== 200) throw Error(res.error);
        const payload: salesOrderPayloadTypes = {
            type: 'set',
            data: res.package
        }

        store.dispatch(setSalesOrderReducer(payload));



    } catch (Err: any) {
        console.log(Err.message);
        toast.error("An error occured")
        toast.error("Error type :" + Err.message);
    }
    store.dispatch(change())


}



export async function createSalesOrderAction(salesOrder: ICreateSalesOrder) {

    store.dispatch(change())

    try {
        const { token, istoken } = store.getState().auth;
        if (!istoken) throw new Error("Please Login");
        const { data } = await CreateSalesOrderApi(salesOrder, token);
        const res: responceObj = data;
        console.log(res)
        if (res.code !== 200) throw new Error(res.error);
        const payload: salesOrderPayloadTypes = {
            data: res.package,
            type: 'push'
        }


        store.dispatch(setSalesOrderReducer(payload));






    } catch (Err: any) {
        console.log(Err.message);
        toast.error("an error occured . please try again");
        toast.error("error type :" + Err.message)
    }
    store.dispatch(change())


}




export async function deleteSalesOrderAction(_id: string, index: number | undefined) {
    store.dispatch(change());
    try {
        if ((index === undefined)) throw Error("Index Error ")
        const { token } = store.getState().auth
        const { data } = await deleteSalesOrderApi(token, _id);
        const res: responceObj = data;
        if (res.code !== 200) throw Error(res.error);
        const payload: salesOrderPayloadTypes = {
            type: "delete",
            data: index
        }

        store.dispatch(setSalesOrderReducer(payload));


    } catch (err: any) {
        console.log(err.message)
        toast.error("an error occured please try again ")
        toast.error("error type :" + err.message);
    }
    store.dispatch(change());



}



export async function updateDeliveredThroughInvoice(obj: IcreateInvoice) {
    // store.dispatch()
    try {
        let newArray: { name: string, qty: number }[] = [];

        obj.products.map((value: IInvoiceProduct) => {
            newArray.push({ name: value.name, qty: value.qty })
        })

        const payload: salesOrderPayloadTypes = {
            data: {
                id: obj.SO_NO,
                list: newArray
            },
            type: 'updateStockThroughInvoice'
        }
        updateInventoryStockThroughInvoice(payload.data.list)
        store.dispatch(setSalesOrderReducer(payload))

    } catch (err: any) {
        console.log(err.message)
        toast.error("an error occured please try again ")
        toast.error("error type :" + err.message);
    }
    // store.dispatch(change());

}