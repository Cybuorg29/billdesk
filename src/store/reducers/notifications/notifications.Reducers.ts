import { PayloadAction } from "@reduxjs/toolkit";
import { actionPayload } from "../../payload/payloadModel";
import { notificationsTypes } from "./const.type";
import { notificationModel } from "./notification.model";
import { Inotifications } from "../../features/notifications/notificationsSlice";




export const changeNotifications = (state:Inotifications, action: PayloadAction<actionPayload>) => {
    const data = action.payload.data;
    const type = action.payload.type;
    switch (type) {
        case notificationsTypes.set:
            state.notification = action.payload.data
            break;
        case notificationsTypes.delete:
            const newArray = [];
            state.notification.map((index: notificationModel) => {
                if (index._id === data) {

                } else {
                    newArray.push(data);
                }
            })
            break;
          default:
            break;
    }

}