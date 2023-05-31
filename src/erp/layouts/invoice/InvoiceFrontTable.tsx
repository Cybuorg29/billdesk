import { Button } from '@mui/material'
import React from 'react'
import TableInfo from '../../components/Invoice/TableInfo'
import { useNavigate } from 'react-router-dom'
 
 export type invoiceprops = {
    bid:string,
    sid:string,
     reverseCharge:boolean,
     date:string,
     inNo:string,
     state:string,
     scode:number,
     transport:string,
    total:number,
    id:string,
    bname:string,
    status:boolean,
    createdAt:string,
    updatedAt:string,
    __v:number,
    _id:string
}

type invoiceSchema =  {
  invoice:invoiceprops[]

}

type Props = {invoice:invoiceSchema}

const InvoiceFrontTable:React.FC<invoiceSchema> = ({invoice}) => {
   console.log('table',invoice)
    const navigate = useNavigate()
  return (
    <div className='  w-full p-2  overflow-auto  row-span-2   ' >


    <div className=' grid lg:grid-cols-2 grid-cols-4      m-3 ml-0 mr-0 shadow-md border rounded-lg  items-center' >
       <div className=' lg:p-5 p-2 lg:text-xl text-sm col-span-1 lg:col-auto'>
         All Invoices 
       </div>
       <div className=' flex w-full  justify-items-end lg:grid-cols-2    items-center p-1 pt-0 lg:gap-5  col-span-3 lg:col-auto  ' >
       <Button variant='text' className=' w-full  scale-75 lg:scale-100' onClick={()=>{navigate(`createinvoice`)}}  >
        Create +

        </Button> 
         <Button variant='text' className=' w-full scale-75 lg:scale-100    '   onClick={()=>{navigate(`/`)}} >
        Edit Bill Configration

        </Button>
       

       </div>
    </div>
    <table className='w-full   text-xs lg:text-sm rounded-2xl   rounded-t-3xl relative    ' >
      <thead className=' rounded-b-2xl border-b-2 uppercase sticky bg-slate-900 ' >
        <th className='lg:p-5 p-3 text-us text-white  lg:text-xs sticky  ' >Date</th>
        <th className='lg:p-5 p-3 text-us text-white  lg:text-xs sticky ' >Invoice no#</th>
        <th className='lg:p-5 p-3 text-us   lg:text-xs     text-white    sticky    ' >Client</th>
        <th className='lg:p-5 p-3 text-us text-white  lg:text-xs sticky ' >Amount</th>
        <th className='lg:p-5 p-3 text-us text-white  lg:text-xs sticky ' >Status</th>
        <th className='lg:p-5 p-3 text-us text-white  lg:text-xs sticky ' >Due Date</th>

      </thead>
    
      
      <tbody className=' ' >
        {
          invoice.map((index,i)=>{
            return(
              <>
                <TableInfo date={index.date} invoiceNo={index.inNo} amt={index.total} status={false} dueDate={'20'}  name='aditya' i={i} id={index._id} />
              </>
            )
          })
        }




      </tbody>
    </table>

  </div>


  )
}

export default InvoiceFrontTable