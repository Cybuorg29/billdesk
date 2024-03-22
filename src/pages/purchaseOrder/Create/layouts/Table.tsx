import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useId, useState } from 'react'
import { IPURCHASE_ORDER_PRODUCT } from '../../model/model'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'
import { IInvoiceProduct } from '../../../../models/inventory/productModel'
import TableInputs from '../../../invoice/create/components/TableInputs'
import { useAppSelector } from '../../../../store/app/hooks'
import { toast } from 'react-toastify'

type Props = {
    array: IPURCHASE_ORDER_PRODUCT[]
}

const ProductTable = ({ array }: Props) => {
    const [selectProductOpen, setSelectProductOpen] = useState<boolean>(false);
    const { products } = useAppSelector(state => state.product);
    const [minStock, setMinStock] = useState<number[]>([])
    //keys 
    const addProductDialogKey = useId();


    //local components 




    //functions
    function calculateTaxAmount(rate: number, amount: number): number {
        return (rate / 100) * amount;
    }


    function removeProduct(num: number) {
        let newArray: any[] = [];
        let total = 0;
        array.map((index: any, i: number) => {
            if (num === i) {

            }
            else {
                newArray.push(index); total = total + index.total;
            }
        })


        //   setInvoice((prev: any) => { return { ...prev, products: newArray, grand_Total: total } });
    }

    function calculateGrandTotal() {
        let total = 0;
        array.map((index: any) => {
            total = total + index.total;
        })
        return total;
    }

    return (
        <>
            <div className='h-full w-full  relative'>

                <div className='border-t    w-full h-[90%] overflow-auto text-sm relative' >
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
                                                array.map((index: IPURCHASE_ORDER_PRODUCT, i: number) => {
                                                    let k = i;
                                                    return <>

                                                        <th scope="col" className=' sticky text-gray-400 border border-gray-400 text-center' >X</th>
                                                        <th scope="col" className=' sticky text-gray-700 border border-gray-400 text-center' >{++i}</th>
                                                        <th scope="col" className=' sticky font-thin  text-start  border border-gray-400   pl-5' >
                                                            <div className='grid '>
                                                                <div className='text-black text-lg'>{index.name}</div>
                                                                <div className='text-gray-600'>{index.description}</div>
                                                            </div>
                                                        </th>
                                                        <th scope="col" className=' sticky text-gray-700 border border-gray-400 text-center' >
                                                            <TableInputs onChange={() => { }} type={'text'} value={index.quantity} key={`${index.name + i}`} />
                                                        </th>
                                                        <th scope="col" className=' sticky text-black font-serif border border-gray-400 text-center' >{index.measuring_Unit}</th>





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

            </div>
        </>
    )
}

export default ProductTable