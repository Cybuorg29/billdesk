import { tabProps } from "../../../../components/ui/tabs/Tabs";
import { ICREATE_PURCHASE_ORDER, IPURCHASE_ORDER } from "../../model/model";

export function InitliseInfoTabs(array: IPURCHASE_ORDER[]): tabProps[] {

    let newArray: tabProps[] = [
        {
            amount: 0,
            image: '',
            link: '',
            name: 'Total Purchase Order'
        },
        {
            amount: 0,
            image: '',
            link: '',
            name: 'Total Due Orders'
        },
        {
            amount: 0,
            image: '',
            link: '',
            name: 'Total Completed Orders'
        }
    ];

    array.map((index: IPURCHASE_ORDER) => {
        newArray[0].amount = newArray[0].amount + 1;
        newArray[1].amount = newArray[1].amount + 1;
        return
    })

    return newArray;

}