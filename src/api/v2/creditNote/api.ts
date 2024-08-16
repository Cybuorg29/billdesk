import { toast } from "react-toastify";
import { ICreateCreditNote } from "../../../store/features/creditNote/model";
import axios from "axios";
import { v2Url } from "../../Url/ProdUrl";

export function createCreditNoteApi(obj: ICreateCreditNote) {
    return toast.promise(axios.post(`${v2Url}/api/user/create/creditnote`, { ...obj }), { pending: "Saving Debit Note" });
}

export function getCreditNoteApi(token: String) {
    return toast.promise(axios.get(`${v2Url}/api/user/read/creditnote/${token}`), { pending: 'Getting Sales Orders' })

}

export function deleteCreditNoteApi(token: String, id: string) {
    return toast.promise(axios.get(`${v2Url}/api/user/delete/creditnote/${token}/${id}`), { pending: 'Deleting Sales Orders' })

}

export function getCreditNoteNoApi(token: string, id: string) {
    return toast.promise(axios.get(`${v2Url}/api/user/get/creditnote/no/${token}/${id}`), { pending: 'Getting Sales Orders No.' })

}