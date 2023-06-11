import { PayloadAction } from "@reduxjs/toolkit";
import { userDetailSchema } from "../../models/userModel";
import { ACTIVITIES, BUILDING, CITY, DISTRICT, EMAIL, GSTIN, NAME, PHONE, STATE } from "../actions/user/constants/constants";




 export const InitialiseData=(state:userDetailSchema,action:PayloadAction<userDetailSchema>)=>{
       console.log(action.payload)
       state.name = action.payload.name
       state.gstin = action.payload.gstin
       state.phone = action.payload.phone
       state.email = action.payload.email
       state.building =action.payload.building
       state.city = action.payload.city;
       state.district = action.payload.district
       state.state = action.payload.state
       state.pincode = action.payload.pincode
       state.activities = action.payload.activities

}



export const setValue=(state:userDetailSchema,action:PayloadAction<any>)=>{
      console.log(action.type)
      console.log(action.payload)

      switch(action.type){
            case 'name':
                   console.log('kfjgjgfj')
                return {...state,name:action.payload}
              break;
              case  GSTIN:
                  state.gstin = action.payload
                break;
                case PHONE:
                  state.phone = action.payload
              break;
              case EMAIL:
                  state.email = action.payload
                break;
                case  BUILDING:
                  state.building = action.payload
              break;
              case CITY:
                  state.city = action.payload
                break;
                case  DISTRICT:
                  state.district = action.payload
              break;
              case STATE:
                  state.state = action.payload
                break;
                case ACTIVITIES :
                  state.activities = action.payload
              break;
            //   case 'benName':
            //       state = action.payload
            //     break;
            //     case 'branch':
            //       state = action.payload
            //       break;
            //       case 'isfc':
            //             state = action.payload
            //         break;
            //         case 'no':
            //             state = action.payload
            //           break;
            //           case 'bank':
            //             state = action.payload
            //             break;
                         

}
}

