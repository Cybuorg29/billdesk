import React from 'react'
import { Iinvoice } from '../../../../../models/invoice/invoice.model'

type Props = {invoice:Iinvoice}

const SelfInfo = ({invoice}: Props) => {
  return (
    <>
    <div className='grid  border-b border-black p-2' >
    <div className='text-xl text-center '>{invoice.billed_From.name}</div>
    <div className='text-sm text-center '>{invoice.billed_From.adress}</div>
    <div className='text-sm text-center '>Mobile : {invoice.billed_From.mobile}</div>
    <div className='text-sm text-center '>GSTIN : {invoice.billed_From.gstin}</div>
    </div>
    </>
  )
}

export default SelfInfo