import React, { useEffect, useId, useState } from 'react'
import { setPayablesAction } from '../../../../store/actions/bills/receivable'
import { useAppSelector } from '../../../../store/app/hooks'
import { IbillsPaylable } from '../../../../store/features/bills/receivable/model'
import convertIsoDate from '../../../../utils/convertIsoDates'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'
import PageHeading from '../../../../components/ui/Page Heading/PageHeading'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'
import DashboardTable, { DashboardTableProps } from '../../../../components/ui/table/dashboardTable'
import { tabProps } from '../../../../components/ui/tabs/Tabs'
import InfoTabs from '../../../../components/ui/tabs/InfoTabs'

type Props = {}

const PayableDashboard: React.FC = (props: Props) => {

    const { invoice } = useAppSelector(state => state.payables);
    const keys = {
        heading: useId(),
        InsertNew: useId(),
        infotabs: useId()
    }
    const [tabArray, setTabArray] = useState<tabProps[]>([
        {
            amount: 0,
            image: '',
            link: '',
            name: 'Total Invoices'
        }
        ,
        {
            amount: 0,
            image: '',
            link: '',
            name: 'Total Due'
        }
        ,
        {
            amount: 0,
            image: '',
            link: '',
            name: 'Amount Due'
        }
    ])
    const [tableArray, setTableArray] = useState<DashboardTableProps>({
        dataArray: [],
        headers: ['Date', 'Billed From', 'P.O No.', 'status', 'Total'],
        onclick: () => { },
        Buttons: []
    })


    const dashboardArray: DashboardTableProps = {
        dataArray: [],
        headers: ['Date', 'Billed From', 'P.O No.', 'status', 'Total'],
        onclick: () => { },
        Buttons: []

    }

    class arrayObj {
        Date = ''
        Billed_From = ''
        PO = ''
        isPaid = ''
        Total = ''
        constructor(Date: any, Billed_From: any, PO: any, Total: any, isPaid: any) {
            this.Date = Date;
            this.Billed_From = Billed_From
            this.PO = PO
            this.isPaid = isPaid
            this.Total = Total
        }
    }

    function InitliseTable() {
        let newArray: any = []
        invoice.map((index: IbillsPaylable, i: number) => {
            dashboardArray.dataArray.push(new arrayObj(convertIsoDate(index.createdAt), index.billed_From.name, index.po, converToInrFormat(index.total), (index.isPaid) ? 'Paid' : 'Unpaid'))
        })
        console.log('newArray', newArray)
        setTableArray(dashboardArray)

    }




    useEffect(() => {
        InitliseTable()
    }, [])


    return (
        <div className='p-5 h-full w-full flex flex-col gap-5'>
            <div className='h-[5%] flex place-content-between'>
                <PageHeading name='Bills Payables' key={keys.heading} />
                <div>
                    <SolidButton color='black' innerText='Insert New ' onClick={() => { }} key={keys.InsertNew} />

                </div>
            </div>
            <div className='h-[15%]'>
                <InfoTabs array={tabArray} key={keys.infotabs} />
            </div>

            {/* table */}

            <div className=' bg-component h-[80%] rounded-xl  '>
                {/* <div className='grid grid-cols-4 pl-5  border-b uppercase font-source text-grayFont  border-black'>
                    <div className='px-6 py-4  sticky text-grayFont'>Date</div>
                    <div className='px-6 py-4  sticky text-grayFont'>Billed From</div>
                    <div className='px-6 py-4  sticky text-grayFont'>Po No</div>
                    <div className='px-6 py-4  sticky text-grayFont'>Total</div>
                </div>
                {
                    invoice.map((index: IbillsPaylable) => {
                        return <>
                            <div className='grid grid-cols-4  border-b border-black'>
                                <div className='px-6 py-3  sticky '>{convertIsoDate(index.createdAt)}</div>
                                <div className='px-6 py-3  sticky '>{index.billed_From.name}</div>
                                <div className='px-6 py-3  sticky '>{index.po}</div>
                                <div className='px-6 py-3  sticky '>{converToInrFormat(index.total)}</div>
                            </div>
                        </>
                    })
                } */}


                <DashboardTable dataArray={tableArray.dataArray} headers={dashboardArray.headers} onclick={() => { }} Buttons={[]} key={'itit'} />

            </div>

        </div>
    )
}

export default PayableDashboard