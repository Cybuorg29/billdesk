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
import { DeleteIcon } from '../../../../components/ui/icons/DeleteIcon'
import ViewIcon from '../../../../components/ui/icons/ViewIcon'
import ArrowIconForward from '../../../../components/ui/icons/ArrowIconForward'
import { useNavigate } from 'react-router-dom'

type Props = {}

const PayableDashboard: React.FC = (props: Props) => {

    const { invoice } = useAppSelector(state => state.payables);
    const navigate = useNavigate()
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
            name: 'Total Bills Payable'
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
    const [tableArray, setTableArray]: any = useState<DashboardTableProps>({
        dataArray: [],
        headers: ['Date', 'Billed From', 'P.O No.', 'status', 'Total'],
        onclick: () => { },
        Buttons: []
    })


    let dashboardArray: DashboardTableProps = {
        dataArray: [],
        headers: ['Date', 'Billed From', 'P.O No.', 'status', 'Total', 'actions'],
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
        let totalCount = 0;
        let unpaidCount = 0
        let unpaidTotal = 0;
        invoice.map((index: IbillsPaylable, i: number) => {
            dashboardArray.dataArray.push(new arrayObj(convertIsoDate(index.createdAt), index.billed_From.name, index.po, converToInrFormat(index.total), (index.isPaid) ? 'Paid' : 'Unpaid'))
            totalCount = ++totalCount
            if (index.isPaid) { }
            else {
                unpaidCount = ++unpaidCount;
                unpaidTotal = unpaidTotal + index.total
            }
            dashboardArray.Buttons?.push([<DeleteIcon color='black' onclick={() => { }} tooltip='Delete' key={index._id + '1'} />, <ArrowIconForward onclick={() => { navigate(`/view/bills/${index._id}/payable`) }} tooltip='Forward' key={index._id + 3} />]);

        })
        console.log('newArray', dashboardArray)
        let newTabs = tabArray;
        newTabs[0].amount = (totalCount);
        newTabs[1].amount = unpaidCount;
        newTabs[2].amount = converToInrFormat(unpaidTotal);
        setTabArray(newTabs)
        setTableArray(dashboardArray)

    }




    useEffect(() => {
        InitliseTable()
    }, [invoice])


    return (
        <div className='p-5 h-full w-full flex flex-col gap-5'>
            <div className='h-[5%] flex place-content-between'>
                <PageHeading name='Bills Payables' key={keys.heading} />
                <div>
                    <SolidButton color='black' innerText='Insert New ' onClick={() => { navigate(`/create/billspayable`) }} key={keys.InsertNew} />
                </div>
            </div>
            <div className='h-[15%]'>
                <InfoTabs array={tabArray} key={keys.infotabs} />
            </div>

            {/* table */}

            <div className=' bg-component h-[80%] rounded-xl  '>
                <DashboardTable dataArray={tableArray.dataArray} headers={tableArray.headers} onclick={() => { }} Buttons={tableArray.Buttons} key={'itit'} />

            </div>

        </div>
    )
}

export default PayableDashboard 