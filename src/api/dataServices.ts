import axios from "axios";
import { baseUrl, v2Url } from "./Url/ProdUrl";
import { toast } from "react-toastify";

export const getIncomeByToken = (token: string) => {
  return axios.get(`${baseUrl}/api/income/getall/${token}`);
};

export const addExpences = (data: any, token: string) => {
  return axios.post(`${v2Url}/api/user/create/expence`, { ...data, id: token });
};

export const deleteExpenceByToken = (token: string, uid: string) => {
  return axios.get(`${baseUrl}/api/delete/expence/${token}/${uid}`);
};

export const editExpenceByObject = (data: object) => {
  return axios.post(`${baseUrl}/api/edit/expence`, { data });
};


export const getIncomeAndExpencesByDatesApi = (token: string, lower: string, upper: string) => {

  return toast.promise(
    axios.get(`${v2Url}/api/user/income_and_expence/by_date/${token}/${lower}/${upper}`),
    {
      pending: 'getting data'
    }
  )


}