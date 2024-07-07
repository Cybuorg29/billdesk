import { toast } from "react-toastify";
import { ICREATE_PURCHASE_ORDER } from "../../../pages/purchaseOrder/model/model";
import { store } from "../../app/store";
import { change } from "../../features/loader/loaderSlice";
import { createPurchaseOrderApi, DeletePoApi, getPoData } from "../../../api/v2/purchaseOrder/api";
import { responceObj } from "../../../models/responce";
import { actionPayload } from "../../payload/payloadModel";
import { poAction } from "../../reducers/Po/poReducer";
import { setPoReducer } from "../../features/PO/poSlice";
import { setPayablesAction } from "../bills/payable";


export async function createPurchaseOrderAction(body: ICREATE_PURCHASE_ORDER) {
    store.dispatch(change());
    try {

        const { token } = store.getState().auth;
        const { data } = await createPurchaseOrderApi(body, token);
        const res: responceObj = data;
        if (res.code != 200) throw Error(res.error);
        else {
            toast.success('Purchase Order Saved Sucessfully');
            console.log(res.package);
            const payload: actionPayload = {
                data: res.package,
                type: poAction.push
            }
            store.dispatch(setPoReducer(payload));
        }



    } catch (Err: any) {
        console.log(Err.message);
        toast.error('en error occured please try again')

    }
    store.dispatch(change())
}

export async function initlisePurchaseOrder() {
    store.dispatch(change())
    try {
        const { auth, payables } = store.getState()
        const { token, istoken } = auth
        if (!istoken) throw Error('Waiting for Authentication');
        const { data } = await getPoData(token);
        const res: responceObj = data;
        if (res.code !== 200) throw Error(res.error);

        if (!payables.isLoaded) {
            await setPayablesAction();
        }




        // getting bills payables 

        const payload: actionPayload = {
            data: {
                array: res.package,
                invoice: payables.invoice
            },
            type: poAction.set
        }
        store.dispatch(setPoReducer(payload));
    } catch (err: any) {
        console.log(err.message);
        toast.error('an error occured please try again');
        toast.error('Error type:' + err.message);
    }
    store.dispatch(change())

}


export async function DeletePurchaseOrder(_id: any, index: any) {
    store.dispatch(change())
    try {

        const { token, istoken } = store.getState().auth;

        if (!istoken) throw Error('', { cause: 'aaaa' });

        const { data } = await DeletePoApi(token, _id);
        const res: responceObj = data;
        if (res.code != 200) throw Error(res.error);
        // toast(index)

        const payload: actionPayload = {
            data: index,
            type: poAction.delete
        }

        store.dispatch(setPoReducer(payload));


    } catch (err: any) {
        console.log(err.message);
        toast.error('an error occured please try again');
        toast.error('Error type:' + err.message);
    }

    store.dispatch(change())
}