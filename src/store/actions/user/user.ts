import { saveToken, tokenSchema } from './../../features/auth/authSlice';
import { toast } from "react-toastify";
import { store } from "../../app/store";
import { initilise, userUpdate } from "../../features/user/userSlice";
import { load } from "../../reducers/userReducer";
import { getUserData, updateProfileImage, verifyLogin } from "../../../api/userServices";
import { initliseBank } from "../../features/bank/bankSlice";
import { change } from "../../features/loader/loaderSlice";
import { setIncomeAndExpence } from "../../features/IncomeAndExpences/IncomeAndExpences";
import { IncomeAndExpencespayload } from "../../reducers/incAndExpReducer";
import { responceObj } from "../../../models/responce";
import { actionPayload } from "../../payload/payloadModel";
import { changeIncomeAndExpenceByMonth } from '../data/IncomeAndExpence';
import { createBrowserRouter } from 'react-router-dom';

export const UpdateUSer = async (type: string, data: any) => {
  try {
    let payload: load = { type: "", data: "" };
    payload = {
      type: "name",
      data: data,
    };
    store.dispatch(userUpdate(payload));
  } catch (err: any) {
    toast.error(err.message);
  }
};

export const initialiseUserData = async () => {
  try {

    store.dispatch(change());
    const { auth } = store.getState();
    const { token, istoken } = auth;
    if (!istoken) {
      checkUserLogin();
    } else {

      const { data } = await getUserData(token);

      if (data.code === 200) {
        store.dispatch(initilise(data.user));
        store.dispatch(initliseBank(data.bank));
        const d = new Date()
        const month = d.getMonth() + 1;
        changeIncomeAndExpenceByMonth(month)
      } else {
        throw new Error(data?.message);
      }
    }
  } catch (err: any) {
    console.log(err.message)
    toast.error("an error occured please try again or refresh ");
  }
  store.dispatch(change());
};

export const updateImage = async (image: any) => {
  try {
    store.dispatch(change());
    const { auth } = store.getState();
    const { token } = auth;
    const { data } = await updateProfileImage(image, token);
    toast.success("image updated sucessfully");
    const pay: load = {
      type: "image",
      data: data?.image,
    };
    store.dispatch(userUpdate(pay));
    store.dispatch(change());
  } catch (err: any) {
    toast.error("an error occured please try again");
  }
};


export const checkUserLogin = async () => {
  try {


    const { auth } = store.getState()

    const { istoken } = auth
    if (istoken) {
      const { token } = auth
      const { data } = await verifyLogin(token);
      let res: responceObj = data

      if (res.code === 200) {
        toast.success('login sucessfull')
        const payload: actionPayload = {
          type: '',
          data: <tokenSchema>{ token: token, istoken: true }
        }
        store.dispatch(saveToken(payload))
        initialiseUserData()
      } else {
        verifyBySessionId()
      }
    } else {
      verifyBySessionId()
    }
  } catch (err: any) {
    console.log(err.message)
    toast.error('an error occured')
  }

}

async function verifyBySessionId() {
  try {

    let token: any = sessionStorage.getItem('token')
    token = JSON.parse(token);
    const { data } = await verifyLogin(token);
    const res: responceObj = data
    if (res.code !== 200) {
      toast.info('please login ')
      window.location.href = `${window.location.protocol}//${window.location.host}/login`
    } else {
      toast.success('login sucessfully ')
      const payload: actionPayload = {
        type: '',
        data: <tokenSchema>{ token: token, istoken: true }
      }
      store.dispatch(saveToken(payload))
      initialiseUserData()
    }
  }
  catch (err: any) {
    console.log(err.message);
    toast.error('an error occured ')
    window.location.href = `${window.location.protocol}//${window.location.host}/login`


  }
}