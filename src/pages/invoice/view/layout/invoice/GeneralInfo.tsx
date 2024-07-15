import React, { useEffect, useState } from 'react'
import { Iinvoice } from '../../../../../models/invoice/invoice.model'
import replaceUnderscoresWithSpaces from '../../../../../utils/removeUnderScore'
import { getStateCode } from '../../../../../utils/getStateCode'
import { useAppDispatch, useAppSelector } from '../../../../../store/app/hooks'
import { change } from '../../../../../store/features/loader/loaderSlice'
import { toast } from 'react-toastify'
import { getSalesOrderNoApi } from '../../../../../api/v2/salesOrder/api'
import { responceObj } from '../../../../../models/responce'

type Props = { invoice: Iinvoice | any }

const GeneralInfo = ({ invoice }: Props) => {
  const invoiceKeys = Object.keys(invoice);
  // const {} = useAppSelector();

  return (
    <div className={`grid  w-full    grid-cols-2    h-full text-s`}>
      {invoiceKeys.map((index, i: number) => {
        let border = '';
        if (i % 2 === 0) border = 'border-r-2 '
        if (index === 'total_Tax' || index === 'products' || index === 'gst_On_Reverce_Charge' || index === 'billed_To' || index === 'billed_From' || index === 'shipped_To' || index === 'discount' || index === 'grand_Total' || index === 'state_Code' || index === 'terms_And_Conditions' || index === 'bank' || index === 'id' || index === 'isPaid' || index === '_id' || index === '__v' || index === 'createdAt' || index === 'updatedAt') return
        if (index === 'state') return <>
          <div className={`grid grid-cols-3  gap-5   w-full pl-2 border-b-2 border-black text-s`}>
            <div className={`grid grid-cols-2 ${border} col-span-2 `}>
              <div className=''>{replaceUnderscoresWithSpaces(index)}</div>
              <div className='text-center'>{invoice[index]}</div>
            </div>
            <div className={`grid grid-cols-2 ${border} `}>
              <div className=''>{replaceUnderscoresWithSpaces(`code :`)}</div>
              <div className='text-center'>{getStateCode(invoice.state)}</div>
            </div>
          </div>
        </>
        if (index === 'SO_NO') return <>
          <div className={`grid  grid-cols-2 ${border} pl-2 border-b-2 border-black text-s`}>
            <div className=''>Order No :</div>
            <div className=' pr-2'>{invoice[index]}</div>
          </div>
        </>
        if (i < 9) {
          return <>
            <div className={`grid  grid-cols-2 ${border} pl-2 border-b-2 border-black text-s`}>
              <div className=''>{replaceUnderscoresWithSpaces(index)}:</div>
              <div className=' pr-2'>{invoice[index]}</div>
            </div>
          </>
        } else {
          return <div className={`grid  grid-cols-2 ${border} pl-2 border-b-2 border-black text-s`}>
            <div className=''>{replaceUnderscoresWithSpaces(index)}:</div>
            <div className=''>{invoice[index]}</div>
          </div>
        }
      })}
    </div>

  )
}

export default GeneralInfo