import axios from "axios";
import { v2Url } from "../../Url/ProdUrl";
import { toast } from "react-toastify";

export function getDataByDateApi(token: string, lower: string, upper: string) {
    return toast.promise(
        axios.get(`${v2Url}/api/user/data/by/date/${token}/${lower}/${upper}`)
        , { pending: 'Getting data please wait' });
}