import { toast } from "react-toastify";
import {
  addExpences,
  deleteExpenceByToken,
  editExpenceByObject,
} from "../../../../api/dataServices";
import { store } from "../../../app/store";
import {
  incomeAndExpencesObjectSchema,
  setIncomeAndExpence,
} from "../../../features/IncomeAndExpences/IncomeAndExpences";
import { change } from "../../../features/loader/loaderSlice";
import { IncomeAndExpencespayload } from "../../../reducers/incAndExpReducer";
import { actionPayload } from "../../../payload/payloadModel";

export const deleteExpence = async (uid: string) => {
  try {
    store.dispatch(change());
    const { auth, incomeAndExpence } = store.getState();

    const { token, istoken } = auth;
    if (!istoken) {
      toast.error("an error occured please refresh");
      store.dispatch(change());
    } else {
      const { data } = await deleteExpenceByToken(token, uid);
      if (data.code !== 200) {
        toast.error(data.message);
        store.dispatch(change());
      } else {
        toast.success(data.message);
        const { expences } = incomeAndExpence;
        const newArray: any[] = [];
        expences.map((index: any) => {
          if (index._id === uid) {
          } else {
            newArray.push(index);
          }
        });
        const payload: IncomeAndExpencespayload = {
          type: "expences",
          data: newArray,
        };
        store.dispatch(setIncomeAndExpence(payload));
        store.dispatch(change());
      }
    }
  } catch (err: any) {
    toast.error(err.message);
  }
};

// export const getExpences = async () => {
//   const { auth, incomeAndExpence } = store.getState();
//   if (!incomeAndExpence.isExpences) {
//     store.dispatch(change());
//     if (!auth.istoken) {
//       toast.error("an error occured please refresh to continue");
//       store.dispatch(change());
//     } else {
//       const { data } = await getExpencesbyToken(auth.token);
//       if (data?.code !== 200) {
//         toast.error("an error occured please refresh the page ");
//         store.dispatch(change());
//       } else {
//         const payload: IncomeAndExpencespayload = {
//           type: "expences",
//           data: data?.expences,
//         };
//         store.dispatch(setIncomeAndExpence(payload));
//         store.dispatch(change());
//       }
//     }
//   }
// };

export const addExpence = async (Expence: any) => {
  try {
    store.dispatch(change());
      const {token,istoken} = store.getState().auth
      if(!istoken) throw new Error('an error occured');
    const { data } = await addExpences(Expence,token);
    if (data?.code != 200) {
      toast.error(data?.message);
      store.dispatch(change());
    } else {
      toast.success("expence added sucessfully");
      const { incomeAndExpence } = store.getState();
      let { expences } = incomeAndExpence;
      let newExpence = [Expence, ...expences];
      const payload: IncomeAndExpencespayload = {
        type: "expences",
        data: newExpence,
      };
      store.dispatch(setIncomeAndExpence(payload));
      store.dispatch(change());
    }
  } catch (err: any) {
    console.log(err?.error)
    toast.error(err.message);
     store.dispatch(change())
  }
};

export const editExpence = async (obj: any) => {
  try {
    store.dispatch(change());
    const { data } = await editExpenceByObject(obj);
    if (data?.code !== 200) {
      toast.error(data?.message);
      store.dispatch(change());
    } else {
      const { incomeAndExpence } = store.getState();
      const { expences } = incomeAndExpence;
      const newArray = expences.map((index: any) => {
        if (index._id === data?.obj?._id) {
          const dat = { ...index };
          dat.title = obj?.title;
          dat.amount = obj?.amount;
          dat.category = obj?.category;
          return dat;
        } else {
          return index;
        }
      });
      const payload: IncomeAndExpencespayload = {
        data: newArray,
        type: "expences",
      };
      store.dispatch(setIncomeAndExpence(payload));
      store.dispatch(change());
      toast.success(data?.message);
    }
  } catch (err: any) {
    toast.error("an error occured please tru again");
    console.log(err);
  }
};
