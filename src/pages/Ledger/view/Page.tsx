import React, { useEffect, useState } from 'react'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import SelectAccount from './layouts/SelectAccount';
import { userDetailSchema } from '../../../models/userModel';
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton';
import IncomeAndExpenceSelect from '../../../components/Select/IncomeAndExpenceSelect';
import Table from './layouts/Table';
import { IbillsPaylable } from '../../../store/features/bills/receivable/model';
import { IIncome } from '../../../models/incomeAndExp/incomeInterface';
import { IExpence } from '../../../models/incomeAndExp/expenceInterface';
import { Iinvoice } from '../../../models/invoice/invoice.model';
import { Margin, usePDF } from 'react-to-pdf';
import * as htmlToImage from 'html-to-image'
import { change } from '../../../store/features/loader/loaderSlice';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';
import DownloadLedger from '../download/Page';
import { Dialog } from '@mui/material';
import { sortIsoDates } from '../../../utils/SortDates';
import { setInvoiceAction } from '../../../store/actions/invoice/set';
import { getConnection } from '../../../store/actions/connections/set';
import { getAccountDataByDates } from '../../accounts/view/functions/getDataByDates';
import { IInvoiceProduct } from '../../../models/inventory/productModel';

type Props = {}
interface iAccounts {
    particular: string,
    cr: number,
    dr: number,
    balance: number
    date: any
}

