import axios from "axios";
import { toast } from "react-toastify";
import { ICREATE_PURCHASE_ORDER, ICREATE_PURCHASE_ORDER_PRODUCT } from "../../../pages/purchaseOrder/model/model";
import { v2Url } from "../../Url/ProdUrl";


export function createPurchaseOrderApi(data: ICREATE_PURCHASE_ORDER, token: string) {
    return toast.promise(
        axios.post(`${v2Url}/api/user/create/purchaseorder`, {
            ...data, token
        })
        , { pending: 'Saving Purchase Order Please Wait' })
}

export function getPoData(token: string) {
    return toast.promise(
        axios.get(`${v2Url}/api/user/read/purchaseorder/${token}`)
        , { pending: 'Saving Purchase Order Please Wait' })

}

export function DeletePoApi(token: string, _id: string) {
    return toast.promise(axios.get(`${v2Url}/api/user/delete/purchaseorder/${token}/${_id}`), { pending: 'Deleting Purchase Order Please Wait' })
}