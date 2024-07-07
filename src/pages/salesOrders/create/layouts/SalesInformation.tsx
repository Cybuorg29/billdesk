import React from 'react'

type Props = {
    due: string,
    Delivery: string
    shipping_Meathod: string
    order_no: string
    set: any
}





const SalesInformation = ({ Delivery, due, order_no, shipping_Meathod, set }: Props) => {
    return (
        <div className='h-full w-full grid grid-cols-2 items-center p-2 gap-3 '>
            <div className='grid grid-cols-2 gap-1'>
                <label className=''>Due Date <span className='text-us text-gray-500'>(for "till supplies" keep the date blank)</span></label>
                <input name='a' type='date' value={due} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { set(e.target.value, 'due_Date') }} title='a' className='border border-black' ></input>
            </div>

            <div className='grid grid-cols-2 gap-1'>
                <label>Delivery Date</label>
                <input name='a' value={Delivery} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { set(e.target.value, 'delivery_Date') }} title='a' className='border border-black' ></input>
            </div>

            <div className='grid grid-cols-2 gap-1'>
                <label>Shipping Meathod</label>
                <input name='a' value={shipping_Meathod} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { set(e.target.value, 'shipping_Meathod') }} title='a' className='border border-black' ></input>
            </div>

            <div className='grid grid-cols-2 gap-1'>
                <label>Order_No</label>
                <input name='a' value={order_no} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { set(e.target.value, 'invoice_No') }} title='a' className='border border-black' ></input>
            </div>


        </div>
    )
}

export default SalesInformation