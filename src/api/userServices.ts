import { registerArgs } from "./../models/registerModels";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppSelector } from "../store/app/hooks";
import { userDetailSchema } from "../models/userModel";
import { bankInterface } from "../store/features/bank/bankSlice";
import { baseUrl, v2Url } from "./Url/ProdUrl";


export const signup = (user: registerArgs) => {

  return toast.promise(axios.post(`${baseUrl}/api/user/signup`, { user }), { pending: 'setting you up.....please wait' });
};

export const login = (username: string, password: string) => {
  return axios.post(`${baseUrl}/api/user/login`, { username, password });
};

export const getUserData = (token: any) => {
  return axios.get(`${baseUrl}/api/user/getdata/${token}`);
};

export const verifyLogin = (token: string) => {

  return axios.get(`${baseUrl}/api/user/verify/${token}`)

}

export const setUpProfile = (
  client: userDetailSchema,
  bank: bankInterface,
  token: any
) => {
  let bankDetail = {
    Accountname: "",
    no: "",
    isfc: "",
    bankName: "",
    branch: "",
  };
  bankDetail.Accountname = bank.name;
  bankDetail.bankName = bank.bank;
  bankDetail.branch = bank.branch;
  bankDetail.isfc = bank.isfc;
  bankDetail.no = bank.no;
  const file = client.image;
  const user: any = client;
  delete user.image;

  return axios.post(
    `${baseUrl}/api/profile/setup`,
    { bankDetail, token, file, user },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const updateProfileImage = (image: any, token: any) => {
  return axios.post(
    `${baseUrl}/api/profile/update/photo`,
    { image, token },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const profileData = (id: string) => {
  return axios.get(`${v2Url}/api/user/get/profiledata/${id}`);
}

export const getUserProducts = (id: string) => {
  return axios.get(`${baseUrl}/api/get/products/${id}`);
}
