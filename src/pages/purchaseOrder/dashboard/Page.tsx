import React, { useEffect, useId, useState } from 'react'
import { useAppSelector } from '../../../store/app/hooks'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import Heading from './layouts/Heading'
import { InitliseInfoTabs } from './functions/initliseTabsArray'
import InfoTabs from '../../../components/ui/tabs/InfoTabs'
import { tabProps } from '../../../components/ui/tabs/Tabs'
import DashboardTable, { DashboardTableProps } from '../../../components/ui/table/dashboardTable'
import Dashboard from '../../Dashboard/Dashboard'
import { initliseDashboardArray } from './functions/initliseDashboardArray'
import Table from './layouts/Table'
import { table } from 'console'
import { toast } from 'react-toastify'

type Props = {}

const PurchaseOrderDashboard = (props: Props) => {
    const { purchase_Order } = useAppSelector(state => state.po);
    const [tabsArray, setTabsArray] = useState<tabProps[]>(InitliseInfoTabs(purchase_Order));

    const keys = {
        heading: useId(),
        button: useId(),
        button2: useId(),
        table: useId()
    }

    useEffect(() => {
        setTabsArray((prev) => InitliseInfoTabs(purchase_Order));
    }, [purchase_Order])

    return (
        <div className='p-5 h-full w-full flex flex-col gap-4'>

            <div className='h-[5%]  w-full  flex place-content-between items-center'>
                <Heading key={keys.heading} />
            </div>
            <div className='h-[20%] overflow-hidden'>
                <InfoTabs array={tabsArray} />
            </div>
            <div className='h-[75%] bg-component rounded-xl'>
                <Table key={keys.table} />
            </div>


        </div>
    )
}

export default PurchaseOrderDashboard