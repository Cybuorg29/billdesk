import { IExpence } from "../../../../models/incomeAndExp/expenceInterface";
import { IIncome } from "../../../../models/incomeAndExp/incomeInterface";
import { converToInrFormat } from "../../../../utils/ConvertInrFormat";

export function updateTopTabs(incomes: IIncome[], expences: IExpence[]) {

    try {

        let totalIncome = 0, totalExpences = 0

        incomes.map((index: IIncome) => totalIncome = totalIncome + index.amount);
        expences.map((index: IExpence) => totalExpences = totalExpences + index.amount);

        return [
            {
                name: "Total Income",
                image: '',
                amount: converToInrFormat(totalIncome),
                link: "/view/all/income",
            },
            {
                name: "Total Expences",
                amount: converToInrFormat(totalExpences),
                image: '',
                link: "/view/all/10/expences",
            },
            {
                name: "Balance",
                amount: converToInrFormat(totalIncome - totalExpences),
                image: "",
                link: "/",
            },
        ];

    } catch (err: any) {
        console.log(err.message);
    }

}