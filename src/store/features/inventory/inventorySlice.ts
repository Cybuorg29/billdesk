import { createSlice } from '@reduxjs/toolkit';
import { ProductObj } from './../../../models/inventory/productModel';
import { RootState } from '../../app/store';



interface productArray{
    Product:ProductObj[]
}

const  initialState:productArray={
    Product:[] 
}
 
export   const productSlice= createSlice({
    name:'product',
    initialState,
    reducers:{}
})

export const {} =  productSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default productSlice.reducer