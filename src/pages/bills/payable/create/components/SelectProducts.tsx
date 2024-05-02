import { Dialog, DialogContent, DialogContentText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../../store/app/hooks'
import { ProductObj } from '../../../../../models/inventory/productModel'
import { getProducts } from '../../../../../store/actions/products'
import { initlisePurchaseOrder } from '../../../../../store/actions/purchaseOrder/action'
import { toast } from 'react-toastify'
import { ICREATE_PURCHASE_ORDER_PRODUCT, IPURCHASE_ORDER, IPURCHASE_ORDER_PRODUCT } from '../../../../purchaseOrder/model/model'

type Props = { scale: boolean, setScale: any, setInvoice: any, setMinStock: any, po: string }

interface IProductTab {
    name: string
    value: any
}

const SelectProducts = ({ scale, setInvoice, setMinStock, setScale, po }: Props) => {

    const blue = 'text-blue-800'
    const { products, isProducts } = useAppSelector(state => state.product);
    const { isLoaded, purchase_Order } = useAppSelector(state => state.po)
    const [array, setArray] = useState<any>(initliseDataArray())


    class PRODUCT {
        name = ''
        description = ''
        code = ''
        qty = ''
        rate = 0
        unit = ''
        discount = 0
        total = 0
        amount = 0
        taxable_Value = 0
        tax = []
        id = ''
        constructor(name: string, description: string, rate: number, unit: string, tax: any, id: string) {
            this.name = name;
            this.description = description
            this.rate = rate
            this.unit = unit
            this.tax = tax
            this.id = id
        }
    }


    function submit(e: React.ChangeEvent, index: IPURCHASE_ORDER_PRODUCT) {
        setInvoice((prev: any) => {
            return {
                ...prev, products: [...prev.products, new PRODUCT(index.name, index.description, index.rate, index.measuring_Unit, index.tax, index._id)]
            }
        })

        setScale(false);
        // setMinStock((prev: any) => { return [...prev, index.stock] });
    }

    // useEffect(() => {
    //     getProducts()

    // }, [products])


    function initliseDataArray() {
        let newArray: IPURCHASE_ORDER_PRODUCT[] = [];
        // toast()
        purchase_Order.map((order: IPURCHASE_ORDER) => {
            if (order.po_NO === po) {
                newArray = [...order.product];
            }
        })
        return newArray;
    }


    useEffect(() => {
        if (po === '') {
            setArray((prev: any) => products)
        } else {
            if (!isLoaded) {
                initlisePurchaseOrder();
            }

            setArray(initliseDataArray());
        }
    }, [isLoaded, purchase_Order, po])

    const ProductTab = ({ name, value }: IProductTab) => {
        if (name === 'Rate') {
            return <>
                <div className='flex grid-cols-2 gap-2' >
                    <div>{name}{':'}</div>
                    <div className='text-blue-800'>{(value.length > 10) ? value.slice(0, 20) + "....." : value}</div>

                </div>
            </>
        }
        return <>
            <div className='flex grid-cols-2 gap-2' >
                <div>{name}{':'}</div>
                <div className='text-gray-500'>{(value.length > 10) ? value.slice(0, 20) + "....." : value}</div>

            </div>
        </>
    }
    return (
        <Dialog open={scale} fullWidth >
            <div className='p-3'>
                <DialogContentText>
                    <div className='flex place-content-between'>
                        <div className='h-fit' >Click on the product to add</div>
                        <div className='text-xl cursor-pointer' onClick={() => setScale(false)}>X</div>

                    </div>
                </DialogContentText>
                <DialogContent>
                    <div className='min-h-[60%] overflow-auto flex flex-col gap-5  '>
                        <div className="flex flex-col" >
                            <div className="">
                                <div className="inline-block min-w-full ">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full text-left  ">
                                            <thead className="border-b  text-sm border-neutral-500 uppercase sticky top-0">
                                                <tr className="border-b border-neutral-500">
                                                    <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >#</th>
                                                    <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Name</th>
                                                    <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Rate</th>
                                                    <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Ordered</th>
                                                    <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Undelivered</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    array.map((index: IPURCHASE_ORDER_PRODUCT, i: number) => {
                                                        return <tr className="border-b border-gray-400 text-sm font-source2 cursor-pointer hover:bg-black/20 hover:text-white" key={`index.name${i}`} onClick={(e: any) => { submit(e, index) }}   >
                                                            <th scope="col" className='px-1 py-2  sticky text-black ' >{++i}</th>
                                                            <th scope="col" className='px-1 py-2  sticky text-black ' >{index.name}</th>
                                                            <th scope="col" className='px-1 py-2  sticky text-gray-500 ' >{index.rate}</th>
                                                            <th scope="col" className='px-1 py-2  sticky text-gray-500 text-center ' >{index.quantity}</th>
                                                            <th scope="col" className='px-1 py-2  sticky text-gray-500  text-center' >{(index.quantity) ? (index.quantity - index.delivered) : null}</th>
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

                </DialogContent>
            </div>
        </Dialog>
    )
}

export default SelectProducts