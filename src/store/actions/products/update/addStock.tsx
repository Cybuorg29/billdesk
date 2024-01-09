import { toast } from "react-toastify"
import { AddStockApi } from "../../../../api/inventory"
import { responceObj } from "../../../../models/responce"
import { createDate } from "../../../../utils/CreateDate"
import { store } from "../../../app/store"
import { change } from "../../../features/loader/loaderSlice"
import { actionPayload } from "../../../payload/payloadModel"
import { updateStock } from "../../../features/inventory/inventorySlice"
import { setIncomeAndExpence } from "../../../features/IncomeAndExpences/IncomeAndExpences"
import { stockOperation } from "../../../reducers/inventory"


interface addStock {
    _id: string
    price: number
    total: number
    quantity: number
    E_id: string
}



export async function addStock({ _id, price, quantity, total, E_id }: addStock) {
    try {

        store.dispatch(change())
        const { auth } = store.getState();
        const { token } = auth;
        const date = createDate();

        const { data } = await AddStockApi(quantity, price, total, token, _id, date, E_id)
        const res: responceObj = data;
        { (res.code === 200) ? sucess(price, quantity, res.package.expence, _id) : error(res.error, res.message) }
        store.dispatch(change())
    } catch (err: any) {
        console.log(err.message);
        store.dispatch(change())


    }

}

function sucess(price: number, quantity: number, expence: object, id: string) {
    try {

        const stockPayload: actionPayload = {
            data: {
                rate: price,
                stock: quantity,
                _id: id
            },
            type: stockOperation.add
        };

        store.dispatch(updateStock(stockPayload));
        const expencePayload: actionPayload = {
            data: expence,
            type: 'pushExpence'
        }
        store.dispatch(setIncomeAndExpence(expencePayload))
        toast.success('Stock updated Sucessfully');
        toast.success('Purchase Added sucessfully');
        //  store.dispatch(change())
    }
    catch (err: any) {
        console.log(err.message);
        toast.error('en error occured please try again')

    }

}
function error(error: any, message: string) {
    toast.error(message);
    console.log(error);
}