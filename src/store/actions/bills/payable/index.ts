import { toast } from "react-toastify";
import { store } from "../../../app/store";
import { getPayablesApi } from "../../../../api/v2/bills/payable/api";
import { responceObj } from "../../../../models/responce";
import { actionPayload } from "../../../payload/payloadModel";
import { payableActions } from "../../../reducers/bills/receivable/reducer";
import { changePayables } from "../../../features/bills/receivable/billsReceivableSlice";


export async function setPayablesAction(month?: any) {
    try {
        const { token, istoken } = store.getState().auth
        if (!token) {

        }
        else {
            if (!month) {
                month = new Date().getMonth()
            }
            const { data } = await getPayablesApi(token, month);
            const res: responceObj = data;
            console.log(res)
            if (res.code !== 200) throw new Error(res.message);
            const payload: actionPayload = {
                type: payableActions.SET,
                data: res.package
            }


            store.dispatch(changePayables(payload));
        }

    } catch (err: any) {
        toast.error(err.message);
    }

}