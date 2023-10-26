import { toast } from "react-toastify";
import {
  addExpences,
  deleteExpenceByToken,
  getExpencesbyToken,
  getIncomeByToken,
} from "../../../api/dataServices";
import { store } from "../../app/store";
import {
  incomeAndExpencesObjectSchema,
  setIncomeAndExpence,
} from "../../features/IncomeAndExpences/IncomeAndExpences";
import { change } from "../../features/loader/loaderSlice";
import { IncomeAndExpencespayload } from "../../reducers/incAndExpReducer";

export const getIncome = async () => {
  const { auth, incomeAndExpence } = store.getState();
  if (!incomeAndExpence.isIncome) {
    store.dispatch(change());

    if (!auth.istoken) {
      toast.error("an error occured please refresh to continue ");
      store.dispatch(change());
    } else {
      const { data } = await getIncomeByToken(auth.token);
      if (data?.code !== 200) {
        toast.error("an error occured please refresh to continue ");
        store.dispatch(change());
      } else {
        const payload: IncomeAndExpencespayload = {
          type: "income",
          data: data.income,
        };
        store.dispatch(setIncomeAndExpence(payload));
        store.dispatch(change());
      }
    }
  }
};
