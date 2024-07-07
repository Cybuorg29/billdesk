import React, { useEffect, useId, useState } from 'react'
import { setPayablesAction } from '../../../../store/actions/bills/payable'
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
import DeleteBillsPayableDialog from '../delete/Dialog'
import { toast } from 'react-toastify'

type Props = {}

const PayableDashboard: React.FC = (props: Props) => {

    const { invoice } = useAppSelector(state => state.payables);
    const [deleteDialog, setDeleteDialog] = useState(
        {
            name: '',
            date: '',
            isOpen: false,
            invocieNo: '',


        }
    )
    const navigate = useNavigate()
    const keys = {
        heading: useId(),
        InsertNew: useId(),
        infotabs: useId(),
        createExpence: useId()
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
        headers: ['P.O No.', 'Date', 'Billed From', 'status', 'Total', 'actions'],
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

    function InitliseTable(): DashboardTableProps {
        let newArray: any = []
        let totalCount = 0;
        let unpaidCount = 0
        let unpaidTotal = 0;
        invoice.map((index: IbillsPaylable, i: number) => {
            dashboardArray.dataArray.push(new arrayObj(index.po, convertIsoDate(index.createdAt), index.billed_From.name, converToInrFormat(index.total), (index.isPaid) ? 'Paid' : 'Unpaid'))
            totalCount = ++totalCount
            if (index.isPaid) { }
            else {
                unpaidCount = ++unpaidCount;
                unpaidTotal = unpaidTotal + index.total
            }
            dashboardArray.Buttons?.push([<DeleteIcon color='black' onclick={() => { setDeleteDialog(prev => { return { ...prev, isOpen: true, date: convertIsoDate(index.createdAt), name: index.billed_From.name, invocieNo: index._id } }) }} tooltip='Delete' key={index._id + '1'} />, <ArrowIconForward onclick={() => { navigate(`/view/bills/${index._id}/payable`) }} tooltip='Forward' key={index._id + 3} />]);

        })
        console.log('newArray', dashboardArray)
        let newTabs = tabArray;
        newTabs[0].amount = (totalCount);
        newTabs[1].amount = unpaidCount;
        newTabs[2].amount = converToInrFormat(unpaidTotal)
        dashboardArray.dataArray.reverse();
        dashboardArray.Buttons?.reverse();
        setTabArray((prev) => newTabs)
        // setTableArray((prev: any) => dashboardArray)
        // toast('Dashboard Updated')
        return dashboardArray;

    }




    useEffect(() => {
        setTableArray((prev: any) => InitliseTable())
    }, [invoice])


    return (
        <div className='p-5 h-full w-full flex flex-col gap-5'>
            <DeleteBillsPayableDialog close={() => { setDeleteDialog(prev => { return { ...prev, isOpen: false } }) }} date={deleteDialog.date} invoiceNo={deleteDialog.invocieNo} isOpen={deleteDialog.isOpen} name={deleteDialog.name} onclick={() => { }} key={'DeleteDialog'} />
            <div className='h-[5%] flex place-content-between'>
                <PageHeading name='Purchase Invoices' key={keys.heading} />
                <div className='flex gap-4 h-full'>
                    <SolidButton color='black' innerText='Insert New ' onClick={() => { navigate(`/create/billspayable`) }} key={keys.InsertNew} />
                    <SolidButton color='black' innerText='Record Payables payment ' onClick={() => { navigate(`/create/800/expence`) }} key={keys.createExpence} />
                </div>
            </div>
            <div className='h-[15%]'>
                <InfoTabs array={tabArray} key={keys.infotabs} />
            </div>

            {/* table */}

            <div className=' bg-component h-[80%] overflow-auto rounded-xl  '>
                <DashboardTable dataArray={tableArray.dataArray} headers={tableArray.headers} onclick={() => { }} Buttons={tableArray.Buttons} key={'itit'} />
            </div>

        </div>
    )
}

export default PayableDashboard 