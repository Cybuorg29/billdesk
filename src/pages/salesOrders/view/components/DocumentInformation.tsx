import React from 'react'
import { userDetailSchema } from '../../../../models/userModel'
import convertIsoDate from '../../../../utils/convertIsoDates'
import { ISalesOrder } from '../../Model/model'

type Props = {
    userData: userDetailSchema
    data: ISalesOrder | undefined
}

const DocumentInformation = ({ userData, data }: Props) => {
    return (
        <>

            {/* <div className='border-b border-black grid grid-cols-2'>
            <div className=''>
                
            </div>
        </div> */}
            <div className=' grid  '>
                <div className='text-2xl'>{userData.name}</div>
                <div className='block'>{userData.adress}</div>
                <div className=''>{userData.phone}</div>
                <div className=''>{userData.email}</div>
            </div>

            <div className='flex  place-content-end items-start '>
                <div className='flex flex-col gap-1 justify-items-end'>
                    <div className='grid grid-cols-2'>
                        Sales Order No:<div className='text-end'>{data?.invoice_No}</div>
                    </div>
                    <div className='grid grid-cols-2'>
                        Issue  Date:<div className='text-end'>{(data?.date === '') ? convertIsoDate(data?.createdAt).split('at')[0] : data?.date}</div>
                    </div>
                    <div className='grid grid-cols-2'>
                        Due  Date:<div className='text-end'>{(data?.due_Date === '') ? "Till Supplies" : convertIsoDate(data?.due_Date).split('at')[0]}</div>
                    </div>
                    <div className='grid grid-cols-2'>
                        Shipping Meathod :<div className='text-end'>{data?.shipping_Meathod}</div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default DocumentInformation