import { toast } from 'react-toastify';



export default function removeIndex(array: any[], index: number): any[] {

    let newArray: any[] = [];

    array.map((value: any, i: number) => {
        if (i === index) {

        } else return newArray.push(value);
    })


    return newArray;

}