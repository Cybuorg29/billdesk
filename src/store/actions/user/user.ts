import { toast } from "react-toastify";
import { store } from "../../app/store";
import { initilise, userUpdate } from "../../features/user/userSlice";
import { load } from "../../reducers/userReducer";
import { getUserData, updateProfileImage } from "../../../api/userServices";
import { initliseBank } from "../../features/bank/bankSlice";
import { change } from "../../features/loader/loaderSlice";
import { setIncomeAndExpence } from "../../features/IncomeAndExpences/IncomeAndExpences";
import { IncomeAndExpencespayload } from "../../reducers/incAndExpReducer";

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
    toast.success("in initlise");
    store.dispatch(change());
    const { auth } = store.getState();
    const { token } = auth;

    const { data } = await getUserData(token);

    if (data.code === 200) {
      store.dispatch(initilise(data.user));
      store.dispatch(initliseBank(data.bank));
      let totalIncome = 0;
      let totalExpences = 0;
    

      let expence = data?.expences;
      expence = expence.reverse();
       const d = new Date()
        const month = d.getMonth() +1
       

      const Payload: IncomeAndExpencespayload = {
        type: "initlise",
        data: {
   
          expences: data?.expences,
          income: data?.income.reverse(),
          month:month
        },
      };

      store.dispatch(setIncomeAndExpence(Payload));
    } else {
      throw new Error(data?.message);
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
