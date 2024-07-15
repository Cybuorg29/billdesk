import { toast } from 'react-toastify';
import axios from "axios"
import { IcreateInvoice } from "../../../models/invoice/invoice.model"
import { v2Url } from "../../Url/ProdUrl"

export const createInvoiceAPI = (obj: IcreateInvoice) => {
    return toast.promise(axios.post(`${v2Url}/api/user/create/invoice`, { ...obj }), { pending: 'saving invoice' })
}

export function getInvoiceApi(token: string) {
    return toast.promise(axios.get(`${v2Url}/api/user/invoice/get/${token}`), { pending: 'getting invoices' })
}

export function DeleteInvoiceApi(_id: string, token: string) {
    return toast.promise(axios.get(`${v2Url}/api/user/invoice/delete/${_id}/${token}`), { pending: 'please while we perform this action' })
}