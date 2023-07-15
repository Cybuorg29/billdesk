import { PayloadAction } from "@reduxjs/toolkit";
import { employeeArray, employeeObject } from "../features/employee/employeeSlice";

export interface actionPayload{
    type:string,
    data:any
}

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
              const newArray =    state.employee.map((index:any)=>{
                      if(index._id===data){
                        
                      }else{
                        return index
                      }
                })
                state.employee = newArray
            break;

        default:
            break;
    }
}