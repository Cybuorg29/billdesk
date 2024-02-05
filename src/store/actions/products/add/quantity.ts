import { toast } from "react-toastify";
import { updateProductQtyApi } from "../../../../api/v2/product";
import { responceObj } from "../../../../models/responce";
import { store } from "../../../app/store";
import { actionPayload } from "../../../payload/payloadModel";
import { ProductOperations, stockOperation } from "../../../reducers/inventory";
import { updateStock } from "../../../features/inventory/inventorySlice";
import { change } from "../../../features/loader/loaderSlice";

export async function updateProductQuantityOnly(_id: string, qty: number) {
    store.dispatch(change());
    try {
        const { token } = store.getState().auth
        console.log(token, _id, qty)
        const { data } = await updateProductQtyApi(token, _id, qty);
        const res: responceObj = data;
        if (res.code !== 200) throw new Error(res.message);
        else {
            toast.success('updated Sucessfully');
            const payload: actionPayload = {
                type: stockOperation.update,
                data: {
                    _id: _id,
                    qty: qty
                }
            }
            store.dispatch(updateStock(payload));


        }






    } catch (err: any) {
        toast.error(err.message)

    }
    store.dispatch(change());
}