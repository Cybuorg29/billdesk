import { getDataByDateApi } from "../../../../api/v2/user/api";
import { IExpence } from "../../../../models/incomeAndExp/expenceInterface";
import { IIncome } from "../../../../models/incomeAndExp/incomeInterface";
import { Iinvoice } from "../../../../models/invoice/invoice.model";
import { responceObj } from "../../../../models/responce";
import { store } from "../../../../store/app/store";
import { incomeAndExpencesObjectSchema } from "../../../../store/features/IncomeAndExpences/IncomeAndExpences";
import { IbillsPaylable } from "../../../../store/features/bills/receivable/model";
import { convertToMongoDBAtlasISODate } from "../../../../utils/createMongodbDate";

export async function getAccountDataByDates(lower: any, upper: any): Promise<{
    payables: IbillsPaylable[],
    incomes: IIncome[],
    expences: IExpence[],
    invoices: Iinvoice[]
}> {
    try {

        const { token } = store.getState().auth;
        lower = convertToMongoDBAtlasISODate(lower)
        upper = convertToMongoDBAtlasISODate(upper)

        const { data } = await getDataByDateApi(token, lower, upper);
        const res: responceObj = data;
        if (res.code !== 200) {
            console.log(res.error)
            throw Error('Internal server error : cannot get Data')
        }
        console.log('res', res.package)
        return res.package


    } catch (err: any) {
        console.error(err.mesage);
        return {
            expences: [],
            incomes: [],
            invoices: [],
            payables: []
        };
    }
}