const Page = (props: Props) => {
    const { auth, incomeAndExpence, connections, invoice, payables } = useAppSelector(state => state);
    const { expences, income, isExpences, isIncome } = incomeAndExpence

    const dispatch = useAppDispatch();


    const [isSelectAccountOpen, setisSelectAccountOpen] = useState<boolean>(true);
    const [id, setId] = useState<string | 'sales' | 'purchase'>();
    const [isDialogOpen, setisDialogOpen] = useState<boolean>(false)
    const [name, setName] = useState('');
    const { targetRef, toPDF } = usePDF();
    const [accoutnArray, setAccoutnArray] = useState<iAccounts[]>([]);


    const [dates, setDates] = useState({
        upper: '',
        lower: '',
    });
    async function handleDates(name: string, value: any) {
        if (name === 'upper') {
            setDates(prev => { return { ...prev, upper: value } })
        } else {
            setDates(prev => { return { ...prev, lower: value } })
        }

        // initliseData()
    }



    async function convertToImage(element: any, pdf: any): Promise<any[3]> {
        let pdfHeight = 0
        let pdfWidth = 0
        let dataUri = ''
        await htmlToImage.toPng(element, { quality: 1, backgroundColor: '#ffffff' })
            .then(async function (dataUrl: any) {
                var link = document.createElement('a');
                link.download = 'my-image-name.png';
                const imgProps = pdf.getImageProperties(dataUrl);
                pdfWidth = pdf.internal.pageSize.getWidth();
                pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                console.log(dataUrl)
                dataUri = dataUrl
            }
            )
        return [dataUri, pdfWidth, pdfHeight]
    }






    async function printOne() {
        dispatch(change());
        try {
            console.log(targetRef.current)
            const pdf = new jsPDF('portrait', 'px', '', true);

            // const [data1, data1Width, data1Height]: any = await convertToImage(targetRef.current, pdf);
            // const elem: any = document.getElementById("toPrint")
            // pdf.addImage(data1, 'PNG', 0, 0, data1Width, data1Height, 'NONE');
            // pdf.addImage(elem);
            // pdf.addImage(data1, 'PNG', data1Width, data1Height, true);
            // const str = pdf.output('blob');
            // window.open(URL.createObjectURL(str));
            toPDF({
                overrides: {
                    pdf: {
                        putOnlyUsedFonts: true,
                        compress: true
                    },

                    canvas: {
                        useCORS: true
                    }
                },
                page: {
                    // margin is in MM, default is Margin.NONE = 0
                    margin: Margin.SMALL,
                    // default is 'A4'
                    // format: '',
                    // default is 'portrait'
                    // orientation: 'landscape',
                },
            })


        } catch (err: any) {
            console.log(err);
            toast.error('an error occured');
        }
        dispatch(change());
    }



    const [isLoaded, setisLoaded] = useState<boolean>(false)
    const [Data, setData] = useState<{
        payables: IbillsPaylable[],
        incomes: IIncome[],
        expences: IExpence[],
        invoices: Iinvoice[]
    }>()
    const [Balance, setBalance] = useState<{
        cr: number,
        dr: number
    }>({
        cr: 0,
        dr: 0

    })

    useEffect(() => {
        if (!connections.isConnection) getConnection();
        else if (!invoice.isLoaded) setInvoiceAction();
        // else setAccoutnArray(initliseDataArray(account));
        else if (!isLoaded) Initlise();
        else setAccoutnArray(initliseDataArray(id, Data));

    }, [incomeAndExpence, invoice, id, connections, dates]);




    async function Initlise() {
        if (!id || id === '') {
            const newDate = new Date();
            const month = (newDate.getMonth() > 9) ? `${newDate.getMonth() + 1}` : `0${newDate.getMonth() + 1}`;
            const upper = `${newDate.getFullYear() + '-' + month + '-' + '01'}`;
            const lower = `${newDate.getFullYear() + '-' + month + '-' + new Date(newDate.getFullYear(), parseInt(month), 0).getDate()}`
            const data = await getAccountDataByDates(dates.lower, dates.upper);
            setData((prev) => { return { ...data } });
            setDates((prev: any) => { return { upper: upper, lower: lower } });
            setisLoaded(true);
            console.log('data', data);
        } else {





        }

    }





    function calculateGrandTotal(invoice: IInvoiceProduct[]) {
        let total = 0;
        invoice.map((index: any) => {
            total = total + index.total;
        })
        return total;
    }





    function initliseDataArray(id: string | undefined, data?: {
        payables: IbillsPaylable[],
        incomes: IIncome[],
        expences: IExpence[],
        invoices: Iinvoice[]
    }): iAccounts[] {
        try {
            let newArray: iAccounts[] = []

            if (typeof id === undefined) {
                toast.info("Please Select An Account")
            }
            else if (id === 'sales') {
                data?.invoices.map((value: Iinvoice) => {
                    newArray.push({
                        balance: 0,
                        cr: 0,
                        particular: 'Sales Through - Invoice ' + value.invoice_No,
                        dr: value.grand_Total,
                        date: value.createdAt
                    });
                })

                data?.incomes.map((value: IIncome) => {
                    if (value.type === 'invoice') {
                        const find = invoice.invoices.find((invoice) => invoice._id === value.invoiceId)
                        newArray.push({
                            balance: 0,
                            cr: value.amount,
                            particular: value.title,
                            dr: 0,
                            date: value.createdAt

                        })
                    }
                })
                newArray = sortIsoDates(newArray);
                let sortedArray: any[] = []
                newArray.map((index: any) => {
                    if (index?.date >= dates.upper && index?.date <= dates.lower) return sortedArray.push(index)
                })
                // toast('aaa' + newArray.length)
                return sortedArray;

            }
            else if (id === 'Purchase') {
                data?.payables.map((value: IbillsPaylable) => {
                    const total = calculateGrandTotal(value.products);

                    newArray.push({
                        balance: 0,
                        cr: total,
                        particular: 'Purchase Of Goods from -' + value.billed_From.name,
                        dr: 0,
                        date: value.createdAt
                    });
                })

                data?.expences.map((value: IExpence) => {
                    if (value.category === '800') {
                        const find = payables.invoice.find((invoice) => invoice._id === value.uid);
                        newArray.push({
                            balance: 0,
                            cr: 0,
                            particular: value.title + 'No -' + find?.no,
                            dr: value.amount,
                            date: value.createdAt
                        })
                    }
                })
                newArray = sortIsoDates(newArray);
                let sortedArray: any[] = []
                newArray.map((index: any) => {
                    if (index?.date >= dates.upper && index?.date <= dates.lower) return sortedArray.push(index)
                })
                // toast('aaa' + newArray.length)
                return sortedArray;

            }


            else {
                try {

                    const find: userDetailSchema | undefined = [...connections.connections.client, ...connections.connections.supplier].find((value: userDetailSchema) => value._id === id);
                    if (!find) null; else if (!find && !id?.length) toast.error('Error Findind Party'); else {
                        let invoices: Iinvoice[] = []
                        data?.invoices.map((value) => {
                            if (value.billed_To.name === find.name && value.billed_To.gstin === find.gstin) {
                                newArray.push({
                                    balance: 0,
                                    cr: 0,
                                    particular: 'Sales Through - Invoice ' + value.invoice_No,
                                    dr: value.grand_Total,
                                    date: value.createdAt
                                })
                                invoices.push(value);

                            }
                        });

                        console.log('invoice', invoices);

                        let payables: IbillsPaylable[] = []
                        data?.payables.map((value: IbillsPaylable) => {
                            if (value.billed_From.name === find.name) {
                                payables.push(value);
                                const total = calculateGrandTotal(value.products);
                                newArray.push({
                                    balance: 0,
                                    cr: total,
                                    particular: 'Purchase Of Goods from -' + value.billed_From.name,
                                    dr: 0,
                                    date: value.createdAt
                                })
                            }
                        });

                        let incomes = [];
                        invoices?.forEach((invoice) => {
                            const income = data?.incomes.map((value) => {
                                if (value.invoiceId === invoice._id) {
                                    newArray.push({
                                        balance: 0,
                                        cr: value.amount,
                                        particular: value.title,
                                        dr: 0,
                                        date: value.createdAt

                                    })

                                }
                            }

                            );
                            if (!income) null;
                            else incomes?.push([...income]);
                        })





                        // payables 
                        // let expences:any[] =[]

                        payables?.forEach((index) => {
                            data?.expences.map((value) => {
                                if (value.uid === index._id) {
                                    newArray.push({
                                        balance: 0,
                                        cr: 0,
                                        particular: value.title + 'No -' + index.no,
                                        dr: value.amount,
                                        date: value.createdAt
                                    })
                                }
                            }

                            );
                            if (!income) null;
                            else incomes?.push([...income]);
                        })





                        newArray = sortIsoDates(newArray);
                        let sortedArray: any[] = []
                        newArray.map((index: any) => {
                            if (index?.date >= dates.upper && index?.date <= dates.lower) return sortedArray.push(index)
                        })
                        // toast('aaa' + newArray.length)
                        return sortedArray;


                    }





                } catch (err: any) {
                    toast.error(err.message);
                }
            }
        } catch (err: any) {
            toast.error('error type : ' + err.message)
        }

        return [];
    }





    useEffect(() => {

    }, [id])




    return (
        <div className='relative h-full w-full overflow-hidden '>
            <DownloadLedger print={() => printOne()} array={accoutnArray} close={() => setisDialogOpen(false)} open={isDialogOpen} account={id} dates={dates} setDates={setDates} targetref={targetRef} />


            <SelectAccount setName={(value: string) => setName(value)} set={(value: string | 'sales' | 'purchase') => { setId(value) }} close={() => { setisSelectAccountOpen(false) }} open={isSelectAccountOpen} />
            <div className={` ${(isSelectAccountOpen) ? 'h-full w-full' : 'h-0'}   w-full absolute bg-black/20`}>
            </div>
            <div className='p-5  h-full w-full   '>
                {/* <div className='m-2 h-[5%]' >
                    <PageHeading name='Ledger' key={'pgHead'} />
                </div> */}
                <div className='h-[10%] p-2  grid grid-cols-3 gap-4'>
                    <div className=' w-fit '>
                        Selected Account :
                        <div className=' h-[75%]  flex items-center justify-center bg-component relative group text-center  '>
                            <div className='absolute  z-50 top-0 left-0 items-center text-white group-hover:scale-100  w-full h-full bg-black/80 scale-0 hover:scale-100 cursor-pointer flex place-content-center' onClick={() => { setisSelectAccountOpen(true) }}>Change</div>
                            {name}
                        </div>
                    </div>
                    <div className='h-full w-full'>
                        <div className='text-center pb-1'>Date</div>
                        <div className='flex gap-2'>
                            <input title='date1' placeholder='' value={dates.upper} name='upper' type='date' onChange={(e) => { handleDates(e.target.name, e.target.value) }} />
                            <div>to</div>
                            <input title='date2' placeholder='' value={dates.lower} name='lower' type='date' onChange={(e) => { handleDates(e.target.name, e.target.value) }} />
                        </div>
                    </div>
                    <div className='h-full w-full flex place-content-center'>
                        <SolidButton color='black' innerText='Print Ledger' onClick={() => { setisDialogOpen(true) }} />
                    </div>

                </div>


                <div className='h-[90%] mt-5 overflow-auto w-full bg-component rounded-lg  '>
                    <div className='h-full w-full ' id='toPDF'>
                        <Table accountArray={accoutnArray} account={id} dates={dates} setDates={setDates} targetref={'one'} />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Page