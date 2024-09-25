import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../store/app/hooks'
import { setInvoiceAction } from '../store/actions/invoice/set';
import { initliseCreditNoteAction } from '../store/actions/creditNote/action';
import { setPayablesAction } from '../store/actions/bills/payable';
import { initliseDebitNote } from '../store/actions/debitNote/action';
import InvoiceDashboard from '../pages/invoice/dashboard/page';
import TrackerChart from '../components/charts/tracker/TrackerChart';
import Button from './components/Button';
import IncomeAndExpenceSelect from '../components/Select/IncomeAndExpenceSelect';
import DateSelect from './components/DateSelect';
import PageHeading from './components/PageHeading';
import { converToInrFormat } from '../utils/ConvertInrFormat';
import IncomeAndExpencesChart from './components/IncomeAndExpencesChart';
import { updateTopTabs } from '../pages/incomeAndExpences/Dashboard/functions/updateTopTabs';
import CheckInvoiceState from './invoice/CheckInvoiceState';
import MobileInvoiceDashboard from './invoice/Page';

type Props = {}

const MobileDashboard = (props: Props) => {
    const { invoice, CreditNote, DebitNote, payables, incomeAndExpence } = useAppSelector(state => state);
    const [totalIncAndExp, setTotalIncAndExp] = useState({
        inc: 0,
        exp: 0
    })

    async function calTotals() {
        const get: any = updateTopTabs(incomeAndExpence.income, incomeAndExpence.expences);
        setTotalIncAndExp(prev => { return { ...prev, inc: (get[0].amount || 0), exp: get[1].amount } })


    }

    async function checkStates() {
        if (!invoice.isLoaded) setInvoiceAction();
        if (!CreditNote.isLoaded) initliseCreditNoteAction();
        if (!payables.isLoaded) setPayablesAction();
        if (!DebitNote.isLoaded) initliseDebitNote();
        // if(!incomeAndExpence.isExpences||!incomeAndExpence.isIncome) 
    }

    useEffect(() => {
        calTotals()
    }, [incomeAndExpence])


    return (
        <div className='w-full h-full overflow-auto '>
            <div className='2%'>
                <PageHeading name='Dashboard' />
            </div>
            <div className=' h-[20%] text-table'>
                <DateSelect />

            </div>
            <div className='h-[15%] overflow-auto'>
                <div className='h-full grid grid-cols-2 gap-3  p-3'>
                    <div className='h-full rounded-xl flex flex-col gap-2 bg-component border p-2'>
                        <div className='text-black'>Total Income</div>
                        <div className='text-xl text-green-600 pl-2'>{converToInrFormat(totalIncAndExp.inc)}</div>
                    </div>
                    <div className='h-full rounded-xl flex flex-col gap-2 bg-component border p-2'>
                        <div className='text-black'>Total Expences</div>
                        <div className='text-xl text-red-600 pl-2'>{converToInrFormat(totalIncAndExp.exp)}</div>
                    </div>

                </div>
            </div>
            <div className='h-[30%] p-3'>
                <IncomeAndExpencesChart />
            </div>
            <div className='w-full h-full '>
                <PageHeading name='Invoices' />
                <div className='w-full h-full p-3'>
                    <CheckInvoiceState children={<MobileInvoiceDashboard />} />

                </div>

            </div>
            {/* <InvoiceDashboard /> */}

        </div>
    )
}

export default MobileDashboard