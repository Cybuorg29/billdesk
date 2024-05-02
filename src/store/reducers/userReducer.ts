import { PayloadAction } from "@reduxjs/toolkit";
import { userDetailSchema } from "../../models/userModel";



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
  state.adress = action.payload.adress;
  state.pincode = action.payload.pincode;
  state.activities = action.payload.activities;
  state.image = action.payload.image;
  state._id = action.payload._id
  state.state = action.payload.state

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
