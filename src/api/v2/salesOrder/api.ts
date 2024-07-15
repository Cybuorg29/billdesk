import { ICreateSalesOrder } from './../../../pages/salesOrders/Model/model';
import axios from "axios";
import { toast } from "react-toastify";
import { v2Url } from "../../Url/ProdUrl";

export function CreateSalesOrderApi(data: ICreateSalesOrder, token: string) {

    return toast.promise(axios.post(`${v2Url}/api/user/create/salesorder`, { ...data, token }), { pending: "Saving Sales Order Please Wait" })

}

export function getSalesOrderApi(token: String) {
    return toast.promise(axios.get(`${v2Url}/api/user/read/salesorder/${token}`), { pending: 'Getting Sales Orders' })

}

export function deleteSalesOrderApi(token: String, id: string) {
    return toast.promise(axios.get(`${v2Url}/api/user/delete/salesorder/${token}/${id}`), { pending: 'Deleting Sales Orders' })

}

export function getSalesOrderNoApi(token: string, id: string) {
    return toast.promise(axios.get(`${v2Url}/api/user/get/salesorder/no/${token}/${id}`), { pending: 'Getting Sales Orders No.' })

}