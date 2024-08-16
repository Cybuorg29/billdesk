import React, { useEffect, useState } from 'react'
import CreateDebitNote from '../create/Page'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import Table from './layouts/Page'
import DashboardTable, { DashboardTableProps } from '../../../components/ui/table/dashboardTable'
import { useAppSelector } from '../../../store/app/hooks'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import convertIsoDate from '../../../utils/convertIsoDates'
import { converToInrFormat } from '../../../utils/ConvertInrFormat'
import ViewIcon from '../../../components/ui/icons/ViewIcon'
import ViewDebitNoteDialog from '../view/Page'
import DeleteDialog from '../delete/DeleteDialog'
import { DeleteIcon } from '../../../components/ui/icons/DeleteIcon'

type Props = {}

const Page = (props: Props) => {
    const [IsCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
    const [IsViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false);
    const [IsDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)
    const [deleteId, setDeleteId] = useState('');
    const [SelectedViewId, setSelectedViewId] = useState('')
    const { DebitNote } = useAppSelector(state => state)
    const [DashBoardArray, setDashBoardArray] = useState<DashboardTableProps>({
        dataArray: [],
        headers: [],
        Buttons: [],
        onclick: []
    })


    class pushObj {
        no = ''
        in_No = ''
        date = ''
        amount = ''
        constructor(
            no: string,
            in_No: string,
            date: string,
            amount: number) {
            this.no = no
            this.in_No = in_No
            this.date = convertIsoDate(date) || ''
            this.amount = converToInrFormat(amount)

        }
    }

    function initliseDashBoardArray() {
        let newArray: DashboardTableProps = {
            dataArray: [],
            headers: ["Note No", "Invoice No", "Date", "Amount", "Actions"],
            Buttons: [],
            onclick: []
        }



        DebitNote.notes?.map((value) => {
            newArray.dataArray.push(new pushObj(value.note_No, value.against_Invoice_No, value.createdAt, value.total));
            newArray.Buttons?.push([<ViewIcon color='black' onclick={() => { setSelectedViewId(value._id); setIsViewDialogOpen(true) }} tooltip='View' />, <DeleteIcon color='black' onclick={() => { setDeleteId(value._id); setIsDeleteDialogOpen(true) }} tooltip='delete' />])
        })
        console.log(newArray)
        return newArray;
    }



    useEffect(() => {
        setDashBoardArray(() => initliseDashBoardArray())
    }, [DebitNote])

    return (
        <div className='h-full w-full p-5'>
            <DeleteDialog close={() => setIsDeleteDialogOpen(false)} id={deleteId} open={IsDeleteDialogOpen} />
            <CreateDebitNote open={IsCreateDialogOpen} close={() => { setIsCreateDialogOpen(false) }} />
            <ViewDebitNoteDialog close={() => { setIsViewDialogOpen(false) }} id={SelectedViewId} open={IsViewDialogOpen} />
            <div className='h-[8%] flex place-content-between'>
                <PageHeading name='Debit Notes' />
                <div className='flex place-content-center'>
                    <SolidButton color='black' innerText='Add +' onClick={() => { setIsCreateDialogOpen(true) }} />
                </div>
            </div>
            <div className='w-full h-[90%]  bg-component rounded-lg '>
                <DashboardTable dataArray={DashBoardArray.dataArray} headers={DashBoardArray.headers} Buttons={DashBoardArray.Buttons} onclick={[]} />
            </div>

        </div>
    )
}

export default Page