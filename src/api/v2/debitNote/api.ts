import { toast } from "react-toastify";
import { ICreateDebitNote } from "../../../store/features/debitNote/model";
import axios from "axios";
import { v2Url } from "../../Url/ProdUrl";

export function createDebitNoteApi(obj: ICreateDebitNote) {
    return toast.promise(axios.post(`${v2Url}/api/user/create/debitnote`, { ...obj }), { pending: "Saving Debit Note" });
}

export function getDebitNoteApi(token: String) {
    return toast.promise(axios.get(`${v2Url}/api/user/read/debitnote/${token}`), { pending: 'Getting Sales Orders' })

}

export function deleteDebitNoteApi(token: String, id: string) {
    return toast.promise(axios.get(`${v2Url}/api/user/delete/debitnote/${token}/${id}`), { pending: 'Deleting Sales Orders' })

}

export function getDebitNoteNoApi(token: string, id: string) {
    return toast.promise(axios.get(`${v2Url}/api/user/get/debitnote/no/${token}/${id}`), { pending: 'Getting Sales Orders No.' })

}