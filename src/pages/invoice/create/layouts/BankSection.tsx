import React from 'react'
import { useAppSelector } from '../../../../store/app/hooks'
import { IcreateInvoice } from '../../../../models/invoice/invoice.model';

type Props = {invoice:IcreateInvoice|any}

const BankSection = ({invoice}: Props) => {
      
      const bankKeys = Object.keys(invoice.bank);
  return (
    <div className='pl-2 bg-component rounded-lg'>
        <div className='text-md text-grayFont font-inclusive'>Bank Details</div>
        <div className='grid grid-cols-2 text-sm '>

        {
            bankKeys.map((index:string)=>{
                return<>
                 <div className='grid grid-cols-2 ' >
                    <div className='font-ubuntu '>{index.toUpperCase()} : </div>
                    <div className='font-source2'>{invoice.bank[index]}  </div>
                 </div>
                </>
            })
        }

        </div>

    </div>
  )
}

export default BankSection