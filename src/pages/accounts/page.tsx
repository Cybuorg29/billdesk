import React, { useEffect, useId, useState } from 'react'
import { tabProps } from '../../components/ui/tabs/Tabs'
import { useAppSelector } from '../../store/app/hooks'
import { getConnection } from '../../store/actions/connections/set'
import InfoTabs from '../../components/ui/tabs/InfoTabs'
import PageHeading from '../../components/ui/Page Heading/PageHeading'
import Table from './layouts/Table'

type Props = {}

const Accounts = (props: Props) => {

    const { connections, isConnection } = (useAppSelector(state => state.connections))
    const { istoken } = useAppSelector(state => state.auth)
    const tabId = useId()



    const keys = {
        pageHeading: useId()
    }

    const [tabarray, setTabArray] = useState<tabProps[]>([
        {
            image: '',
            link: '',
            name: 'Total Clients',
            amount: 0,
        },
        {
            amount: 0,
            link: '',
            image: '',
            name: 'Online Clients'
        },
        {
            amount: 0,
            link: '',
            name: 'Offline Clients',
            image: '',
        },
    ])
    useEffect(() => {
        if (!isConnection) {
            getConnection()
        }
    }, [istoken]);

    useEffect(() => {
        setTabArray(handleTabsData());
    }, [isConnection, connections])

    function handleTabsData() {

        const array: tabProps[] = [
            {
                image: '',
                link: '',
                name: ' Clients',
                amount: 0,
            },
            {
                amount: 0,
                link: '',
                image: '',
                name: ''
            },
            {
                amount: 0,
                link: '',
                name: 'Offline Clients',
                image: '',
            },
        ]

        connections.client.map((index) => {
            array[0].amount = array[0].amount + 1;
            if (index.type) {
                array[1].amount = array[1].amount + 1;
            } else {
                array[2].amount = array[2].amount + 1;
            }

        })
        connections.supplier.map((index) => {
            array[0].amount = array[0].amount + 1;
            if (index.type) {
                array[1].amount = array[1].amount + 1;
            } else {
                array[2].amount = array[2].amount + 1;
            }

        })
        return array

    }
    return (
        <div className='h-full w-full p-5 '>
            {/* <InfoTabs array={tabarray} key={tabId} /> */}
            <div className='h-[5%]'>
                <PageHeading name='Accounts' key={keys.pageHeading} />
            </div>

            <div className=' h-[95%] overflow-auto  bg-component rounded-xl '>
                <Table />
            </div>

        </div>
    )
}

export default Accounts