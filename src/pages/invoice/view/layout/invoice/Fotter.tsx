import React from 'react'
import { Iinvoice } from '../../../../../models/invoice/invoice.model'

type Props = { invoice: Iinvoice | any }

const Fotter = ({ invoice }: Props) => {
    const bankKeys = Object.keys(invoice.bank)
    return (
        <div className='w-full h-full grid grid-cols-2 text-table border border-black'>
              <div className='border-r border-black'>
              <div className='  text-md h-[10%] border-b pl-2  border-black'>Term and Conditions</div>
            <div className=' p-2 gap-2 flex flex-col'>
                {
                    invoice.terms_And_Conditions.map((index: any, i: number) => {
                        return <div>
                            {++i}. {index}
                        </div>
                    })
                }

            </div>
            </div>
            <div>
                <div className='  text-md h-[10%] border-b border-black'>Bank Details</div>

            <div className='grid grid-rows-2 h-full border-b-0 border-black'>
                <div>
                    {
                        bankKeys.map((index: any) => {
                            return <div className='flex gap-2 border-b  pl-2 border-black'>
                                <div>{index}</div>
                                <div>{invoice.bank[index]}</div>
                            </div>
                        })
                    }
                </div>
            <div className='w-full h-full border-b border-t p-2 border-black'>
                <div>Common seal</div>

            </div>
                    </div>

            </div>


        </div>
    )
}

export default Fotter