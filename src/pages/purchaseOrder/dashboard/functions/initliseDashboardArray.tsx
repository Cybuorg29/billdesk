import ArrowIconForward from "../../../../components/ui/icons/ArrowIconForward"
import { DeleteIcon } from "../../../../components/ui/icons/DeleteIcon"
import { DashboardTableProps } from "../../../../components/ui/table/dashboardTable"
import { converToInrFormat } from "../../../../utils/ConvertInrFormat"
import { ICREATE_PURCHASE_ORDER, IPURCHASE_ORDER } from "../../model/model"

export function initliseDashboardArray(array: IPURCHASE_ORDER[], UpdateDeleteOption: any, navigate: any): DashboardTableProps {
    let newArray: DashboardTableProps = {
        dataArray: [],
        headers: [' Order No', 'Billed To', 'Issue Date', 'Valid Till', 'Status', "Amount"],
        onclick: [],
        Buttons: []
    }

    class pushObj {
        no = ''
        billed_TO = ''
        date = ''
        valid = ''
        status = ''
        amount = 0
        constructor(no: string,
            billed_TO: string,
            date: string,
            valid: string,
            status: string,
            amount: number) {
            this.no = no
            this.billed_TO = billed_TO
            this.amount = converToInrFormat(amount)
            this.date = date
            this.valid = valid
            this.status = status
        }


    }

    array.map((value: IPURCHASE_ORDER, i) => {
        let com = 'Incomplete';
        value.product.map((product) => {
            if (product.quantity === product.delivered) {
                com = 'Completed';
            }
        })
        newArray.dataArray.push(new pushObj(value.po_NO, value.to.name, value.date, value.valid_Date, com, value.total));
        newArray.Buttons?.push([
            <>
                <DeleteIcon color="black" onclick={() => { UpdateDeleteOption(value, i) }} tooltip="Delete Purchase Order" key={value._id + i} />
                <ArrowIconForward onclick={() => { navigate(``) }} tooltip="" key={value.date + i} />
            </>
        ]
        )
    })
    newArray.Buttons?.reverse();
    newArray.dataArray.reverse();



    return newArray;

}