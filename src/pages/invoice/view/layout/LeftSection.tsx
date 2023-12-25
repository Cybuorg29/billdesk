import React, { useEffect, useId, useState } from 'react'
import { Iinvoice } from '../../../../models/invoice/invoice.model'
import SelfInfo from './invoice/SelfInfo'
import GeneralInfo from './invoice/GeneralInfo'
import Table from './invoice/Table'
import Bottom from './invoice/Bottom'
import BillingDetails from './invoice/BillingDetails'
import Fotter from './invoice/Fotter'
import { roundNumber } from '../../../../utils/RoundOff'

type Props = { invoice: Iinvoice, targetRef: any }

const LeftSection = ({ invoice, targetRef }: Props) => {
  const selfInfoKeys = useId();
  return (
    <div className='p-4 h-full w-full  text-sm font-bold ' ref={targetRef}   >
      <div>GSTIN:{invoice.billed_From.gstin}</div>
      <div className='w-full h-full ' >
        <div className='text-lg font-bold  border-2 border-b-0 border-black text-center'>Tax Invoice</div>
        <div className='h-[20%] border-2 border-black'>
          <SelfInfo invoice={invoice} key={selfInfoKeys} />
        </div>
        <div className='h-[11%]  border-black border-l-2    border-r-2   '>
          <GeneralInfo invoice={invoice} />
        </div>
        <div className='h-fit border-black border-b grid grid-cols-2 border-l-2    border-r-2   '>
          <div className='border-r-2    border-black  '>
            <div className='border-b-2 border-black pl-2 text-lg font-semibold '>Billed To</div>
            <BillingDetails array={invoice.billed_To} />
          </div>
          <div >
            <div className='border-b-2   border-black pl-2 text-lg font-semibold '>Shipped  To</div>
            <BillingDetails array={invoice.shipped_To} />
          </div>
        </div>
        <div className='h-fit border-black  border-t-2  '>
          <Table invoice={invoice} />
        </div>

        <div className='h-[30%]   border-black'>
          <div className='h-[fit] text-sm border-black border-l-2    border-r-2   '>
            <Bottom invoice={invoice} />
          </div>
          <div className='  text-xs border-l-2 border-r-2 border-b-2 border-black   grid'>
            <div className='border-b-2 pl-2 border-black'>Bank Details :- {invoice.bank.name}</div>
            <div className='pl-2'>Bank :- <span>{invoice.bank.bank + ',' + invoice.bank.no + ',' + invoice.bank.branch + ',' + invoice.bank.isfc}</span> </div>
          </div>
          <div className='h-[fit] border-2 border-black border-t-0'>
            <Fotter invoice={invoice} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSection