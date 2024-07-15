import { Dialog, DialogContentText } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppSelector } from '../../../../store/app/hooks'
import { getProducts } from '../../../../store/actions/products'
import { ProductObj } from '../../../../models/inventory/productModel'
import { toast } from 'react-toastify'
import { ICREATE_SALES_ORDER_PRODUCT, ISALES_ORDER_PRODUCT } from '../../Model/model'

type Props = {
    isOpen: boolean
    close: any
    push: any
}

const SelectProduct = (props: Props) => {

    const { isProducts, products } = useAppSelector(state => state.product);

    useEffect(() => {
        if (!isProducts) {
            getProducts();
        }
    }, [products, isProducts]);


    class dataPusjObj {

        del_sch = ""
        description = ""
        measuring_Unit = ""
        quantity = 0
        rate = 0
        tax = []
        delivered = 0
        name = ''

        constructor({ del_sch, description, measuring_Unit, quantity, rate, tax, delivered, name }: ICREATE_SALES_ORDER_PRODUCT) {
            // toast(name)
            this.del_sch = del_sch
            this.description = description
            this.measuring_Unit = measuring_Unit
            this.quantity = quantity
            this.rate = rate
            this.tax = tax
            this.delivered = delivered
            this.name = name
        }

    }


    function pushProduct(value: ProductObj) {
        const data = new dataPusjObj({ del_sch: '', description: value.description, measuring_Unit: value.unit, quantity: 0, rate: value.rate, tax: value.tax, delivered: 0, name: value.name, in_id: value._id });
        props.push(data);
        props.close();
    }



    return (
        <Dialog open={props.isOpen} fullWidth className='w-full h-full'>
            <div className='p-5 w-full h-full'>
                <div className='flex place-content-between'>
                    <div className='grid items-center'>
                        <DialogContentText>Click On The Product To Add</DialogContentText>
                    </div>
                    <div className='p-3 w-[2rem] h-[2rem] hover:bg-gray-500/30 cursor-pointer rounded-full text-center grid place-content-center' onClick={() => { props.close() }}>
                        <div>X</div>
                    </div>
                </div >
                <div className='text-xl uppercase border-b-2 border-black'>Products</div>

                <div className='h-[70%]'>
                    {
                        products.map((index: ProductObj) => {
                            return <div className='p-3 hover:bg-gray-200 cursor-pointer  border-b border-black' onClick={() => { pushProduct(index) }}>{index.name}</div>
                        })
                    }

                </div>
            </div>
        </Dialog>
    )
}

export default SelectProduct