import { toast } from 'react-toastify';
import { ICREATE_PURCHASE_ORDER_PRODUCT } from '../../model/model';



export default function removeIndexFromArray(array: any[], index: number): ICREATE_PURCHASE_ORDER_PRODUCT[] {

    let newArray: ICREATE_PURCHASE_ORDER_PRODUCT[] = [];

    array.map((value: ICREATE_PURCHASE_ORDER_PRODUCT, i: number) => {
        if (i === index) {

        } else return newArray.push(value);
    })


    return newArray;

}