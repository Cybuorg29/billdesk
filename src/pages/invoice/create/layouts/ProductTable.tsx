import React, { useEffect, useId, useState } from 'react'
import { IcreateInvoice } from '../../../../models/invoice'
import AddProductDialog from '../components/AddProductDialog'
import { IInvoiceProduct, ProductObj } from '../../../../models/inventory/productModel'
import { toast } from 'react-toastify'
import TableInputs from '../components/TableInputs'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'

type Props = { invoice: IcreateInvoice, setInvoice: any }
interface TableProps {
  value: any
  onChange: (e: any) => void
  type: any
}

const ProductTable = ({ invoice, setInvoice }: Props) => {
  const [selectProductOpen, setSelectProductOpen] = useState<boolean>(false);
  //keys 
  const addProductDialogKey = useId();


  //local components 




  //functions
  function calculateTaxAmount(rate: number, amount: number): number {
    return (rate / 100) * amount;
  }


  const handleQtyRateAndDiscountChange = (value: number, type: 'qty' | 'rate' | 'discount', i: number) => {
    let newArray = invoice.products;
    //  console.log('newArray',newArray[0].rate)

    let index = newArray[i];

    console.log('index', index)
    if (type === 'qty') {
      // add stock validator -- pending 
      index.qty = value;
    }
    if (type === 'rate') index.rate = value;
    if (type === 'discount') index.discount = value;
    index.amount = index.rate * index.qty;
    index.taxable_Value = index.amount - index.discount;
    let taxAmount: number = 0;
    index.tax.map((item: any) => {
      taxAmount = taxAmount + calculateTaxAmount(item.amount, index.amount)
    })
    index.total = taxAmount;
    // index.total = index.taxable_Value + 
    newArray[i] = index;
        const total =   calculateGrandTotal()

    setInvoice(() => { return { ...invoice, products: newArray,grand_Total:total } })
  }

  function removeProduct(num: number) {
    let newArray: any[] = [];
    invoice.products.map((index: any, i: number) => {
      if (num === i) {

      }
      else newArray.push(index)
    })
    console.log(newArray)

    setInvoice((prev: any) => { return { ...prev, products: newArray } });
  }

  function calculateGrandTotal() {
    let total = 0;
    invoice.products.map((index: any) => {
      total = total + index.total;
    })
    return total;
  }

  useEffect(() => {

  }, [invoice.products])




  return (
    <>
      <AddProductDialog scale={selectProductOpen} setScale={setSelectProductOpen} setInvoice={setInvoice} key={addProductDialogKey} />
      <div className='h-full w-full relative'>

        <div className='border-t   w-full h-full overflow-auto text-sm relative' >
          <div className="flex flex-col" >
            <div className="">
              <div className="inline-block min-w-full ">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium border-neutral-500 uppercase sticky top-0">
                      <tr className="border-b border-neutral-500">
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >X</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >#</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Description</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >HSN code</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Qty</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Rate</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Amount</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Discount</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Tax. Value</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >tax</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Total</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        invoice.products.map((index: IInvoiceProduct, i: number) => {
                          let k = i;
                          return <tr className="border-b border-neutral-500 text-sm" key={`index.name${i}`}>

                            <th scope="col" className=' sticky text-black  text-center cursor-pointer' onClick={() => removeProduct(i)} >X</th>
                            <th scope="col" className=' sticky text-black border border-black text-center' >{++k}</th>
                            <th scope="col" className=' sticky text-black  text-sm ' >
                              <div className='flex flex-col'>
                                <div>{index.name}</div>
                                <div>{index.description}</div>
                              </div>
                            </th>
                            <th scope="col" className=' sticky text-black border border-black ' >{index.code}</th>
                            <TableInputs value={index.qty} onChange={(e: any) => { handleQtyRateAndDiscountChange(e.target.value, 'qty', i) }} type={'number'} key={`qty${i}`} />
                            <TableInputs value={index.rate} onChange={(e: any) => { handleQtyRateAndDiscountChange(e.target.value, 'rate', i) }} type={'number'} key={`rate${i}`} />
                            <th scope="col" className=' sticky text-black border border-black text-center' >{converToInrFormat(index.amount)}</th>
                            <TableInputs onChange={(e: any) => { handleQtyRateAndDiscountChange(e.target.value, 'discount', i) }} type={'number'} value={index.discount} key={`discount${i}`} />
                            <th scope="col" className=' sticky text-black border border-black text-center' >{index.taxable_Value}</th>
                            <th scope="col" className=' sticky text-black border border-black text-center' >
                              {/* tax  */}
                              <div className='flex flex-col'>

                                <div className='flex'>
                                  {
                                    index.tax.map((item: any) => {
                                      return <>
                                        <div className='text-table border-r grow flex'>{item.type}</div>
                                      </>
                                    })
                                  }

                                </div>
                                <div className='grid grid-cols-2 border-t text-table text-sm' >
                                  <div className='border-r'>rate</div>
                                  <div className=''>amount</div>

                                </div>
                                <div className='grid'>
                                  {
                                    index.tax.map((item: any) => {
                                      return <>
                                        <div className='grid grid-cols-2 '>
                                          <div className='text-sm border flex grow'>{item.amount + '%'}</div>
                                          <div className='text-sm border flex grow overflow-auto'>{calculateTaxAmount(item.amount, index.taxable_Value)}</div>

                                        </div>
                                      </>
                                    })
                                  }

                                </div>

                              </div>

                            </th>
                            <th scope="col" className=' sticky text-black border border-black text-center' >{converToInrFormat(index.total)}</th>

                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-[10%] bg-blue-100 border border-blue-500 text-center cursor-pointer absolute bottom-0 ' onClick={() => setSelectProductOpen(true)}>
          Add Product
        </div>
      </div>

    </>


  )
}

export default ProductTable