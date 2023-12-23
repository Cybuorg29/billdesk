import React from 'react'
import { Iinvoice } from '../../../../../models/invoice/invoice.model'

type Props = {invoice:Iinvoice}

const SelfInfo = ({invoice}: Props) => {
  return (
    <>
    <div className='grid  h-full w-full ' >
    <div className='text-xl text-center '>{invoice.billed_From.name}</div>
    <div className='text-xs text-center '>{invoice.billed_From.adress}</div>
    <div className='text-xs text-center '>Mobile : {invoice.billed_From.mobile}</div>
    <div className='text-xs text-center '>GSTIN : {invoice.billed_From.gstin}</div>
    </div>
    </>
  )
}

export default SelfInfo