import { useEffect, useId, useState } from 'react'
import { useAppSelector } from '../../../store/app/hooks'
import Heading from './layouts/Heading'
import { InitliseInfoTabs } from './functions/initliseTabsArray'
import InfoTabs from '../../../components/ui/tabs/InfoTabs'
import { tabProps } from '../../../components/ui/tabs/Tabs'

import Table from './layouts/Table'


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