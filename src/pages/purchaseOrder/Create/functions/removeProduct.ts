import { toast } from 'react-toastify';
import { ICREATE_PURCHASE_ORDER_PRODUCT } from '../../model/model';



export default function removeProduct(array: ICREATE_PURCHASE_ORDER_PRODUCT[], index: number): ICREATE_PURCHASE_ORDER_PRODUCT[] {

    let newArray: ICREATE_PURCHASE_ORDER_PRODUCT[] = [];

    array.map((value: ICREATE_PURCHASE_ORDER_PRODUCT, i: number) => {
        if (i === index) {
            toast('remove')
        } else {
            return newArray.push(value);
        }
    })



    return newArray;

}