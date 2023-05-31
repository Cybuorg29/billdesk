import React, { useEffect, useState } from 'react'
import { invoiceClientDetails } from '../../../layouts/invoice/viewInvoice/ViewInvoiceTopSection'

type Props = {badress:string,bname:string,bstate:string,bpincode:string}

type billedDetails = {
    data:invoiceClientDetails
}

const BilledToDetails:React.FC<billedDetails> = ({data}) => {
    // const [data,setData] = useState()
    useEffect(() => {
      console.log('billed',data)
    }, [data])
    
  return (
    <div  className='border border-black border-t-0 p-3' >
        <div>Billed To</div>
        <div className='text-xl'>{data?.bname}</div>
        <div className='text-lg' >{data?.badress}</div>
        <div>{data?.bstate}{'  '}{`05`}</div>
        <div>{data?.bgstin}</div>


    </div>
  )
}

export default BilledToDetails