import { toast } from "react-toastify";
import { deletePayableApi } from "../../../../api/v2/bills/payable/api";
import { store } from "../../../app/store";
import { change } from "../../../features/loader/loaderSlice";
import { responceObj } from "../../../../models/responce";
import { actionPayload } from "../../../payload/payloadModel";
import { payableActions } from "../../../reducers/bills/receivable/reducer";
import { changePayables } from "../../../features/bills/receivable/billsReceivableSlice";

export async function DeleteBillsPayableAction(_id: string) {
    store.dispatch(change());
    try {

        const { token } = store.getState().auth;
        const { data } = await deletePayableApi(_id, token);
        const res: responceObj = data;
        if (res.code !== 200) throw Error(res.error);
        const payload: actionPayload = {
            type: payableActions.DELETE,
            data: _id
        }
        toast.success('Deleted Sucessfully')
        store.dispatch(changePayables(payload));
    } catch (err: any) {
        console.log(err.message);
        toast.error(err.message)
    }
    store.dispatch(change());

}