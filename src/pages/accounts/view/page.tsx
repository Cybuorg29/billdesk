import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { incomeAndExpencesObjectSchema } from '../../../store/features/IncomeAndExpences/IncomeAndExpences';
import { IIncome } from '../../../models/incomeAndExp/incomeInterface';
import { userDetailSchema } from '../../../models/userModel';
import { Iinvoice } from '../../../models/invoice/invoice.model';
import { clientModelObj } from '../../../models/Client/ClientModel';
import PageHeading from '../../../components/ui/Page Heading/PageHeading';
import { MenuItem, Select } from '@mui/material';
import { converToInrFormat } from '../../../utils/ConvertInrFormat';
import { sortByDate, sortIsoDates } from '../../../utils/SortDates';
import convertIsoDate from '../../../utils/convertIsoDates';
import { change } from '../../../store/features/loader/loaderSlice';
import { toast } from 'react-toastify';
import { tabProps } from '../../../components/ui/tabs/Tabs';
import InfoTabs from '../../../components/ui/tabs/InfoTabs';
import { compareIsoDates } from '../../../utils/Compare2Isodates';

type Props = {}

const ViewAccount = (props: Props) => {
    const { id } = useParams();
    const dispatch = useAppDispatch()
    const { expences, income } = useAppSelector(state => state.incomeAndExpence);
    const [array, setArray] = useState<any[]>([]);
    const { invoices, isLoaded } = useAppSelector(state => state.invoice)
    const { connections, isConnection } = useAppSelector(state => state.connections)
    const [accountDetail, setAccountDetail] = useState<any>([])
    const [type, setType] = useState<string>('')
    const [balance, setBalance] = useState<number>(0);
    let bal = 0;
    const [topTabs, setToptabs] = useState<tabProps[]>([
        {
            name: 'Income',
            amount: 0,
            image: '',
            link: ''
        },
        {
            name: 'Expence',
            amount: 0,
            image: '',
            link: ''
        },
        {
            name: 'Balance',
            amount: 0,
            image: '',
            link: ''
        }
    ])

    class objInitliser {
        amount = 0;
        title = ''
        isIncome = false
        date = ''
        transaction = ''
        constructor(amount: number, title: string, isIncome: boolean, date: any, trasaction: string) {
            this.amount = amount
            this.title = title
            this.isIncome = isIncome
            this.date = date
            this.transaction = trasaction

        }

    }

    function initlise() {
        let newArray: any[] = []
        if (type === ('all' || 'Paid')) expences.map((expence: incomeAndExpencesObjectSchema) => {
            if (expence.E_id === id && (!(expence.category === '500' || expence.category === '400'))) {
                newArray.push(new objInitliser(expence.amount, expence.title, false, expence.createdAt, 'Goods Purchased'));
            }
            return
        })
        setAccountDetail(connections.client.filter((index: clientModelObj) => { if (index._id === id) return index; else return null }) || connections.supplier.filter((index: clientModelObj) => { if (index._id === id) return index; else return null }))
        if (accountDetail.length === 0) {

        } else {

            const invocieArray: Iinvoice[] = invoices.filter((invoice: Iinvoice) => {
                if (accountDetail[0]?.name === invoice.billed_To.name && accountDetail[0]?.gstin === invoice.billed_To.gstin) {
                    return invoice
                }
            })
            console.log('accountDetail', accountDetail)
            console.log('invocieArray', invocieArray)
            console.log('client itterate')
            if (type === 'paid') income.map((income: IIncome) => {
                invocieArray.map((invoice: any) => {
                    if (income.invoiceId === invoice?._id) {
                        newArray.push(new objInitliser(income.amount, income.title, true, income.createdAt, 'Payment Received'));
                    }
                    return
                })

                return
            })
            if (type === 'all') {
                invocieArray.map((invoice: Iinvoice) => {
                    newArray.push(new objInitliser(invoice.grand_Total, `invoice No: ${invoice.invoice_No} due`, true, invoice?.createdAt, 'invoice'));
                })
                income.map((income: IIncome) => {
                    invocieArray.map((invoice: Iinvoice) => {
                        if (income.invoiceId === invoice._id) {
                            newArray.push(new objInitliser(invoice.grand_Total, income.title, true, income.createdAt, 'payment Received'));

                        }
                    })
                })
            }
            if (type === 'unPaid') {
                invocieArray.map((invoice: Iinvoice) => {
                    if (!invoice.isPaid) newArray.push(new objInitliser(invoice.grand_Total, `invoice No. ${invoice.invoice_No} due`, true, invoice.invoice_Date, 'invoice'));
                    return
                })


            }

            newArray = sortIsoDates(newArray)
            setArray(prev => [...newArray]);

        }

    }
    useEffect(() => {
        dispatch(change())
        initlise()
        dispatch(change())

    }, [type])

    useEffect(() => {
        setType('all')
    }, [])
    return (
        <div className='h-full w-full  p-5 flex flex-col gap-5'>
            <div className='flex place-content-between items-center h-[8%] gap-5'>
                <PageHeading name={accountDetail[0]?.name} />
                <div >
                    <div>Transaction type </div>
                    <select title='Transaction Type' value={type} onChange={(e: any) => { setType(e.target.value) }} >
                        <option value={'all'} >all</option>
                        <option value={'paid'} >Paid </option>
                        <option value={'unPaid'} >Dues</option>
                    </select>
                </div>
                <div className=''>
                    <div className='text-center pb-1'>Date</div>
                    <div className='flex gap-2'>
                        <input title='date1' placeholder='' type='date' />
                        <div>to</div>
                        <input title='date1' placeholder='' type='date' />
                    </div>
                </div>
            </div>

            {/* <div className='h-[20%]'>
                <InfoTabs array={topTabs} />
            </div> */}


            <div className=' bg-component h-[90%] rounded-xl '>
                <div className='grid w-full gap-5 grid-cols-7 p-3 py-4  h-[10%] border-b border-grayFont  uppercase text-grayFont '>
                    <div className='col-span-1 '>Date</div>
                    <div className='col-span-1 '>Transaction</div>
                    <div className='col-span-2 '>Particular</div>
                    <div className='col-span-1 '>Amount</div>
                    <div className='col-span-1 text-center'> Payments</div>
                    <div className='col-span-1 text-center'> Balance</div>
                </div>
                <div className='h-[90%] p-1 pb-0'>
                    <div className='h-[90%] overflow-auto '>
                        {
                            array.map((index: any, i: number) => {

                                if (index.transaction === 'payment Received') {
                                    bal = bal - index.amount
                                }
                                if (index.transaction === 'invoice') {
                                    bal = bal + index.amount
                                }


                                return (

                                    <div className='grid w-full gap-5 grid-cols-7 text-sm   px-3 border-b border-black  '>
                                        <div className='col-span-1 py-2 text-sm border-black'>{convertIsoDate(index?.date)}</div>
                                        <div className='col-span-1 py-2    border-black'>{index?.transaction}</div>
                                        <div className='col-span-2 py-2    border-black'>{index?.title}</div>
                                        <div className='col-span-1 py-2    border-black'>{((index.transaction !== 'payment Received') ? converToInrFormat(index.amount) : ' ')}</div>
                                        {
                                            (index.transaction === 'payment Received' || index.transaction === 'Goods Purchased') ?
                                                <div className='col-span-1 py-2 text-center  border-black'>{converToInrFormat(index.amount)}</div>

                                                :
                                                <div className='col-span-1 py-2 text-center  border-black'>{'  '}</div>
                                        }
                                        <div className='col-span-1 py-2 text-center '>{converToInrFormat(bal)}</div>

                                    </div>

                                )


                            })
                        }
                    </div>

                    <div className='h-[10%] shadow-sm border-t border-b grid items-center justify-items-end pr-4'>
                        {
                            (0 > bal) ? <div  >Balance Due : <span className='text-red-600'>{converToInrFormat(bal)}</span></div>
                                :
                                <div  >Balance Due : <span className='text-green-600'>{converToInrFormat(bal)}</span></div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewAccount