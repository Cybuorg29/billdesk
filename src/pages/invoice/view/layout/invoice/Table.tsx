import React from 'react'
import { Iinvoice } from '../../../../../models/invoice/invoice.model'
import { converToInrFormat } from '../../../../../utils/ConvertInrFormat'
import { IInvoiceProduct } from '../../../../../models/inventory/productModel'

type Props = {invoice:Iinvoice}

const Table = ({invoice}: Props) => {
      




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
    <div className='border-t  w-full h-[100%] overflow-auto text-sm relative' >
    <div className="flex flex-col" >
      <div className="">
        <div className="inline-block min-w-full ">
          <div className="overflow-hidden">
            <table className="min-w-full text-left  ">
              <thead className="border-b  text-table border-black uppercase sticky top-0">
                <tr className="border-b border-black">
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
                            <th scope="col" className=' sticky  border border-black text-center' >
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
                                <div className='grid grid-cols-2 border-t text-table ' >
                                  <div className='border-r '>rate</div>
                                  <div className=''>amount</div>

                                </div>
                                <div className='grid'>
                                  {
                                    index.tax.map((item: any) => {
                                      return <>
                                        <div className='grid grid-cols-2 text-table '>
                                          <div className='text-sm border flex grow text-table'>{item.amount + '%'}</div>
                                          <div className='text-sm border flex grow overflow-auto text-table '>{parseFloat(calculateTaxAmount(item.amount, index.taxable_Value).toFixed(2))}</div>

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