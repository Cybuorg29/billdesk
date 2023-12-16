import React, { useEffect, useId, useState } from 'react'
import { Iinvoice } from '../../../../models/invoice/invoice.model'
import SelfInfo from './invoice/SelfInfo'
import GeneralInfo from './invoice/GeneralInfo'
import Table from './invoice/Table'
import Bottom from './invoice/Bottom'
import BillingDetails from './invoice/BillingDetails'
import Fotter from './invoice/Fotter'
import { roundNumber } from '../../../../utils/RoundOff'

type Props = { invoice: Iinvoice ,targetRef:any}

const LeftSection = ({ invoice,targetRef }: Props) => {
  const selfInfoKeys = useId();
  return (
    <div   className='p-4 h-full w-full  text-sm'   >
      <div>GSTIN:{invoice.billed_From.gstin}</div>
      <div className='w-full h-full ' >
      <div className='text-sm  border border-b-0 border-black text-center'>Tax Invoice</div>
        <div className='h-[15%] border border-black'>
          <SelfInfo invoice={invoice} key={selfInfoKeys} />
        </div>
        <div className='h-[11%]  border-black border-l border-r'>
          <GeneralInfo invoice={invoice} />
        </div>
        <div className='h-[16%] border-black border-b grid grid-cols-2 border-l border-r'>
          <div className='border-r border-black  '>
            <div className='border-b border-black pl-2 text-us font-semibold'>Billed To</div>
            <BillingDetails array={invoice.billed_To} />
          </div>
          <div>
            <div className='border-b border-black pl-2 text-us font-semibold '>Shipped  To</div>
            <BillingDetails array={invoice.shipped_To} />
          </div>
        </div>
        <div className='h-fit border-black '>
          <Table invoice={invoice} />
        </div>
          <div className='h-[30%]   border-black'>
            <div className='h-[fit] border-black border-l border-r'>
          <Bottom invoice={invoice} />
            </div>
          <div className='h-[fit] border border-black border-t-0'>
          <Fotter invoice={invoice} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSection