import React, { useState } from 'react'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import { Dialog, DialogActions, DialogContent, DialogTitle, Input, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { ProductObj, createProductObj } from '../../../models/inventory/productModel'
import Inputs from './components/Inputs'
import { toast } from 'react-toastify'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { createProduct } from '../../../store/actions/products/create/createProduct'
import TaxDialog from './components/TaxDialog'

type Props = {}

const AddProducts = (props: Props) => {
  const [product, setProduct]: any = useState<createProductObj>({
    name: '',
    category: 'Finished Goods',
    code: '',
    description: '',
    image: '',
    limit: 0,
    rate: 0,
    stock: 0,
    tax: []
  })
  const [dialog, setDialog] = useState<boolean>(false)
  const [pushTax, setPushTax]: any = useState({
    type: '',
    amount: 0
  })
  const key = Object.keys(product)



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'tax') {
      const oldArray = product.tax;
      const newArray = [...oldArray, value];
      setProduct((prev: createProductObj) => { return { ...prev, tax: newArray } })
    }


    setProduct((prev: createProductObj) => { return { ...prev, [name]: value } })
  }

  const handleTaxOperations = (opration: 'push' | 'delete', value?:{type:string,amount:any}) => {
    if (opration === 'delete') {
       const newArray:any = []
      
      product.tax.map((index:{type:string,amount:any})=>{
         
         if(index.type===value?.type&&index.amount===value.amount){}
         else{
          newArray.push(index)
         }

         return
        })
        setProduct((prev: createProductObj) => { return { ...prev, tax: newArray } })

      

    } else {


      const amount = parseFloat(pushTax.amount)
      if (pushTax?.type === '') toast.error('Please Select the Tax Type')
      else if (pushTax?.amount === 0) {
        toast.error('Cannot add Tax with value 0 ')
      }else {
           const type = pushTax.type

        const oldArray = product.tax;
        const newArray = [...oldArray, {type:type,amount:amount}];
        setProduct((prev: createProductObj) => { return { ...prev, tax: newArray } })
         setPushTax({type:'',amount:0});
         setDialog(false)
      }
    }

  }




  return (
    <>
      <TaxDialog dialog={dialog} handleTaxOperations={(opertaion: "push" | "delete") => { handleTaxOperations(opertaion) }} pushTax={pushTax} setDialog={() => { setDialog(false) }} setPushTax={(name:string,value:any) => setPushTax((prev:any)=>{return{...prev,[name]:value}})} key={'asdas'} />
      <div className='h-full w-full overflow-auto  p-5'  >


        {/* top section // heading  */}
        <div className='h-[15%] grid place-content-between ' >
          <PageHeading name='Add Product' key={'Add Product'} />
          <div className='flex items-center' >
          </div>
        </div>

        {/* form */}
        <div className='bg-component p-5 w-full rounded-xl ' >

          <form className=' grid lg:grid-cols-3 gap-5 p-5'>
            <div className='grid  cursor-pointer ' >
              <label htmlFor='image'>Image</label>
              <input id='image' type='file' onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setProduct((prev:any)=>{return{...prev,image:e.target.files?.[0]}});console.log(e.target.files?.[0])}} className='file:rounded-l-xl file:border-0 file:bg-gray-700 file:text-white' />

            </div>            {
              key.map((index: any) => {
                if (index === 'image' || index === 'category' || index === 'tax') {

                } else {

                  return <>
                    <Inputs name={index} onchange={(e: React.ChangeEvent<HTMLInputElement>) => { handleInputChange(e) }} value={product[index]} type={typeof product[index]} />

                  </>
                }
              })
            }
            <div className='h-fit place-items-center'>
              <div>Category</div>
              <Select className='w-full ' name='category' value={product?.category} onChange={(e: any) => { handleInputChange(e) }}  >
                <MenuItem value={'Raw Material'}   >Raw Material </MenuItem>      <div>

                </div>
                <MenuItem value={'Finished Goods'} >Finished Product</MenuItem>``
              </Select>
            </div>
            <div>

            </div>
            <div className='grid gap-5' >
              <div className=' flex gap-5'>
                {
                  product.tax.map((index: any) => {
                    return <>
                      <div className='flex items-center gap-3  border rounded-lg p-2' >
                        <div>{index.type}</div>
                        <div>{index.amount}</div>
                        <div className='text-gray-700 cursor-pointer '  onClick={()=>{handleTaxOperations('delete',index)}} > X</div>
                      </div>
                    </>
                  })
                }
                <div className='flex place-items-center'>
                  <SolidButton color='error' innerText='Add Tax' onClick={() => { setDialog(true) }} key={'asd'} />
                </div>
              </div>
            </div>




          </form>
          <div>
            <SolidButton color='black' innerText='Add Product' onClick={() => { createProduct(product) }} />
          </div>
        </div>



      </div>
    </>

  )

}



export default AddProducts