import React, { useEffect, useState } from 'react'
import InvoiceFrontTop from '../../../layouts/invoice/InvoiceFrontTop'
import { useParams } from 'react-router-dom'
import { getInvoices } from '../../../../api/invocie/invoiceService'
import InvoiceFrontTable from '../../../layouts/invoice/InvoiceFrontTable'
import { invoiceprops } from '../../../layouts/invoice/InvoiceFrontTable'
type Props = {}

interface invoiceSchema{
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


interface invoiceArray{
     invoice:invoiceprops[]
}






const InvoiceFrontPage = (props: Props) => {
  const {id} = useParams()
  const [invoices,setInvoice]:any = useState([])

  
  const getData =async()=>{
    const {data} = await getInvoices()
    console.log('invoice',data)
    setInvoice(data.data)
    saveInvoice(data.data)
  }

   const saveInvoice=(data:any[])=>{
      sessionStorage.setItem('invoices',JSON.stringify(data))
   }

    useEffect(() => {
      console.log('invoice1',invoices)
      // getData()
  
    }, [])
    
  return (
    <div  className='grid gap-3' >
        <InvoiceFrontTop/>
        <InvoiceFrontTable  invoice={invoices} />
        

    </div>
  )
}

export default InvoiceFrontPage