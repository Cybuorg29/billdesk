import React from 'react'
import { Iinvoice } from '../../../../../models/invoice/invoice.model'

type Props = { invoice: Iinvoice }

const SelfInfo = ({ invoice }: Props) => {
  return (
    <>
      <div className='grid  h-full w-full ' >
        <div className='text-3xl text-center font-bold '>{invoice.billed_From.name}</div>
        <div className='text-lg text-center '>{invoice.billed_From.adress}</div>
        <div className='text-lg text-center '>Mobile : {invoice.billed_From.mobile}</div>
        <div className='text-lg text-center '>GSTIN : {invoice.billed_From.gstin}</div>
      </div>
    </>
  )
}

export default SelfInfo