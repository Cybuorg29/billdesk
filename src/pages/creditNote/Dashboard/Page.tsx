import React, { useEffect, useState } from 'react'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import CreateCreditNoteDialog from '../create/Page'
import DashboardTable, { DashboardTableProps } from '../../../components/ui/table/dashboardTable'
import ViewIcon from '../../../components/ui/icons/ViewIcon'
import { useAppSelector } from '../../../store/app/hooks'
import convertIsoDate from '../../../utils/convertIsoDates'
import { converToInrFormat } from '../../../utils/ConvertInrFormat'
import { DeleteIcon } from '../../../components/ui/icons/DeleteIcon'
import DeleteCreditNoteDialog from '../delete/DeleteCreditNoteDialog'
import ViewCreditNoteDialog from '../view/ViewCreditNoteDialog'

type Props = {}

const Page = (props: Props) => {
    const [isCreateDialogOpen, setisCreateDialogOpen] = useState<boolean>(false);
    const { CreditNote } = useAppSelector(state => state);
    const [IsDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState('')
    const [IsViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false)
    const [SelectedViewId, setSelectedViewId] = useState('')
    const [dashboardArray, setDashboardArray] = useState<DashboardTableProps>({
        dataArray: [],
        headers: ["Note No", 'Invoice No', "Date", 'Actions'],
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



        CreditNote.notes?.map((value) => {
            newArray.dataArray.push(new pushObj(value.note_No, value.against_Invoice_No, value.createdAt, value.total));
            newArray.Buttons?.push([
                <ViewIcon color='black' onclick={() => { setSelectedViewId(value._id); setIsViewDialogOpen(true) }} tooltip='View' />,
                <DeleteIcon color='black' onclick={() => { setDeleteId(value._id); setIsDeleteDialogOpen(true) }} tooltip='delete' />])
        })

        console.log(newArray)
        return newArray;
    }


    // useEffect(() => {
    //     setDashboardArray(()=>initliseDashBoardArray())
    // }, [dashboardArray, CreditNote])



    useEffect(() => {
        setDashboardArray(() => initliseDashBoardArray())
    }, [CreditNote])
    return (
        <div className='w-full h-full p-5'>
            <DeleteCreditNoteDialog id={deleteId} close={() => setIsDeleteDialogOpen(false)} no={CreditNote.notes.find((value) => value._id === deleteId)?.note_No || ''} open={IsDeleteDialogOpen} />
            <CreateCreditNoteDialog close={() => setisCreateDialogOpen(false)} open={isCreateDialogOpen} />
            <ViewCreditNoteDialog id={SelectedViewId} close={() => setIsViewDialogOpen(false)} open={IsViewDialogOpen} />
            <div className='h-[10%] flex place-content-between'>
                <PageHeading name='Credit Note' />
                <div className='grid grid-cols-2 place-content-center'>
                    <SolidButton color='black' innerText='Add + ' onClick={() => { setisCreateDialogOpen(true) }} />
                </div>

            </div>
            <div className='bg-component h-[90%] w-full rounded-lg'>
                <DashboardTable dataArray={dashboardArray.dataArray} headers={dashboardArray.headers} Buttons={dashboardArray.Buttons || []} onclick={[]} />

            </div>

        </div>
    )
}

export default Page