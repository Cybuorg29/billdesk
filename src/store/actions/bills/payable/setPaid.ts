import { toast } from "react-toastify"
import { store } from "../../../app/store"
import { setPaidApi } from "../../../../api/v2/bills/payable/api"
import { responceObj } from "../../../../models/responce";
import { actionPayload } from "../../../payload/payloadModel";
import { payableActions, setPayables } from "../../../reducers/bills/receivable/reducer";
import { changePayables } from "../../../features/bills/receivable/billsReceivableSlice";
import { change } from "../../../features/loader/loaderSlice";

export async function setPayablePaidAction(_id: string) {
    store.dispatch(change())
    try {
        const { token } = store.getState().auth
        const { data } = await setPaidApi(token, _id);
        const res: responceObj = data
        if (res.code === 200) {
            const payload: actionPayload = {
                data: _id,
                type: payableActions.MARK_PAID
            }
            store.dispatch(changePayables(payload));
        } else throw Error(res.error);

    } catch (err: any) {
        console.log(err.message)
        toast.error(err.message)
    }
    store.dispatch(change())


}