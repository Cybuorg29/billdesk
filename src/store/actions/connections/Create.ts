import { toast } from "react-toastify";
import { clientModelObj } from "../../../models/Client/ClientModel";
import { bankDetails } from "../../../models/userModel";
import { store } from "../../app/store";
import { change } from "../../features/loader/loaderSlice";
import { postConnection } from "../../../api/connections/ConnectionServices";
import { responceObj } from "../../../models/responce";
import { actionPayload } from "../../payload/payloadModel";
import { ConnectionsActionObj } from "../../reducers/connections/connectionReducers";
import { setConnections } from "../../features/Connections/ConnectionsSlide";


export const createConnection = async (generalInfo: clientModelObj, bankInfo: bankDetails) => {
  try {
    store.dispatch(change());
    const { auth, userData } = store.getState();
    const { token } = auth;
    const { _id } = userData

    const { data } = await postConnection(generalInfo, bankInfo, _id);
    const res: responceObj = data;
    toast.info(res.message);
    (res.code === 200) ? sucess(res.package?.generalInfo, res.package?.bankinfo) : (res.code === 400) ? foundId(res) : failure(res)
  } catch (err: any) {
    console.log(err.message);
    toast.error('an error occured please try again')
    store.dispatch(change())
  }
}



async function sucess(generalInfo: any, bankInfo: any) {
  const type = generalInfo?.type;
  const payload: actionPayload = {
    type: ConnectionsActionObj.addClient,
    data: {
      generalInfo, bankInfo, type: type
    }
  }
  store.dispatch(setConnections(payload))
  store.dispatch(change())

}

function failure(res: responceObj) {
  if (res.code !== 200) {

    console.log(res?.error)
    toast.error(res.message);
    store.dispatch(change())
  }



}

async function foundId(res: responceObj) {
  if (res.code === 400) {
    toast.error(res.message);
    window.location.pathname = `/view/profile/${res.error}`
  }
  store.dispatch(change())
}