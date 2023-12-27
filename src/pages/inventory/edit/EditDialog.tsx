import React, { useEffect, useId, useState } from 'react'
import { ProductObj, createProductObj } from '../../../models/inventory/productModel'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import Inputs from '../create/components/Inputs'
import TaxDialog from '../create/components/TaxDialog'
import { toast } from 'react-toastify'
import SpecDialog from '../create/components/SpecDialog'
import UnitSelect from '../create/StatesAndFuncs/Unit'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { updateProduct } from '../../../store/actions/products/update/updateProduct'

type Props = { data: createProductObj, scale: boolean, close: any }

const EditDialog = ({ close, data, scale }: Props) => {
  const [product, setProduct]: any = useState<createProductObj>();
  const [productKeys, setProductKeys]: any = useState<string[]>([]);
  const [taxDialogScale, setTaxDialogScale] = useState<boolean>(false)
  const [pushTax, setPushTax] = useState<any>({
    type: '',
    amount: 0
  })
  const [isAddSpec, setIsAddSpec] = useState<boolean>(false);
  const unitProp = {
    value: product?.unit,
    Set: (value: string) => { setProduct((prev: createProductObj) => { return { ...prev, unit: value } }) }
  }


  useEffect(() => {
    if (!data) {

    } else {
      setProductKeys(Object.keys(data));
      setProduct(data);
    }
  }, [data])
  const updateButtonKey = useId();
  const cancelButtonKey = useId();



  const handleTaxOperations = (opration: 'push' | 'delete', value?: { type: string, amount: any }) => {
    if (opration === 'delete') {
      const newArray: any = []
      product.tax.map((index: { type: string, amount: any }) => {
        if (index.type === value?.type && index.amount === value?.amount) {
        }
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
        setTaxDialogScale(false)
      }
    }

  }

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


      if (value?.type === '' || value.value === '') toast.error('unfilled Specifications ')
      else {
        const oldArray = product.specifications;
        const newArray = [...oldArray, { type: value.type, value: value.value }];
        setProduct((prev: createProductObj) => { return { ...prev, specifications: newArray } })
        setIsAddSpec(false)
      }
    }
  }

  return (
    <Dialog open={scale} fullScreen>
      <TaxDialog dialog={taxDialogScale} handleTaxOperations={(opertaion: 'delete' | 'push') => handleTaxOperations(opertaion)} pushTax={pushTax} setDialog={() => setTaxDialogScale(false)} setPushTax={(name: string, value: any) => setPushTax((prev: any) => { return { ...prev, [name]: value } })} />
      <SpecDialog isAddSpec={isAddSpec}
        setIsAddSpec={() => { setIsAddSpec(false) }} push={(val: { type: string, value: string }) => { handleSpecOperations('push', val) }} key={''}
      />
      <DialogTitle>
        <div className='flex place-content-between'>
          <div>Edit Product</div>
          <div></div>
          <div className='cursor-pointer' onClick={() => { close() }} >X</div>

        </div>
      </DialogTitle>


      <DialogContent>
        <div className='h-[15rem] w-[15rem] border-2 m-2 '>
          <img src={product?.image} title='product' />

        </div>
        <div className=' grid grid-cols-2 gap-x-3 gap-y-2 ' >
          {
            productKeys.map((index: string) => {
              if (index === 'image' || index === '_id' || index === 'tax' || index === 'specifications' || index === '__v' || index == 'id' || index === 'createdAt' || index === 'updatedAt' || index === 'unit') return
              return <>
                <Inputs name={index} onchange={(e: any) => { setProduct((prev: any) => { return { ...prev, [index]: e.target.value } }) }} type={typeof product[index]} value={product[index]} key={index} />
              </>
            })
          }
        </div>
        <div className='w-1/2'>
          <UnitSelect unit={unitProp} />
        </div>
        <div className='m-2 text-xl flex gap-3  items-center'>Tax<span className='text-sm flex items-end text-blue-600 cursor-pointer ' onClick={() => { setTaxDialogScale(true) }}>Add More</span></div>
        <div className=' w-1/2 gap-4 m-3'>
          {
            product?.tax.map((index: any) => {
              return <>
                <div className='flex w-full place-content-between items-center gap-3  border-b p-2' >
                  <div>{index?.type}</div>
                  <div>{index?.amount + "%"}</div>
                  <div className='text-gray-700 cursor-pointer ' onClick={() => { handleTaxOperations('delete', index) }} > X</div>
                </div>
              </>
            })
          }
          <div className='text-sm flex items-end  cursor-pointer text-center place-content-center px-1 py-2 bg-white border border-blue-500 text-black hover:bg-blue-600 hover:text-white ' onClick={() => { setTaxDialogScale(true) }}>Add Tax</div>


        </div>
        <div className='m-2 text-xl flex gap-3  items-center'>Specifications<span className='text-sm flex items-end text-blue-600 cursor-pointer ' onClick={() => { setIsAddSpec(true) }}>Add More</span></div>


        <div className=' w-1/2 gap-3'>

          {product?.specifications.map((index: any) => {
            return <>
              <>
                <div className='flex w-full place-content-between items-center gap-3  border-b p-2' >
                  <div>{index?.type}</div>
                  <div>{index?.value}</div>
                  <div className='text-gray-700 cursor-pointer ' onClick={() => { handleSpecOperations('delete', index) }} > X</div>
                </div>
              </>
            </>
          })}
          <div className='text-sm flex items-end  cursor-pointer text-center place-content-center px-1 py-2 bg-white border border-blue-500 text-black hover:bg-blue-600 hover:text-white ' onClick={() => { setIsAddSpec(true) }}>Add Specifications</div>

        </div>
      </DialogContent>
      <DialogActions>
        <SolidButton color='black' innerText='Update' onClick={() => { updateProduct(product); close() }} key={updateButtonKey} />
        <SolidButton color='error' innerText='Cancel' onClick={() => { }} key={cancelButtonKey} />

      </DialogActions>
    </Dialog>
  )
}

export default EditDialog