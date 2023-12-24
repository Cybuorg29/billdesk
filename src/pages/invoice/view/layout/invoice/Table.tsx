import React from 'react'
import { Iinvoice } from '../../../../../models/invoice/invoice.model'
import { converToInrFormat } from '../../../../../utils/ConvertInrFormat'
import { IInvoiceProduct } from '../../../../../models/inventory/productModel'

type Props = { invoice: Iinvoice }

const Table = ({ invoice }: Props) => {





  function calculateTaxAmount(rate: number, amount: number): number {
    return (rate / 100) * amount;
  }

  function calculateGrandTotal() {
    let total = 0;
    invoice.products.map((index: any) => {
      total = total + index.total;
    })
    return total;
  }
  return (
    <div className='  w-full h-fit overflow-auto text-sm relative  border-black' >
      <div className="flex flex-col" >
        <div className="">
          <div className="inline-block min-w-full ">
            <div className="overflow-hidden border-b border-black">
              <table className="min-w-full text-left ">
                <thead className="border-b  text-table border-black uppercase sticky top-0">
                  <tr className="border-b border-black text-center" >
                    <th scope="col" className='px-0.5 py-1 border-r text-us  sticky text-black border-l border-black ' >#</th>
                    <th scope="col" className='px-0.5 py-1 border-r border-black text-us  sticky text-black  ' >Description</th>
                    <th scope="col" className='px-0.5 py-1 border-r border-black text-us  sticky text-black  ' >HSN code</th>
                    <th scope="col" className='px-0.5 py-1 border-r border-black text-us  sticky text-black  ' >Qty</th>
                    <th scope="col" className='px-0.5 py-1 border-r border-black text-us  sticky text-black  ' >Rate</th>
                    <th scope="col" className='px-0.5 py-1 border-r border-black text-us  sticky text-black  ' >Amount</th>
                    <th scope="col" className='px-0.5 py-1 border-r border-black text-us  sticky text-black  ' >Discount</th>
                    <th scope="col" className='px-0.5 py-1 border-r border-black text-us  sticky text-black  ' >Tax. Value</th>
                    <th scope="col" className='px-0.5 py-1 border-r border-black text-us  sticky text-black  ' >tax</th>
                    <th scope="col" className='px-0.5 py-1  text-us  sticky text-black  border-black border-r' >Total</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    invoice.products.map((index: IInvoiceProduct, i: number) => {
                      let k = i;
                      return <tr className="border-b border-gray-400 text-table font-source2" key={`index.name${i}`}>

                        <th scope="col" className=' sticky text-gray-700 border border-black  text-center' >{++k}</th>
                        <th scope="col" className=' sticky text-gray-700 border border-black  text-sm ' >
                          <div className='flex flex-col text-table'>
                            <div className='text-black font-semibold'>{index.name}</div>
                            <div className='text-black'>{index.description}</div>
                          </div>
                        </th>
                        <th scope="col" className=' sticky  border border-black ' >{index.code}</th>
                        <th scope="col" className=' sticky  border border-black text-center' >{index.qty}</th>
                        <th scope="col" className=' sticky  border border-black text-center' >{converToInrFormat(index.rate)}</th>
                        <th scope="col" className=' sticky  border border-black text-center' >{converToInrFormat(index.amount)}</th>
                        <th scope="col" className=' sticky  border border-black text-center' >{converToInrFormat(index.discount)}</th>
                        <th scope="col" className=' sticky  border border-black text-center' >{index.taxable_Value}</th>
                        <th scope="" className=' sticky  border  border-black text-center' >
                          <div className=' h-full'>
                            <div className='grid grid-flow-col bg-black border-b border-black'>
                              {
                                index.tax.map((item: any, i: number) => {
                                  if (i === 0) return <>
                                    <div className='text-table bg-white text-center w-full  grow flex'>{item.type}</div>

                                  </>
                                  return <>
                                    <div className='text-table bg-white border-l border-black grow flex'>{item.type}</div>
                                  </>
                                })
                              }

                            </div>


                            <div className='grid grid-cols-2  text-table  border-t-0 border-black ' >
                              <div className=' '>rate</div>
                              <div className=' border-l border-black  '>amount</div>

                            </div>


                            <div className='grid'>
                              {
                                index.tax.map((item: any, i: number) => {

                                  return <>
                                    <div className='grid grid-cols-2 text-table '>
                                      <div className='text-sm border-t border-black flex grow text-table '>{item.amount + '%'}</div>
                                      <div className='text-sm border-l border-t flex grow overflow-hidden text-table border-black '>{converToInrFormat(calculateTaxAmount(item.amount, index.taxable_Value).toFixed(2).toString())}</div>

                                    </div>
                                  </>
                                })
                              }

                            </div>


                          </div>

                        </th>
                        <th scope="col" className=' sticky  border border-black text-center' >{converToInrFormat(index.total)}</th>

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
  )
}

export default Table