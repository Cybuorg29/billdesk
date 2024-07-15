import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../store/app/hooks'
import DashboardTable, { DashboardTableProps } from '../../../../components/ui/table/dashboardTable';
import { ISALES_ORDER_PRODUCT, ISalesOrder } from '../../Model/model';
import convertIsoDate from '../../../../utils/convertIsoDates';
import ViewIcon from '../../../../components/ui/icons/ViewIcon';
import { limitDecimalDigits } from '../../../../utils/limitDecimalDigits';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DeleteDialog from '../../Delete/DeleteDialog';
import { DeleteIcon } from '../../../../components/ui/icons/DeleteIcon';
// import DeleteDialog from '../'

type Props = {}

const Table = (props: Props) => {
    const { Sales_Orders, isLoaded } = useAppSelector(state => state.salesOrders);
    const navigate = useNavigate();
    const [IsOpen, setIsOpen] = useState(false);
    const [ToDeleteId, setToDeleteId] = useState('')
    const [ToDeleteNO, setToDeleteNO] = useState('')
    const [Index, setIndex] = useState<number | undefined>()

    class pushObj {
        no = ''
        Customer = ""
        Issue = ""
        Valid = ""
        status = ''
        constructor(no: string, customer: string, issue: string, valid: string, status: string) {
            this.no = no
            this.Customer = customer
            this.Issue = issue
            this.Valid = valid
            this.status = status
        }



    }
    const [array, setArray] = useState<DashboardTableProps>(initliseSalesOrderDashboard())



    function initliseSalesOrderDashboard(): DashboardTableProps {
        let array: DashboardTableProps = {
            dataArray: [],
            headers: ['Sales Order No.', 'Customer Name', "Issue Date", "Valid Till", 'Delivered', ''],
            Buttons: [],
            onclick: []
        }
        Sales_Orders.map((value: ISalesOrder, i: number) => {
            let isDelivered = 0;
            let validTill = 'Till Supplies';
            let totalQty = 0;
            let deliveredQuantity = 0;
            value?.product?.map((product: ISALES_ORDER_PRODUCT) => {
                totalQty = totalQty + product.quantity;
                deliveredQuantity = deliveredQuantity + product.delivered;
            })
            isDelivered = (deliveredQuantity / totalQty) * 100;
            if (value.due_Date !== '') validTill = value.due_Date;

            array.dataArray.push(new pushObj(value.invoice_No, value.to.name, convertIsoDate(value.createdAt), (validTill !== 'Till Supplies') ? convertIsoDate(validTill).split('at')[0] : 'Till Supplies', `${limitDecimalDigits(isDelivered)}%`))
            array.Buttons?.push([
                <ViewIcon color='black' onclick={() => { navigate(`/view/${value._id}/sales order`) }} tooltip='' key={`${value._id}`} />,
                <DeleteIcon color='black' onclick={() => { setToDeleteId(value._id); setToDeleteNO(value.invoice_No); setIndex(() => i); setIsOpen(true); }} tooltip='Delete' key={`del${value._id}`} />

            ])
        })



        console.table(array)

        return array

    }



    useEffect(() => {
        setArray(prev => initliseSalesOrderDashboard())
        // console.log(array)
        // initliseSalesOrderDashboard()
    }, [Sales_Orders])





    return (
        <div className='h-full w-full'>
            <DeleteDialog index={Index} _id={ToDeleteId} close={() => { setIsOpen(false) }} isOpen={IsOpen} no={ToDeleteNO} key={'DeleteDialog'} />
            <DashboardTable dataArray={array.dataArray} headers={array.headers} Buttons={array.Buttons} onclick={[]} key={'as'} />

        </div>
    )
}

export default Table