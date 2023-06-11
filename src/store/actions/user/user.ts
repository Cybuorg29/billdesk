import { AppDispatch } from './../../app/store';
import { useAppDispatch } from "../../app/hooks"
import { NAME } from './constants/constants';

const dispach = useAppDispatch()

export const changeValue=(type:any,value:any)=>async()=>{
    switch(type){
        case 'name':
            // return dispach({ty})
    }

}