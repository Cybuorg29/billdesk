import React from 'react'
import { ISALES_ORDER_PRODUCT, ISalesOrder } from '../../Model/model'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'
import { Itax } from '../../../../models/tax/Model'
import { calculateTaxAmount } from '../../../../utils/calculateTaxAmount'

type Props = {
    data: ISalesOrder | undefined
}

const ProductTable = ({ data }: Props) => {
    return (
        <>
            <table className='w-full border-black border-l-2 border-r-2 '>
                <thead className='w-full  '>
                    <tr className='w-full border-b-2 border-black'>
                        <th className='text-sm  border-black '>#</th>
                        <th className='text-sm border-l-2 border-black '>Description Of Items Ordered</th>
                        <th className='text-sm border-l-2 border-black '>Quantity</th>
                        <th className='text-sm border-l-2 border-black '>measuring Unit</th>
                        <th className='text-sm border-l-2 border-black '>Rate/mu</th>
                        <th className='text-sm border-l-2 border-black '>Total</th>
                    </tr>
                </thead>

                <tbody className=' border-black'>
                    {
                        data?.product.map((value: ISALES_ORDER_PRODUCT, i: number) => {
                            return <>
                                <tr className='border-b-2 border-black text-sm font-bold '>
                                    <td className='border-black border-r-2'>{++i}</td>
                                    <td className='grid   border-black p-2'>
                                        <div>{value.name}</div>
                                        <div>{value.description}</div>
                                    </td>
                                    <td className=' border-l-2 border-black text-center'>{value.quantity}</td>
                                    <td className=' border-l-2 border-black text-center'>{value.measuring_Unit}</td>
                                    <td className=' border-l-2 border-black text-center'>{value.rate}</td>
                                    <td className=' border-l-2 border-black text-center'>{converToInrFormat(value.quantity * value.rate)}</td>
                                </tr>
                            </>
                        })

                    }

                </tbody>

            </table>
        </>
    )
}

export default ProductTable