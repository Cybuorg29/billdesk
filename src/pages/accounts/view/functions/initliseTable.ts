import { pushProduct } from './../../../../api/inventory/index';
import { clientModelObj } from "../../../../models/Client/ClientModel";
import { IExpence } from "../../../../models/incomeAndExp/expenceInterface";
import { IIncome } from "../../../../models/incomeAndExp/incomeInterface";
import { Iinvoice } from "../../../../models/invoice/invoice.model";
import { store } from "../../../../store/app/store";
import { incomeAndExpencesObjectSchema } from "../../../../store/features/IncomeAndExpences/IncomeAndExpences";
import { IbillsPaylable } from "../../../../store/features/bills/receivable/model";
import { sortByDate } from "../../../../utils/SortDates";
import convertIsoDate from "../../../../utils/convertIsoDates";
import { toast } from 'react-toastify';
import { convertToMongoDBAtlasISODate } from '../../../../utils/createMongodbDate';

interface DataObj {
    payables: IbillsPaylable[],
    incomes: IIncome[],
    expences: IExpence[],
    invoices: Iinvoice[]
}

interface objInterface {
    isPayment: boolean
    amount: number
    particular: string
    date: string
    isExpence: boolean
}

export async function initliseTableData({ expences, incomes, invoices, payables }: DataObj, id: any, upper: any, lower: any): Promise<{ array: any[], balance: number }> {
    const { connections, isConnection } = store.getState().connections;
    let account: any = {}
    lower = convertToMongoDBAtlasISODate(lower)
    upper = convertToMongoDBAtlasISODate(upper)


    let newArray: any[] = [];
    let balance: number = 0;
    // console.log('expences', expences)
    if (!expences || !incomes || !payables || !invoices) return { array: [], balance: 0 }

    class Obj implements objInterface {
        date = ''
        isPayment = false
        amount = 0
        particular = ''
        isExpence = false

        constructor(
            amount: number,
            date: string,
            isPayament: boolean,
            particular: string,
            isExpence?: boolean
        ) {
            this.date = date
            this.isPayment = isPayament
            this.particular = particular
            this.date = date
            this.amount = amount
            if (isExpence) {
                this.isExpence = isExpence
            }
        }

    }

    [...connections.client, ...connections.supplier].map((index: clientModelObj) => {
        if (index._id === id) {
            account = index

        }
    });

    invoices.map((index: Iinvoice) => {
        if ((index.billed_To.name === account.name || index.billed_To.gstin === account.gstin)) {
            newArray.push(new Obj(index.grand_Total, index.createdAt, false, `Invoice No: ${index.invoice_No} due to ${index.billed_To.name}`, false));
        }
    })
    expences.map((index: IExpence) => {
        if (index.category === ('800' || '200')) {

            payables.map((invoice: IbillsPaylable) => {
                if (invoice._id === index.uid) {
                    newArray.push(new Obj(index.amount, index.createdAt, true, index.title, true));
                }
            })
            if (index.uid === id) {
                newArray.push(new Obj(index.amount, index.createdAt, true, index.title, true));

            }


        }
    })
    payables.map((index: IbillsPaylable) => {
        newArray.push(new Obj(index.total, index.createdAt, false, `Invoice due From ${index.billed_From.name}`, true));
    })

    incomes.map((index: IIncome) => {
        invoices.map((invoice: Iinvoice) => {
            if (index.invoiceId == invoice._id) {
                return newArray.push(new Obj(index.amount, index.createdAt, true, index.title, false));
            }

        })

    })


    let sortedArray: any[] = []
    newArray.map((index: any) => {
        if (index?.date >= upper && index?.date <= lower) return sortedArray.push(index)

    })





    newArray.map((index: any) => {
        let bal = 0
        if (index.date < upper) {
            // balance = balance + index.amount
            if (!index.isExpence && !index.isPayment) {
                bal = bal + index.amount
            }
            else if (!index.isExpence && index.isPayment) {
                bal = bal - index.amount
            }
            else if (index.isExpence && index.isPayment) {
                bal = bal + index.amount
            }
            else if (index.isExpence && !index.isPayment) {
                bal = bal - index.amount
            }
            balance = balance + bal
        }
    })

    newArray = sortedArray.sort((a: any, b: any) => {
        const aDate: any = new Date(a?.date);
        const bDate: any = new Date(b?.date);
        return aDate - bDate;
    })



    // console.log('dates', convertIsoDate(upper), convertIsoDate(lower))
    console.log('result', newArray)
    console.log(balance)


    return {
        array: newArray,
        balance: balance
    };

}