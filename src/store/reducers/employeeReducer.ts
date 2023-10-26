import { PayloadAction } from "@reduxjs/toolkit";
import { employeeArray, employeeObject } from "../features/employee/employeeSlice";
import { actionPayload } from "../payload/payloadModel";



const  operatons =  {
     set:"set",
     add:'add',
     delete:'delete'
}

export const  initEmployee=(state:employeeArray,action:PayloadAction<actionPayload>)=>{
    const type = action.payload.type;
    const data = action.payload.data;
    switch (type) {
        case operatons.set:
             state.employee = data;
             state.isEmployee = true;
            break;
        case operatons.add:
               state.employee.push(data)
            break;
            case operatons.delete:
              const newArray:any[] = []
                 state.employee.map((index:any)=>{
                      if(index._id===data){

                      }else{
                         newArray.push(index)
                      }
                })
                console.log('newArray',newArray)
                state.employee = newArray
            break;

        default:
            break;
    }
}