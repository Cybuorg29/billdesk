import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl, v2Url } from "../../../Url/ProdUrl";
import { IcreateBillsPayable } from "../../../../store/features/bills/receivable/model";


export function getPayablesApi(token: string, month: any) {
    return toast.promise(axios.get(`${v2Url}/api/user/billspayable/read/${token}/${month}`), { pending: 'getting Bills Payable' });
}


export function InsertPayableApi(data: IcreateBillsPayable) {
    return toast.promise(axios.post(`${v2Url}/api/user/billspayable/create`, { ...data }), { pending: 'Inserting Bills Payable' })
}

export function deletePayableApi(_id: string, token: string) {
    return toast.promise(axios.get(`${v2Url}/api/user/billspayable/delete/${_id}/${token}`), { pending: 'Deleting Bills Payables' })
}

export function setPaidApi(token: string, invoiceid: string) {
    return toast.promise(axios.get(`${v2Url}/api/user/payables/markpaid/${invoiceid}/${token}`), { pending: 'updating Payables' })
}