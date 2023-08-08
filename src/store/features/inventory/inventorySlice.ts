import { changeProduct } from './../../reducers/inventory/index';
import { createSlice } from '@reduxjs/toolkit';
import { ProductObj, productArray } from './../../../models/inventory/productModel';
import { RootState } from '../../app/store';




const  initialState:productArray={
    products:[],
    isProducts:false
}
 
export  const productSlice= createSlice({
    name:'products',
    initialState,
    reducers:{
        setProducts:changeProduct
    }
})

export const {setProducts} =  productSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default productSlice.reducer