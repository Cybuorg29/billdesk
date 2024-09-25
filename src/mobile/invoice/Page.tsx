import React from 'react'
import { useAppSelector } from '../../store/app/hooks'
import Table from '../../pages/invoice/dashboard/layouts/Table'

type Props = {
}

const MobileInvoiceDashboard = (props: Props) => {
    const { invoices, isLoaded } = useAppSelector(state => state.invoice)
    return (
        <div className='w-full h-full  bg-component rounded-xl text-sm'>
            <Table set={() => { }} type='' />


        </div>
    )
}

export default MobileInvoiceDashboard 