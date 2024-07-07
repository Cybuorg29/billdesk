import { toast } from "react-toastify"
import ArrowIconForward from "../../../../components/ui/icons/ArrowIconForward"
import { DeleteIcon } from "../../../../components/ui/icons/DeleteIcon"
import { DashboardTableProps } from "../../../../components/ui/table/dashboardTable"
import { converToInrFormat } from "../../../../utils/ConvertInrFormat"
import { IPURCHASE_ORDER } from "../../model/model"
import { limitDecimalDigits } from "../../../../utils/limitDecimalDigits"

export function initliseDashboardArray(array: IPURCHASE_ORDER[], UpdateDeleteOption: any, navigate: any): DashboardTableProps {
    let newArray: DashboardTableProps = {
        dataArray: [],
        headers: [' Order No', 'Billed To', 'Issue Date', 'Valid Till', 'Delivered', "Amount"],
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
        let totalQuantity = 0;
        let deliveredQuantity = 0;
        value.product.map((product) => {
            if (product.quantity === product.delivered) {
                com = 'Completed';
            }
            totalQuantity = totalQuantity + product.quantity;
            deliveredQuantity = deliveredQuantity + product.delivered;
        })
        const per = (deliveredQuantity / totalQuantity) * 100;
        newArray.dataArray.push(new pushObj(value.po_NO, value.to.name, value.date, value.valid_Date, `${limitDecimalDigits(per)}%`, value.total));
        newArray.Buttons?.push([
            <>
                <DeleteIcon color="black" onclick={() => { UpdateDeleteOption(value, i) }} tooltip="Delete Purchase Order" key={value._id + i} />
                <ArrowIconForward onclick={() => { navigate(`/purchase order/${value._id}/view`) }} tooltip="" key={value.date + i} />
            </>
        ]
        )
    })
    newArray.Buttons?.reverse();
    newArray.dataArray.reverse();



    return newArray;

}