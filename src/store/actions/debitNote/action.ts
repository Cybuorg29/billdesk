import { toast } from "react-toastify";
import { ICreateDebitNote } from "../../features/debitNote/model";
import { createDebitNoteApi, deleteDebitNoteApi, getDebitNoteApi } from "../../../api/v2/debitNote/api";
import { responceObj } from "../../../models/responce";
import { debitNotePayloadType } from "../../reducers/debitNote/reducer";
import { store } from "../../app/store";
import { setDebitNote } from "../../features/debitNote/slice";
import { updateInventoryStockThroughInvoice } from "../products/update/updateStockThroughInvoice";
import { updatePoDeliveredThroughDebitNote } from "../purchaseOrder/action";
import { getProducts } from "../products";
import { change } from "../../features/loader/loaderSlice";

export async function createDebitNote(obj: ICreateDebitNote) {
    try {

        const { auth } = store.getState()

        const { data } = await createDebitNoteApi({ ...obj, token: auth.token });
        const res: responceObj = data;
        if (res.code !== 200) throw new Error(res.error);
        console.log('res', res.package)

        const payload: debitNotePayloadType = {
            type: 'push',
            data: res.package
        }

        store.dispatch(setDebitNote(payload));
        let newArray: { name: string, qty: number }[] = []
        obj.products.map((value) => {
            newArray.push({ name: value.name, qty: value.qty })
        })

        await updateInventoryStockThroughInvoice(newArray);
        // getProducts(true)
        // getProducts(auth.token);
        updatePoDeliveredThroughDebitNote(res.package);

    } catch (err: any) {
        console.log(err);
        toast.error(err.message);
    }

}


export async function initliseDebitNote() {
    try {

        const { auth } = store.getState()
        if (auth.istoken) {

            const { data } = await getDebitNoteApi(auth.token);
            const res: responceObj = data;
            if (res.code !== 200) throw Error(res.error);
            const payload: debitNotePayloadType = {
                type: 'set',
                data: res.package
            }

            store.dispatch(setDebitNote(payload));

        }

    } catch (err: any) {
        console.log(err.message);
        toast.error(err.message);
    }

}

export async function DeleteDebitNote(_id: string) {
    store.dispatch(change())
    try {

        const { auth } = store.getState()
        if (!auth.token) throw Error("Cannot Verify Login")
        else {
            const { data } = await deleteDebitNoteApi(auth.token, _id);
            const res: responceObj = data;
            if (res.code !== 200) throw Error(res.error);
            const payload: debitNotePayloadType = {
                type: 'deleteById',
                data: _id
            }
            store.dispatch(setDebitNote(payload));

        }

    } catch (err: any) {
        console.log(err.message);
        toast.error(err.message);
    }
    store.dispatch(change())
}



