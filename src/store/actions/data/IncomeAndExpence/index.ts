import { toast } from "react-toastify";
import { store } from "../../../app/store";
import { change } from "../../../features/loader/loaderSlice";
import { actionPayload } from "../../../payload/payloadModel";
import { setIncomeAndExpence } from "../../../features/IncomeAndExpences/IncomeAndExpences";
import { getMonthlyExpences, getMonthlyIncome } from "../../../../api/v2/transactions/api";
import { IcreateInvoice, Iinvoice } from "../../../../models/invoice/invoice.model";
import { addIncomeApi } from "../../../../api/v2/income";
import { responceObj } from "../../../../models/responce";
import { ICreateIncome } from "../../../../models/incomeAndExp/incomeInterface";
import { setInvoiceAction } from "../../invoice/set";
import { setInovices } from "../../../features/invoice/invoiceSlice";
import { invoiceActions } from "../../../reducers/invoice/invoice.reducer";
import { EmployeeData } from "../employee/get";
import { isToken } from "typescript";
import { getIncomeAndExpencesByDatesApi } from "../../../../api/dataServices";
import convertIsoDate from "../../../../utils/convertIsoDates";


export const changeIncomeAndExpenceByMonth = async (month: number) => {
    try {
        store.dispatch(change());
        const { auth } = store.getState()
        const { token } = auth
        const data: any = await getData(token, month);
        if (data?.code !== 200) {
            toast.error(data?.message);
            store.dispatch(change());
        } else {
            console.log('data', data)
            const payload: actionPayload = {
                type: 'initlise',
                data: {
                    income: data?.income,
                    expences: data?.expence,
                    month: month
                }
            }
            store.dispatch(setIncomeAndExpence(payload))
            EmployeeData();
            store.dispatch(change())
        }


    } catch (err: any) {
        console.log(err?.message);
        toast.error("an error occured ")
        store.dispatch(change())
    }
}

async function getData(token: string, month: number) {
    let respose = {
        code: 200,
        income: [],
        expence: []
    }
    try {
        let income = await getMonthlyIncome(token, month);
        let expences = await getMonthlyExpences(token, month);
        if (income.data?.code !== 200) throw new Error('internal server error at income');
        if (expences.data?.code !== 200) throw new Error('internal server error  at expence');
        respose.income = income.data?.package;
        respose.expence = expences.data?.package;
        return respose;
    } catch (err: any) {
        console.log(err.message);
        respose.code = 500
        return respose

    }


}


export async function addIncome({ income, navigate }: { income: ICreateIncome, navigate?: any }) {
    try {

        store.dispatch(change());
        const { token } = store.getState().auth;
        const { data } = await addIncomeApi({ ...income, token });
        const res: responceObj = data;
        if (res.code !== 200) {
            throw new Error(res.error);
        } else {
            const payload: actionPayload = {
                data: res.package,
                type: 'pushIncome'
            }
            store.dispatch(setIncomeAndExpence(payload));
            //  window.location.reload();
            setInvoiceAction();
            toast.success('income added sucessfully')
            if (navigate) {
                navigate('/dashboard/Transactions')
            }

        }

        store.dispatch(change());







    } catch (err: any) {
        console.log(err?.message);
        toast.error('an error occured please try again')
        store.dispatch(change());
    }
}


interface dates {
    upper: string
    lower: string
}

export async function changeIncomeAndExpenceByDates(dates: dates) {

    try {

        const { istoken, token } = store.getState().auth;

        if (!isToken) {

        } else {

            console.log('dates', dates.lower, dates.upper);


            const [lYear, lmonth, ldate] = dates.lower.split('-');
            const [uYear, umonth, udate] = dates.upper.split('-');

            console.log(uYear, umonth, udate);
            console.log(lYear, lmonth, ldate);
            const lowerDate: any = `${lYear}-${lmonth}-${ldate}T18:30:00.000Z`
            const upperDate: any = `${uYear}-${umonth}-${udate}T18:30:00.000Z`

            const { data } = await getIncomeAndExpencesByDatesApi(token, lowerDate, upperDate);
            let res: responceObj = data;
            console.log(res)

            if (res.code != 200) {
                throw new Error(res.message);
            }
            const packages = {
                income: res.package.income,
                expences: res.package.expences,
                to: dates.lower,
                from: dates.upper
            }

            const payload: actionPayload = {
                data: packages,
                type: 'change'
            }
            store.dispatch(setIncomeAndExpence(payload));
            toast.success('Data Loaded')

        }


    } catch (err: any) {
        console.log(err)
        toast(err.message)
    }


}