import { PayloadAction } from "@reduxjs/toolkit";
import { userDetailSchema } from "../../models/userModel";

import { toast } from "react-toastify";
import { store } from "../app/store";
import { getUserData } from "../../api/userServices";

export interface load {
  type: string;
  data: any;
}

export const InitialiseData = (
  state: userDetailSchema,
  action: PayloadAction<userDetailSchema>
) => {
  state.name = action.payload.name;
  state.gstin = action.payload.gstin;
  state.phone = action.payload.phone;
  state.email = action.payload.email;
  state.building = action.payload.building;
  state.city = action.payload.city;
  state.district = action.payload.district;
  state.state = action.payload.state;
  state.pincode = action.payload.pincode;
  state.activities = action.payload.activities;
  state.image = action.payload.image;
  state._id = action.payload._id
};

export const updateUser = (
  state: userDetailSchema,
  action: PayloadAction<load>
) => {
  // takes 2 arguments  type and data in action object type carries the type of action and data carries the data
  const type = action.payload.type;
  const data = action.payload.data;

  switch (type) {
    case "name":
      state.name = data;
      break;
    case "image":
      state.image = data;
      state.name = "asdasda";
      break;
  }
};

// export const setData=(state:userDetailSchema,action:PayloadAction<load>)=>{
//   toast.success(action.payload.data.name)

// }

// export const updateA = createAsyncThunk('user/getdata',async()=>{
//   toast.success('in')
//      const {auth} = store.getState()
//       const {token} = auth
//       const user = await getUserData(token)
//

// })
