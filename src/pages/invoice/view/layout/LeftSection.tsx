import React, { useEffect, useId, useState } from 'react'
import { Iinvoice } from '../../../../models/invoice/invoice.model'
import SelfInfo from './invoice/SelfInfo'
import GeneralInfo from './invoice/GeneralInfo'
import Table from './invoice/Table'
import Bottom from './invoice/Bottom'
import BillingDetails from './invoice/BillingDetails'
import Fotter from './invoice/Fotter'
import { roundNumber } from '../../../../utils/RoundOff'

type Props = { invoice: Iinvoice }

const LeftSection = ({ invoice }: Props) => {
  const selfInfoKeys = useId();
  return (
    <div className='p-4 h-full w-full overflow-auto' id='toPrint' >
      <div>GSTIN:{invoice.billed_From.gstin}</div>
      <div className='w-full h-full ' >
      <div className='text-lg  border border-b-0 border-black text-center'>Tax Invoice</div>
        <div className='h-[12%] border border-black'>
          <SelfInfo invoice={invoice} key={selfInfoKeys} />
        </div>
        <div className='h-[10%]  border-black border-l border-r'>
          <GeneralInfo invoice={invoice} />
        </div>
        <div className='h-[12%] border-black border-b grid grid-cols-2 border-l border-r'>
          <div className='border-r border-black  '>
            <div className='border-b border-black pl-2 text-sm'>Billed To</div>
            <BillingDetails array={invoice.billed_To} />
          </div>
          <div>
            <div className='border-b border-black pl-2 text-sm'>Shipped  To</div>
            <BillingDetails array={invoice.shipped_To} />
          </div>
        </div>
        <div className='h-fit border-black '>
          <Table invoice={invoice} />
        </div>
          <div className='h-[30%]   border-black'>
            <div className='h-[50%] border-black border-l border-r'>
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