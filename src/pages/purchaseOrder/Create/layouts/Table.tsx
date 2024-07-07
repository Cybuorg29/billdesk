import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { ICREATE_PURCHASE_ORDER_PRODUCT } from '../../model/model'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'
import TableInputs from '../../../invoice/create/components/TableInputs'
import { limitDecimalDigits } from '../../../../utils/limitDecimalDigits'
import removeIndex from '../../../../utils/removeIndex'

type Props = {
    array: ICREATE_PURCHASE_ORDER_PRODUCT[],
    setArray: any
}

const ProductTable = ({ array, setArray }: Props) => {
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
        <>
            <div className='h-full w-full  relative'>

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
                                                array.map((index: ICREATE_PURCHASE_ORDER_PRODUCT, i: number) => {
                                                    const k = i
                                                    let t = 0;
                                                    return <tr>
                                                        <th scope="col" className=' sticky text-gray-400 border border-gray-400 text-center cursor-pointer' onClick={() => { setArray(removeIndex(array, k)) }} >X</th>
                                                        <th scope="col" className=' sticky text-gray-700 border border-gray-400 text-center' >{++i}</th>
                                                        <th scope="col" className=' sticky   text-start  border border-gray-400   pl-5' >
                                                            <div className='grid '>
                                                                <div className='text-black '>{index.name}</div>
                                                                <div className='text-gray-600'>{index.description}</div>
                                                            </div>
                                                        </th>
                                                        <th scope="col" className=' sticky text-gray-700 border border-gray-400 text-center' >
                                                            <TableInputs onChange={(e: React.ChangeEvent<HTMLInputElement>) => { console.log('value', e.target.value); setArray(handleQtyAndRateChange(parseInt(e.target.value), 'qty', k)) }} type={'text'} value={index.quantity} key={`${index.name + i}`} />
                                                        </th>
                                                        <th scope="col" className=' sticky text-black  border border-gray-400 text-center' >{index.measuring_Unit}</th>
                                                        <th scope="col" className=' sticky text-black  border border-gray-400 text-center' >
                                                            <TableInputs onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setArray(handleQtyAndRateChange(parseInt(e.target.value), 'rate', k)) }} type={'number'} value={index.rate} />
                                                        </th>
                                                        <th scope="col" className=' sticky text-black  border border-gray-400 text-center' >{converToInrFormat(index.quantity * index.rate)}</th>
                                                        <th scope="col" className=' sticky font-light   border border-gray-400 text-center' >
                                                            <div className={`grid grid-cols-${index.tax.length}  w-full border-b border-black text-xs `}>
                                                                {
                                                                    index.tax.map((tax: { type: string, amount: number }, i: number) => {
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

                                                                    index.tax.map((tax: { type: string, amount: number }) => {
                                                                        t = t + limitDecimalDigits((index.rate * index.quantity) * tax.amount) / 100;
                                                                        return <>

                                                                            <div className={` grid grid-cols-2 border border-t-0 border-black w-full `}>
                                                                                <div className='border-r border-black'>{tax.amount}%</div>
                                                                                <div className='w-full overflow-hidden'>{converToInrFormat(limitDecimalDigits(((index.rate * index.quantity) * tax.amount) / 100))}</div>
                                                                            </div>
                                                                        </>
                                                                    })
                                                                }

                                                            </div>
                                                        </th>
                                                        <th className='text-xs border border-gray-400  overflow-auto' >
                                                            {
                                                                converToInrFormat(limitDecimalDigits((index.rate * index.quantity) + t))
                                                            }

                                                        </th>



                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProductTable