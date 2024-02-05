import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl, v2Url } from "../../Url/ProdUrl";

export function createProductApi() {
    return toast.promise(axios.post(``), { pending: '' })
}
export function updateProductApi(data: any) {
    return toast.promise(axios.post(`${v2Url}/api/update/product`, { ...data }), { pending: 'performing update please wait ' })
}

export function updateProductQtyApi(token: string, _id: string, qty: number) {

    return toast.promise(axios.post(`${v2Url}/api/update/product/qty`, {
        token, _id, qty
    }), { pending: 'updating product quantity' })
}