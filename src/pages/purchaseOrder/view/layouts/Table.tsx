import React from 'react'
import { IPURCHASE_ORDER_PRODUCT } from '../../model/model'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'

type Props = {
    array: IPURCHASE_ORDER_PRODUCT[]
}

const Table = ({ array }: Props) => {
    return (
        <>
            <table className='w-full'>
                <thead className='w-full border-black border-r-2'>
                    <tr className='w-full border-b-2 border-black'>
                        <th className='text-sm border-l-2 border-black '>#</th>
                        <th className='text-sm border-l-2 border-black '>Description Of Items Ordered</th>
                        <th className='text-sm border-l-2 border-black '>Quantity</th>
                        <th className='text-sm border-l-2 border-black '>measuring Unit</th>
                        <th className='text-sm border-l-2 border-black '>Rate/mu</th>
                        <th className='text-sm border-l-2 border-black '>Total</th>
                        <th className='text-sm border-l-2 border-black '>Delivery Shedule</th>
                    </tr>
                </thead>

                <tbody className='border-l-2 border-r-2 border-black'>
                    {
                        array.map((value: IPURCHASE_ORDER_PRODUCT, i: number) => {
                            return <>
                                <tr className='border-b-2 border-black text-sm font-bold '>
                                    <td className=''>{++i}</td>
                                    <td className='grid  border-l-2 border-black p-2'>
                                        <div>{value.name}</div>
                                        <div>{value.description}</div>
                                    </td>
                                    <td className=' border-l-2 border-black text-center'>{value.quantity}</td>
                                    <td className=' border-l-2 border-black text-center'>{value.measuring_Unit}</td>
                                    <td className=' border-l-2 border-black text-center'>{value.rate}</td>
                                    <td className=' border-l-2 border-black text-center'>{converToInrFormat(value.quantity * value.rate)}</td>
                                    <td className=' border-l-2 border-black text-center'>{value.del_sch}</td>
                                    <td className='  border-black'></td>
                                </tr>
                            </>
                        })

                    }

                </tbody>

            </table>

        </>
    )
}

export default Table