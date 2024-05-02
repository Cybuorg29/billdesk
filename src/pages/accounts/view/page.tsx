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
import { IbillsPaylable } from '../../../store/features/bills/receivable/model';
import { convertToMongoDBAtlasISODate } from '../../../utils/createMongodbDate';
import { getAccountDataByDates } from './functions/getDataByDates';
import { initliseTableData } from './functions/initliseTable';
import { IExpence } from '../../../models/incomeAndExp/expenceInterface';
import { createDate } from '../../../utils/CreateDate';

type Props = {}

interface DataObj {
    payables: IbillsPaylable[],
    incomes: IIncome[],
    expences: incomeAndExpencesObjectSchema[],
    invoices: Iinvoice[]
}

const ViewAccount = (props: Props) => {
    const { id } = useParams();
    const dispatch = useAppDispatch()
    const { expences, income } = useAppSelector(state => state.incomeAndExpence);
    const [array, setArray] = useState<any[]>([]);
    const { invoices, isLoaded } = useAppSelector(state => state.invoice)
    const { connections, isConnection } = useAppSelector(state => state.connections)
    const payables = useAppSelector(state => state.payables);
    const [accountDetail, setAccountDetail] = useState<any>([])
    const [type, setType] = useState<string>('')
    const [balance, setBalance] = useState<number>(0);
    const [currentDataId, setCurrentDataId]: any = useState('');
    const [startingBalance, setStartingBalance] = useState(0)
    const [data, setData] = useState<{
        payables: IbillsPaylable[],
        incomes: IIncome[],
        expences: IExpence[],
        invoices: Iinvoice[]
    }>({
        expences: [],
        incomes: [],
        invoices: [],
        payables: []
    })
    const [dates, setDates] = useState({
        upper: '',
        lower: '',
    });
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




    async function handleDates(name: string, value: any) {
        if (name === 'upper') {
            setDates(prev => { return { ...prev, upper: value } })
        } else {
            setDates(prev => { return { ...prev, lower: value } })
        }

        // initliseData()
    }












    async function Initlise() {
        if (!currentDataId || currentDataId === '') {
            const newDate = new Date();
            const month = (newDate.getMonth() > 9) ? `${newDate.getMonth() + 1}` : `0${newDate.getMonth() + 1}`;
            const upper = `${newDate.getFullYear() + '-' + month + '-' + '01'}`;
            const lower = `${newDate.getFullYear() + '-' + month + '-' + new Date(newDate.getFullYear(), parseInt(month), 0).getDate()}`
            setCurrentDataId((prev: any) => { return id });
            const data = await getAccountDataByDates(dates.lower, dates.upper);
            setCurrentDataId((prev: any) => { return id });
            setData((prev) => { return { ...data } });
            setDates((prev) => { return { upper: upper, lower: lower } });
        } else {





        }

    }

    async function initliseData() {
        const newArray = await initliseTableData({ expences: data.expences, payables: data.payables, incomes: data.incomes, invoices: data.invoices }, id, dates.upper, dates.lower);
        console.log('new Array', newArray)
        setArray(prev => { return [...newArray.array] });
        setStartingBalance((prev) => { return newArray.balance })
    }




    useEffect(() => {
        dispatch(change())
        Initlise()
        dispatch(change())
    }, [])

    useEffect(() => {
        initliseData()
    }, [dates])







    // useEffect(() => {
    //     initliseData()
    // }, [data])



    return (
        <div className='h-full w-full  p-5 flex flex-col gap-5'>
            <div className='flex place-content-between items-center h-[8%] gap-5'>
                <PageHeading name={accountDetail[0]?.name} />
                <div className='flex flex-col gap-1'>
                    <div className='text-center pb-1'>Date</div>
                    <div className='flex gap-2'>
                        <input title='date1' placeholder='' value={dates.upper} name='upper' type='date' onChange={(e) => { handleDates(e.target.name, e.target.value) }} />
                        <div>to</div>
                        <input title='date2' placeholder='' value={dates.lower} name='lower' type='date' onChange={(e) => { handleDates(e.target.name, e.target.value) }} />
                    </div>
                    {/* <div className='flex place-content-center w-full' >
                        <button className='text-sm border text-center border-black  w-1/2 hover:bg-black hover:text-white cursor-pointer' onClick={() => { handleChangeData() }}>Find</button>
                    </div> */}
                </div>
            </div>




            <div className=' bg-component h-[90%] rounded-xl '>
                <div className='grid w-full gap-5 grid-cols-6 p-3 py-4  h-[10%] border-b border-grayFont  uppercase text-grayFont '>
                    <div className='col-span-1 '>Date</div>
                    {/* <div className='col-span-1 '>Transaction</div> */}
                    <div className='col-span-2 '>Particular</div>
                    <div className='col-span-1 '>Amount</div>
                    <div className='col-span-1 text-center'>Payments</div>
                    <div className='col-span-1 text-center'> Balance</div>
                </div>
                <div className='h-[90%] p-1 pb-0'>
                    <div className='border-b border-black flex place-content-between pr-5'>Starting Balance : <span> {converToInrFormat(startingBalance)}</span></div>
                    <div className='h-[90%] overflow-auto '>
                        {
                            array.map((index: any, i: number) => {
                                // if (i === 0) return null;

                                // bal = bal - startingBalance

                                // if (index.isExpence) {
                                //     bal = bal - index.amount
                                // }
                                if (i === 0) {
                                    bal = startingBalance
                                }

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

                                // if (index.isExpence) {
                                //     bal = bal - index.amount
                                // }
                                // if (!index.isExpence) {
                                //     bal = bal + index.amount
                                // }




                                return (

                                    <div className='grid w-full gap-5 grid-cols-6 text-sm   px-3 border-b border-black  '>
                                        <div className='col-span-1 py-2 text-sm border-black'>{convertIsoDate(index?.date)}</div>
                                        {/* <div className='col-span-1 py-2    border-black'>{index?.}</div> */}
                                        <div className='col-span-2 py-2    border-black'>{index?.particular}</div>
                                        <div className='col-span-1 py-2    border-black'>{((!index.isPayment) ? converToInrFormat(index.amount) : ' ')}</div>
                                        {
                                            (index.isPayment) ?
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