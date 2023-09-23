import { MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../../store/app/hooks'
import { EmployeeData } from '../../../../../store/actions/data/employee/get'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../../../../../store/actions/products'

type Props = {value:string,handleChange:any}

const ProductList = ({handleChange,value}: Props) => {
     const {isProducts,products} = useAppSelector(state=>state.product);
      const naviagate = useNavigate()

     useEffect(() => {
           EmployeeData()
     }, [products])

     useEffect(() => {
         if(!isProducts){
            getProducts()
         }
     }, [isProducts])

     const [val,setVal] = useState('')


     
     

  return (
    <div  className='grid gap-3'>
          <label>Select Product</label>
        <Select className=''  value={value}  onChange={(e:any)=>{handleChange(e.target.value)}} >
            {
                products.map((index:any)=>{
                    return(
                          <MenuItem   value={`${index?._id}`} >{index?.name}</MenuItem>
                    )
                })

            }
            <MenuItem  onClick={()=>{naviagate(`/create/product`)}} className='bg-slate-100'   ><div  className='text-blue-600 text-center w-full border' >Add Product</div></MenuItem>
        </Select>
    </div>
  )
}

export default ProductList