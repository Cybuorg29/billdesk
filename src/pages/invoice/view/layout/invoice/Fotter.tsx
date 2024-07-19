import React from 'react'
import { Iinvoice } from '../../../../../models/invoice/invoice.model'

type Props = { invoice: Iinvoice | any }

const Fotter = ({ invoice }: Props) => {
    return (
        <div className='w-full min-h-[10rem] grid grid-cols-4 text-table  '>
            <div className=' border-r-2 border-black col-span-3  h-full '>
                <div className='  text-sm border-black border-b-2   pl-2    '>Term and Conditions</div>
                <div className=' p-2 gap-2 flex flex-col text-xs'>
                    {
                        invoice.terms_And_Conditions.map((index: any, i: number) => {
                            return <div>
                                {++i}. {index}
                            </div>
                        })
                    }

                </div>
            </div>
            <div className=' pl-3 text-sm pt-2 h-full' >

                Authority Signature
            </div>


        </div>
    )
}

export default Fotter