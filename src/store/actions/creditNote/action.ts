import { toast } from "react-toastify";
import { ICreateCreditNote } from "../../features/creditNote/model";
import { store } from "../../app/store";
import { change } from "../../features/loader/loaderSlice";
import { createCreditNoteApi, deleteCreditNoteApi, getCreditNoteApi } from "../../../api/v2/creditNote/api";
import { responceObj } from "../../../models/responce";
import { creditNotePayloadType } from "../../reducers/creditNote/reducer";
import { setCreditNote } from "../../features/creditNote/slice";
import { updateSoDeliveredThroughCreditNote } from "../salesOrders/action";

export async function createCreditNoteAction(obj: ICreateCreditNote, close?: any) {
    store.dispatch(change());
    try {
        const { auth } = store.getState();
        if (!auth.istoken) throw Error("Cannot Validate Login");
        const { data } = await createCreditNoteApi(obj);
        const res: responceObj = data;
        if (res.code !== 200) throw Error(res.error);
        const payload: creditNotePayloadType = {
            type: 'push',
            data: res.package
        }
        store.dispatch(setCreditNote(payload));
        if (close) close();
        updateSoDeliveredThroughCreditNote(obj)
    } catch (err: any) {
        console.error(err.message);
        toast.error(err.message);
    }
    store.dispatch(change());


}


export async function initliseCreditNoteAction() {
    store.dispatch(change())
    try {

        const { auth } = store.getState()
        if (!auth.istoken) throw Error("Error Validating Login");
        const { data } = await getCreditNoteApi(auth.token);
        const res: responceObj = data;
        if (res.code !== 200) throw Error(res.error);
        const payload: creditNotePayloadType = {
            type: 'set',
            data: res.package
        }
        store.dispatch(setCreditNote(payload));


    } catch (err: any) {
        console.error(err.message);
        toast.error(err.message);
    }
    store.dispatch(change())

}

export async function DeleteCreditNoteAction(_id: string) {
    try {
        const { auth } = store.getState()
        const { data } = await deleteCreditNoteApi(auth.token, _id);
        const res: responceObj = data;
        if (res.code !== 200) throw Error(res.error);
        const payload: creditNotePayloadType = {
            type: 'deleteById',
            data: _id
        }
        store.dispatch(setCreditNote(payload))

    } catch (err: any) {
        console.error(err.message);
        toast.error(err.message);
    }

}