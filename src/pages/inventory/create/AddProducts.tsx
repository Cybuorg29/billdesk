import React, { useId, useState } from 'react'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import { Dialog, DialogActions, DialogContent, DialogTitle, Input, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { ProductObj, createProductObj } from '../../../models/inventory/productModel'
import Inputs from './components/Inputs'
import { toast } from 'react-toastify'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { createProduct } from '../../../store/actions/products/create/createProduct'
import TaxDialog from './components/TaxDialog'
import SpecDialog from './components/SpecDialog'
import UnitSelect from './StatesAndFuncs/Unit'

type Props = {}

const AddProducts = (props: Props) => {
  const [product, setProduct]: any = useState<createProductObj>({  // basic array stores values of of product data 
    name: '',
    category: 'Finished Goods',
    code: '',
    description: '',
    image: '',
    limit: 0,
    rate: 0,
    unit: 0,
    stock: 0,
    tax: [],
    specifications: [],
    weight:0
  })
  const [dialog, setDialog] = useState<boolean>(false)  // used to open and change state of dialogs
  const [pushTax, setPushTax]: any = useState({
    type: '',
    amount: 0
  })  //dummy valiable which stores values inserted in tax dailog and transfered to main array when handleTaxOperations is called 

  const [isAddSpec, setIsAddSpec] = useState<boolean>(false);


  //keys 
  const specDialogKey = useId();

  const key = Object.keys(product)  //creates a array of all keys of the product object 


  //  handle input insert operations
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

  // handles taxInsert operations 
  //working : "Delete" : if operation is delete the the the the required values is taken from the value object and the using an new array a map function is callled
  //  if the value is not matched only then the index is pushed to the new array ;
  //  Add : first the checking is done if any of the feild is empty then the value object is pushed to the main array ;
  const handleTaxOperations = (opration: 'push' | 'delete', value?: { type: string, amount: any }) => {
    if (opration === 'delete') {
      const newArray: any = []

      product.tax.map((index: { type: string, amount: any }) => {
         
        if (index.type === value?.type && index.amount === value.amount) { }
        else {
          newArray.push(index)
        }
        
        return
      })
      setProduct((prev: createProductObj) => { return { ...prev, tax: newArray } })
      
      
      
    } else {
      
      
      const amount = parseFloat(pushTax.amount)
      // check if the input details are not empty ;
      if (pushTax?.type === '') toast.error('Please Select the Tax Type')
      else if (pushTax?.amount <= 0) {
        toast.error('Cannot add Tax with value 0 ')
      } else {
        const type = pushTax.type

        const oldArray = product.tax;
        const newArray = [...oldArray, { type: type, amount: amount }];
        setProduct((prev: createProductObj) => { return { ...prev, tax: newArray } })
        setPushTax({ type: '', amount: 0 });
        setDialog(false)
      }
    }

  }
  const unitProp = {
    value:product.unit,
    Set:(value:string)=>{setProduct((prev:createProductObj)=>{return{...prev,unit:value}})}
  }

  return (
    <>
      {/* tax dialog for tax inputs  */}
      <TaxDialog dialog={dialog} handleTaxOperations={(opertaion: "push" | "delete") => { handleTaxOperations(opertaion) }} pushTax={pushTax} setDialog={() => { setDialog(false) }} setPushTax={(name: string, value: any) => setPushTax((prev: any) => { return { ...prev, [name]: value } })} key={'asdas'} />
      <SpecDialog isAddSpec={isAddSpec} 
        setIsAddSpec={() => { setIsAddSpec(false) }} push={(val:{type:string,value:string}) => { handleSpecOperations('push', val) }} key={specDialogKey}
      />
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
              <input id='image' type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setProduct((prev: any) => { return { ...prev, image: e.target.files?.[0] } });}} className='file:rounded-l-xl file:border-0 file:bg-gray-700 file:text-white' />
            </div>
            {
              // creates a object of the prooduct array and then return a input element for each of the inputs 
              key.map((index: any) => {
                // image category tax and specification will have their custom components thus their inputs are not required
                if (index === 'image' || index === 'category' || index === 'tax' || index === 'specifications'||index==='unit') {

                } else {

                  {/* returns input elements  */ }
                  return <>
                    <Inputs name={index} onchange={(e: React.ChangeEvent<HTMLInputElement>) => { handleInputChange(e) }} value={product[index]} type={typeof product[index]} />

                  </>
                }
              })
            }
              <div>
              
                <UnitSelect unit={unitProp} />
              </div>

            <div className='h-fit place-items-center'>
              {/* category input element  */}
              <div>Category</div>
              <Select className='w-full ' name='category' value={product?.category} onChange={(e: any) => { handleInputChange(e) }}  >
                <MenuItem value={'Raw Material'}   >Raw Material </MenuItem>      <div>

                </div>
                <MenuItem value={'Finished Goods'} >Finished Product</MenuItem>``
              </Select>
            </div>
            {/* tax */}
            <section className='grid gap-5' >
              <div className=' flex gap-5'>
                {
                  product.tax.map((index: any) => {
                    return <>
                      <div className='flex items-center gap-3  border rounded-lg p-2' >
                        <div>{index.type}</div>
                        <div>{index.amount}{'%'}</div>
                        <div className='text-gray-700 cursor-pointer ' onClick={() => { handleTaxOperations('delete', index) }} > X</div>
                      </div>
                    </>
                  })
                }
                <div className='flex place-items-center'>
                  <SolidButton color='error' innerText='Add Tax' onClick={() => { setDialog(true) }} key={'asd'} />
                </div>
              </div>
            </section>




          </form>
          <section className='grid gap-5 ' >
            <div className='flex gap-5'>
              {product.specifications.map((index: any) => {
                return <>
               <>
                      <div className='flex items-center gap-3  border rounded-lg p-2' >
                        <div>{index?.type}</div>
                        <div>{index?.value}</div>
                        <div className='text-gray-700 cursor-pointer ' onClick={() => { handleSpecOperations('delete', index) }} > X</div>
                      </div>
                    </>
                </>
              })}
              <div>

                <SolidButton color='primary' innerText='Add Specifications' onClick={() => { setIsAddSpec(true) }} key={'asd'} />
              </div>
            </div>

          </section>
          <div>
            <SolidButton color='black' innerText='Add Product' onClick={() => { createProduct(product) }} />
          </div>
        </div>



      </div>
    </>

  )

  // function to push specifications  to the main array ;
  function handleSpecOperations(operation: 'delete' | 'push', value: { type: string, value: string }) {
    if (operation === 'delete') {
      const newArray: any = []

      product.specifications.map((index: { type: string, value: any }) => {

        if (index.type === value?.type && index.value === value.value) { }
        else {
          newArray.push(index)
        }

        return
      })
      setProduct((prev: createProductObj) => { return { ...prev, specifications: newArray } })



    } else {


      if ( value?.type === '' ||  value.value === '') toast.error('unfilled Specifications ')
      else {
        const oldArray = product.specifications;
        const newArray = [...oldArray, { type: value.type, value:value.value }];
        setProduct((prev: createProductObj) => { return { ...prev, specifications: newArray } })
        setIsAddSpec(false)
      }
    }
  }

}



export default AddProducts