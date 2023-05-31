import React, { useEffect, useState } from 'react'
import { invoiceClientDetails } from '../../../layouts/invoice/viewInvoice/ViewInvoiceTopSection'

type Props = {badress:string,bname:string,bstate:string,bpincode:string}

type billedDetails = {
    data:invoiceClientDetails
}

const ShippedToDetails:React.FC<billedDetails> = ({data}) => {
    // const [data,setData] = useState()
    useEffect(() => {
      console.log('billed',data)
    }, [data])
    
  return (
    <div  className='border border-black border-t-0 p-3' >
        <div>Shipped To</div>
        <div className='text-xl'>{data?.sname}</div>
        <div className='text-lg' >{data?.sadress}</div>
        <div>{data?.sstate}{'  '}{`05`}</div>
        <div>{data?.sgstin}</div>


    </div>
  )
}

export default ShippedToDetails