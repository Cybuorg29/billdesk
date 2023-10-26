import React from 'react'
import { useAppSelector } from '../../../../store/app/hooks'
import { Iinvoice } from '../../../../models/invoice/invoice.model';

type Props = {}

const Table = (props: Props) => {
     const {invoices} = useAppSelector(state=>state.invoice);
       
  return (
    <div className='w-full h-full '>
   <div className='border-t    w-full h-[90%] overflow-auto text-sm relative' >
          <div className="flex flex-col" >
            <div className="">
              <div className="inline-block min-w-full ">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left  ">
                    <thead className="border-b   border-neutral-500 uppercase sticky top-0">
                      <tr className="border-b border-neutral-500">
                        <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >#</th>
                        <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Invoice No.</th>
                        <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Billed To</th>
                        <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Date</th>
                        <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Amount</th>
                        <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Paid</th>

                      </tr>
                    </thead>
                    <tbody>
                        {
                             invoices.map((index:Iinvoice,i:number)=>{
                                  let k = i
                                return<tr className="border-b border-gray-400  font-source2" key={`index.name${i}`}>
                                <th scope="col" className=' px-6 py-4  sticky '  >{++k}</th>
                                <th scope="col" className=' px-6 py-4  sticky '  >{index.invoice_No}</th>
                                <th scope="col" className=' px-6 py-4  sticky '  >{index.billed_To.name}</th>
                                <th scope="col" className=' px-6 py-4  sticky '  >{index.invoice_Date}</th>
                                <th scope="col" className=' px-6 py-4  sticky '  >{index.grand_Total}</th>
                                <th scope="col" className=' px-6 py-4  sticky '  >{(!index.isPaid)?'Not Paid':'Paid'}</th>
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
                    
    </div>
  )
}

export default Table