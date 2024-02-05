import { toast } from "react-toastify";
import { IcreateBillsPayable } from "../../../features/bills/receivable/model";
import { store } from "../../../app/store";
import { InsertPayableApi } from "../../../../api/v2/bills/payable/api";
import { responceObj } from "../../../../models/responce";
import { actionPayload } from "../../../payload/payloadModel";
import { payableActions } from "../../../reducers/bills/receivable/reducer";
import { changePayables } from "../../../features/bills/receivable/billsReceivableSlice";
import { change } from "../../../features/loader/loaderSlice";

export async function insertBillsPayable(payable: IcreateBillsPayable) {
    store.dispatch(change())
    try {

        const { data } = await InsertPayableApi(payable);
        const res: responceObj = data
        if (res.code === 500) {
            throw new Error('internal server error');
        }
        else if (res.code !== 200) throw new Error(res.error);
        else {

            const payload: actionPayload = {
                data: res.package,
                type: payableActions.PUSH
            }
            store.dispatch(changePayables(payload));

        }




    } catch (err: any) {
        toast.error(err.message)
    }
    store.dispatch(change())


}