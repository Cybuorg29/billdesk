import { Table, TableCell, TableHead } from '@mui/material'
import React, { useState } from 'react'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'
import SelectProduct from '../components/SelectProduct'
import { ICREATE_SALES_ORDER_PRODUCT, ISALES_ORDER_PRODUCT } from '../../Model/model'
import TableInputs from '../../../invoice/create/components/TableInputs'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'
import { limitDecimalDigits } from '../../../../utils/limitDecimalDigits'
import removeIndex from '../../../../utils/removeIndex'

type Props = {
    push: any
    array: any[]
    update: any
}

const ProductTable = ({ push, array, update }: Props) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    function handleQtyAndRateChange(value: number, change: 'rate' | 'qty', index: number) {
        let arry = array;
        console.log(value)
        if (!(value > 0)) {
            value = 0;
        }
        if (change === 'rate') {
            array[index].rate = value;
        }
        else {
            array[index].quantity = value;
        }
        return arry;
    }


    return (
        <div className='h-full w-full '>
            <SelectProduct isOpen={isDialogOpen} close={() => { setIsDialogOpen(false) }} push={(value: ICREATE_SALES_ORDER_PRODUCT) => { push(value) }} />
            <div className='border-t    w-full h-[90%] overflow-auto text-xs relative' >
                <div className="flex flex-col" >
                    <div className="">
                        <div className="inline-block min-w-full ">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left  ">
                                    <thead className="border-b  text-table border-neutral-500 uppercase sticky top-0">
                                        <tr className="border-b border-neutral-500">
                                            <th scope="col" className='px-1 py-2  sticky text-grayFont  ' ></th>
                                            <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >#</th>
                                            <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Description</th>
                                            {/* <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >HSN code</th> */}
                                            <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Qty</th>
                                            <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Unit</th>
                                            <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Rate</th>
                                            <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Amount</th>
                                            {/* <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Discount</th> */}
                                            {/* <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Tax. Value</th> */}
                                            <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >tax</th>
                                            <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {

                                            array.map((value: ICREATE_SALES_ORDER_PRODUCT, index: number) => {
                                                const k = index
                                                let t = 0;
                                                return <>
                                                    <tr className="border-b border-neutral-500 ">
                                                        <th scope="col" className=' sticky  text-gray-700 border border-gray-400 cursor-pointer ' onClick={() => { update(removeIndex(array, k)) }} >X</th>
                                                        <th scope="col" className=' sticky  text-gray-700 border border-gray-400 ' >{++index}</th>
                                                        <th scope="col" className=' sticky  text-gray-700 border border-gray-400 ' >
                                                            <div>{value.name}</div>
                                                            <div>{value.description}</div>
                                                        </th>
                                                        <th scope="col" className=' sticky  text-gray-700 border border-gray-400 ' >
                                                            <TableInputs onChange={(e: React.ChangeEvent<HTMLInputElement>) => { update(handleQtyAndRateChange(parseInt(e.target.value), 'qty', k)) }} type={'number'} value={value.quantity} />
                                                        </th>
                                                        <th scope="col" className=' sticky  text-gray-700 border border-gray-400 ' >{value.measuring_Unit}</th>
                                                        <th scope="col" className=' sticky  text-gray-700 border border-gray-400 ' >
                                                            <TableInputs onChange={(e: React.ChangeEvent<HTMLInputElement>) => { update(handleQtyAndRateChange(parseInt(e.target.value), 'rate', k)) }} type={'number'} value={value.rate} />
                                                        </th>
                                                        <th scope="col" className=' sticky  text-gray-700 border border-gray-400 ' >{converToInrFormat(value.quantity * value.rate)}</th>

                                                        <th scope="col" className=' sticky font-light   border border-gray-400 text-center' >
                                                            <div className={`grid grid-cols-${value.tax.length}  w-full border-b border-black text-xs `}>
                                                                {
                                                                    value.tax.map((tax: { type: string, amount: number }, i: number) => {
                                                                        return <>
                                                                            <div className='border-r'>{tax.type}</div>
                                                                        </>

                                                                    })
                                                                }
                                                            </div>
                                                            <div className=' grid grid-cols-2 border border-black border-t-0 text-xs'>
                                                                <div className='border-r border-black '>Rate</div>
                                                                <div>amount</div>

                                                            </div>
                                                            <div className='w-full place-content-center  text-xs'>
                                                                {

                                                                    value.tax.map((tax: { type: string, amount: number }) => {
                                                                        t = t + limitDecimalDigits((value.rate * value.quantity) * tax.amount) / 100;
                                                                        return <>

                                                                            <div className={` grid grid-cols-2 border border-t-0 border-black w-full `}>
                                                                                <div className='border-r border-black'>{tax.amount}%</div>
                                                                                <div className='w-full overflow-hidden'>{converToInrFormat(limitDecimalDigits(((value.rate * value.quantity) * tax.amount) / 100))}</div>
                                                                            </div>
                                                                        </>
                                                                    })
                                                                }

                                                            </div>
                                                        </th>
                                                        <th scope="col" className=' sticky  text-gray-700 border border-gray-400 ' >{converToInrFormat(limitDecimalDigits((value.quantity * value.rate) + t))}</th>








                                                    </tr>
                                                </>
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-blue-200/60 rounded-b-lg border cursor-pointer border-blue-200 w-full h-[10%] bottom-0 grid place-content-center '
                onClick={() => { setIsDialogOpen(true) }} >
                Add +
            </div>
        </div>
    )
}

export default ProductTable