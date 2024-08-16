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
    <div className='p-10 h-full  w-full  text-sm font-bold  bg-white' ref={targetRef}   >
      <div className='flex place-content-between'>
        <div className='text-lg'>GSTIN:{invoice.billed_From.gstin}</div>
        <div className='text-sm'>Original for the recipient/Duplicate for transporter/Triplicate for supplier</div>

      </div>
      <div className='w-full min-h-full border-2 border-black' >


        <div className='text-lg font-bold       border-b-0 border-black text-center'>Tax Invoice</div>
        <div className='h-fit      border-black'>
          <SelfInfo invoice={invoice} key={selfInfoKeys} />
        </div>



        <div className='h-fit border-black  border-t-2  '>
          <GeneralInfo invoice={invoice} />
        </div>

        <div className='h-fit border-black    grid grid-cols-2 '>
          <div className='min-h-fit border-r-2 border-black'>
            <div className=' border-b-2  border-black pl-2 text-lg font-semibold '>Bill To</div>
            <BillingDetails array={invoice.billed_To} />
          </div>
          <div className='min-h-fit'>
            <div className=' border-b-2   border-black pl-2 text-lg font-semibold '>Ship To</div>
            <BillingDetails array={invoice.shipped_To} />
          </div>
        </div>
        <div className='h-[1rem] border-b-2 border-black'>

        </div>

        <div className='min-h-[15rem] border-black  mb-2  '>
          <Table invoice={invoice} />
        </div>
        <div className='h-fit   border-black        border-t-2'>
          <div className='h-fit text-sm border-black   '>
            <Bottom invoice={invoice} />
          </div>
          <div className=' border-b-2 border-black   grid'>
            <div className='border-b-2 pl-2 border-black'>Bank Details :- {invoice.bank.name}</div>
            <div className='pl-2'>Bank :- <span>{invoice.bank.bank + ',' + invoice.bank.no + ',' + invoice.bank.branch + ',' + invoice.bank.isfc}</span> </div>
          </div>
          <div className='min-h-[10rem]  border-b-2 border-black '>
            <Fotter invoice={invoice} />
          </div>
          <div className='h-[2rem]'></div>
        </div>
      </div>
    </div>
  )
}

export default LeftSection