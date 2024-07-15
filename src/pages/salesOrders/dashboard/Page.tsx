import React from 'react'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../store/app/hooks'
import { ISalesOrder } from '../Model/model'
import Table from './layouts/Table'

type Props = {}

const SalesOrderDashboard = (props: Props) => {
    const navigate = useNavigate()
    return (
        <div className='w-full h-full p-5 '>
            <div className='h-[8%] flex w-full place-content-between'>
                <PageHeading name='Sales Orders' />
                <div className='flex items-center'>
                    <SolidButton color='black' innerText='Create Invoice + ' onClick={() => { }} />
                    <SolidButton color='black' innerText='Create New +' onClick={() => { navigate("/sales order/create") }} />
                </div>
            </div>
            <div className='h-[90%] rounded-xl bg-component'>
                <Table />
            </div>

        </div>
    )
}

export default SalesOrderDashboard