import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useAppSelector } from '../../store/app/hooks'
import { ArcElement, Chart } from 'chart.js'
import { ResponsiveContainer } from 'recharts'
import IncAndExpDashboard from '../incomeAndExpences/Dashboard/IncAndExpDashboard'
import Table from '../invoice/dashboard/layouts/Table'
import { setInvoiceAction } from '../../store/actions/invoice/set'
import PageHeading from '../../components/ui/Page Heading/PageHeading'
Chart.register(ArcElement)
type Props = {}

const Dashboard = (props: Props) => {
    const { totalExpences, totalIncome } = useAppSelector(state => state.incomeAndExpence)
    const invoice = useAppSelector(state => state.invoice)
    const [type, setType] = useState('Total Invoice');


    const data = {
        labels: [
            'Expence',
            'Income',

        ],
        datasets: [{
            label: 'My First Dataset',
            data: [totalExpences, totalIncome],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'Green',
            ],
            hoverOffset: 4
        }]
    };

    useLayoutEffect(() => {
        if (!invoice.isLoaded) {
            setInvoiceAction();
        }

    }, [])


    return (
        // <div className='w-full h-full overflow-auto  flex flex-col gap-5'>
        //     <div className='min-h-full'>
        //     </div>
        // </div>
        <>
            <IncAndExpDashboard />
            <div className='bg-component h-full overflow-auto rounded-xl m-4  '>
                <div className='p-3'>
                    <PageHeading name='Sales Invoices' />
                </div>
                <Table set={() => { }} type={type} />
            </div>
        </>
    )
}

export default Dashboard