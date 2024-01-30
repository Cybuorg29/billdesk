import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl, v2Url } from "../../../Url/ProdUrl";


export function getPayablesApi(token: string, month: any) {
    return toast.promise(axios.get(`${v2Url}/api/user/billspayable/read/${token}/${month}`), { pending: 'getting Bills Payable' });
}

