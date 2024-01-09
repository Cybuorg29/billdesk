import { ProductObj } from './../../../models/inventory/productModel';
import { PayloadAction } from "@reduxjs/toolkit";
import { productArray } from "../../../models/inventory/productModel";
import { actionPayload } from "../../payload/payloadModel";
import { toast } from 'react-toastify';






interface array {
    product: ProductObj[]
}
export const ProductOperations = {
    set: "set",
    delete: "delete",
    push: "push"
}
export const stockOperation = {
    add: 'add',
    delete: 'delete'
}


export const changeProduct = (state: productArray, action: PayloadAction<actionPayload>) => {
    const data = action.payload.data;
    const type = action.payload.type;
    console.log('new product', data)
    switch (type) {
        case ProductOperations.set:
            console.log('in set');
            state.products = data
            state.isProducts = true
            break;
        case ProductOperations.delete:
            // state.products = state.products.filter((index: ProductObj) => index._id !== data);
            let array: any[] = [];
            state.products.map((index: ProductObj) =>
                (index._id != data) ? array.push(index) : null
            )
            state.products = array;
            break;
        case ProductOperations.push:
            state.products.push(data)
            break
        default:
            break;
    }

}

export const changeStock = (state: productArray, action: PayloadAction<actionPayload>) => {
    const data = action.payload.data;
    const type = action.payload.type;
    let i = 0;
    switch (type) {
        case stockOperation.delete:
            switch (type) {
                case stockOperation.delete:
                    state.products.map((index: any, j: number) => {
                        if (index._id === data?._id) i = j;
                    })

                    state.products[i].rate = data?.rate;
                    state.products[i].stock = state.products[i].stock + parseFloat(data?.stock);
                    break;

                case stockOperation.add:
                    toast('start')
                    state.products.map((index: any, j: number) => {
                        if (index._id === data?._id) {
                            toast('found')

                        }
                        state.products[i].rate = data?.rate;
                        state.products[i].stock = state.products[i].stock + parseFloat(data?.stock)
                    })
                    break;
            }

    }
}