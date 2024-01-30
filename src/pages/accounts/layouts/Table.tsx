import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../store/app/hooks'
import { getConnection } from '../../../store/actions/connections/set'
import { incomeAndExpencesObjectSchema, incomeArray } from '../../../store/features/IncomeAndExpences/IncomeAndExpences'
import { IIncome } from '../../../models/incomeAndExp/incomeInterface'
import { setInvoiceAction } from '../../../store/actions/invoice/set'
import { Iinvoice } from '../../../models/invoice/invoice.model'
import { clientModelObj } from '../../../models/Client/ClientModel'
import { converToInrFormat } from '../../../utils/ConvertInrFormat'
import { useNavigate } from 'react-router-dom'
import { isToken } from 'typescript'
import { toast } from 'react-toastify'

type Props = {}

interface iAccounts {
    name: '',
    cr: 0,
    dr: 0,
    balance: 0
}

const Table = (props: Props) => {
    const { connections, isConnection } = useAppSelector(state => state.connections);
    const { expences, income, isExpences, isIncome, month } = useAppSelector(state => state.incomeAndExpence)
    const { invoices, isLoaded } = useAppSelector(state => state.invoice);
    const { token, istoken } = useAppSelector(state => state.auth)


    const [accountsArray, setAccountsArray] = useState<any[]>([
    ])

    const navigate = useNavigate();


    class accountPush {


        name = ''
        toPay = 0
        payed = 0
        toReceive = 0
        received = 0
        balance = 0
        id = ''

        constructor(name: string, id: string) {
            this.name = name
            this.id = id
        }
    }


    function Initlise() {
        console.log(connections.client.length)
        let newArray: any[] = [];
        connections.client.map((index: clientModelObj) => {
            console.log('asdada')
            if (newArray.length === 0) {
                newArray.push(new accountPush(index.name, index._id))
            }
            let found = false
            newArray.map((item: any) => {
                if (item.name === index.name) {
                    console.log('found')
                    found = true
                    // account already exists
                }
            })
            console.log('creating account');
            if (!found) newArray.push(new accountPush(index.name, index._id))
            return

        })

        connections.supplier.map((index: clientModelObj) => {
            console.log('asdada')
            if (newArray.length === 0) {
                newArray.push(new accountPush(index.name, index._id))
            }
            let found = false
            newArray.map((item: any) => {
                if (item.name === index.name) {
                    console.log('found')
                    found = true
                    // account already exists
                }
            })
            console.log('creating account');
            if (!found) newArray.push(new accountPush(index.name, index._id))
            return

        })

        invoices.map((index: Iinvoice, i: number) => {
            newArray.map((item: any, j: number) => {
                if (index.billed_To.name === item?.name) {
                    if (index.isPaid) {
                        newArray[j].received = newArray[j].received + index.grand_Total
                    } else {
                        newArray[j].toReceive = newArray[j].toReceive + index.grand_Total
                    }
                }

                return
            })

            return
        })

        expences.map((expence: incomeAndExpencesObjectSchema, index: number) => {

            connections.supplier.map((supplier: clientModelObj, i: number) => {
                if (expence.E_id === supplier._id) {
                    newArray.map((index: any, j: any) => {
                        if (supplier.name === index.name) {
                            newArray[j].payed = newArray[j].payed + expence.amount;
                        }
                    })
                }
            })

        })



        console.log('new Array', newArray)

        setAccountsArray(newArray)
    }



    useEffect(() => {
        if (!isConnection) { getConnection(); toast('no connections') }
        else if (!isLoaded) setInvoiceAction();
        else Initlise()
    }, [connections, isLoaded, isToken, token])

    useEffect(() => {

    }, [])
    return (
        <div className='border-t   w-full h-full overflow-auto' >
            <div className="flex flex-col" >
                <div className="">
                    <div className="inline-block min-w-full ">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium border-neutral-500 uppercase sticky top-0">
                                    <tr className="border-b border-neutral-500">
                                        <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >#</th>
                                        <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Name</th>
                                        <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >To Receive</th>
                                        <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Received</th>
                                        <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >To Pay</th>
                                        <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Payed</th>

                                    </tr>
                                </thead>


                                <tbody>
                                    {
                                        accountsArray.map((index: any, i: number) => {

                                            let totalIncome: number = 0;
                                            console.log('inde', index)
                                            // let totalExpence: number = 0;

                                            // // income.map((item: IIncome) => {
                                            // //     if (index._id === item.)
                                            // //         return
                                            // // })
                                            // invoices.map((invoice: Iinvoice) => {
                                            //     if ((invoice.billed_To.gstin === index.gstin) && (invoice.billed_To.name === index.name)) {
                                            //         if (invoice.isPaid) {
                                            //             totalIncome = totalIncome + invoice.grand_Total;
                                            //         }
                                            //     }
                                            //     return
                                            // })


                                            return <tr className="border-b border-neutral-300 font-light hover:bg-slate-100 cursor-pointer" onClick={() => { navigate(`/view/${index.id}/account`) }} >
                                                <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{++i}</th>
                                                <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index?.name}</th>
                                                <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky  text-gray-700' >{converToInrFormat(index?.toReceive)}</th>
                                                <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky  text-green-700 ' >{converToInrFormat(index?.received)}</th>
                                                <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{converToInrFormat(index?.toPay)}</th>
                                                <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky text-red-700 ' >{converToInrFormat(index?.payed)}</th>
                                                <th scope="col" className='whitespace-nowrap font-medium   sticky ' >
                                                    <div className='flex ' >
                                                        {/* <DeleteIcon color='black' onclick={() => { deleteConnection(index, 0) }} key={`${deleteIconKey + 1}`} tooltip={`Delete Client`} />
                              <ViewIcon tooltip='View Client' color='blue' onclick={() => { navigate(`/view/${index._id}/profile`) }} key={`${viewIconKey + 1}`} />
                              <ArrowIconForward onclick={() => { }} tooltip='View Transactions' key={`${arrowIconKey + 1}`} /> */}
                                                    </div>
                                                </th>
                                            </tr>


                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div ></div ></div >
    )
}

export default Table