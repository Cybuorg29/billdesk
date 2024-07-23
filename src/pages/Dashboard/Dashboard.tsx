import React, { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { useAppSelector } from '../../store/app/hooks'
import { ArcElement, Chart } from 'chart.js'
import IncAndExpDashboard from '../incomeAndExpences/Dashboard/IncAndExpDashboard'
const Table = lazy(() => import('../invoice/dashboard/layouts/Table'))
import { setInvoiceAction } from '../../store/actions/invoice/set'
import PageHeading from '../../components/ui/Page Heading/PageHeading'
const InvoiceDashboard = lazy(() => import('../invoice/dashboard/page'));
const SalesOrderDashboard = lazy(() => import('../salesOrders/dashboard/Page'))
const CheckStateBillsPayable = lazy(() => import('../bills/payable/checkState'))
// import BillsPayable from '../bills/payable/dashboard/page'
const BillsPayable = lazy(() => import('../bills/payable/dashboard/page'))
const CheckSalesOrderState = lazy(() => import("../salesOrders/CheckState"))
Chart.register(ArcElement);
type Props = {}

const Dashboard = (props: Props) => {
    const { totalExpences, totalIncome } = useAppSelector(state => state.incomeAndExpence)
    const invoice = useAppSelector(state => state.invoice)
    const [type, setType] = useState('Total Invoice');
    const { istoken, token } = useAppSelector(state => state.auth)


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

    }, [token, istoken])


    return (
        <>
            <IncAndExpDashboard />
            <Suspense>
                <InvoiceDashboard />
                <CheckStateBillsPayable children={<BillsPayable />} />
                <CheckSalesOrderState children={<SalesOrderDashboard />} />
            </Suspense>
        </>
    )
}

export default Dashboard