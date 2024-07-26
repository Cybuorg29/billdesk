import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/app/hooks'
import { Iinvoice } from '../../models/invoice/invoice.model';
import { toast } from 'react-toastify';
import SelfInfo from '../invoice/view/layout/invoice/SelfInfo';
import BillingDetails from '../invoice/view/layout/invoice/BillingDetails';
import Table from '../invoice/view/layout/invoice/Table';
import Bottom from '../invoice/view/layout/invoice/Bottom';
import Fotter from '../invoice/view/layout/invoice/Fotter';
import BankSection from '../invoice/create/layouts/BankSection';

type Props = {
    id: string
}

const Page = ({ id }: Props) => {
    const { invoices, isLoaded } = useAppSelector(state => state.invoice);
    const [data, setData] = useState<Iinvoice>({
        billed_From: {
            name: '',
            gstin: '',
            adress: ``,
            mobile: '',
            state: '',
            state_Code: 0,
        },
        billed_To: {
            name: "",
            gstin: "",
            adress: '',
            state: '',
            state_Code: 0,
        },
        shipped_To: {
            name: "",
            gstin: "",
            adress: '',
            state: '',
            state_Code: 0,
        },
        invoice_Date: '',
        invoice_No: '',
        transport_Mode: '',
        vehical_No: '',
        reverce_Charge: false,
        date_of_supply: '',
        state: '',
        place_of_supply: '',
        discount: 0,
        grand_Total: 0,
        gst_On_Reverce_Charge: 0,
        products: [],
        total_Tax: 0,
        state_Code: 0,
        terms_And_Conditions: [],
        bank: {
            bank: '',
            branch: '',
            isfc: '',
            name: '',
            no: ''
        },
        id: '',
        isPaid: false,
        _id: '',
        _v: 0,
        createdAt: '',
        updatedAt: '',
        Eway_No: '',
        SO_NO: ''
    });





    useEffect(() => {
        const find: any = invoices.findIndex((value) => value._id === id)
        if (invoices.length === 0) null
        if (find === -1) null
        else setData((prev: any) => invoices[find]);
    }, [id])


    return (
        <div className='h-fit w-full p-10  font-semibold ' id='chalan'>
            <div className='grid grid-cols-2  '>
                <div>GSTIN:{data.billed_From.gstin}</div>
                <div className='text-sm'>Original for the recipient/Duplicate for transporter/Triplicate for supplier</div>
            </div>
            <div className='min-h-full border-2 border-black pb-3'>
                <div className='text-center text-lg p-2 border-b-2 border-black'>Delivery Challan</div>
                <div className='text-center text-lg p-2 border-b-2 border-black '>
                    <SelfInfo invoice={data} key={'SelfInfo'} />
                </div>
                <div className='grid grid-cols-2'>
                    <div className='pl-2 flex gap-2' ><span>Invoice No :</span>{data.invoice_No}</div>
                    <div className='pl-2 flex gap-2' ><span>Invoice Date :</span>{data.invoice_Date}</div>
                    <div className='pl-2 flex gap-2' ><span>Challan No  :</span>{''}</div>
                    <div className='pl-2 flex gap-2' ><span>Challan No & Date :</span>{'' + data.invoice_Date}</div>
                    <div className='pl-2 flex gap-2' ><span>Vehical No :</span>{data.vehical_No}</div>
                    <div className='pl-2 flex gap-2' ><span> Place Of Supply :</span>{data.place_of_supply}</div>
                    <div className='pl-2 border-b-2 border-black' > E Way Bill No  :{data.Eway_No}</div>
                    <div className='pl-2 border-b-2 border-black' > Order No   :{data.SO_NO}</div>
                </div>

                <div className='h-fit border-black    grid grid-cols-2 '>
                    <div className='min-h-fit border-r-2 border-black'>
                        <div className=' border-b-2  border-black pl-2 text-lg font-semibold '>Bill To</div>
                        <BillingDetails array={data.billed_To} />
                    </div>
                    <div className='min-h-fit'>
                        <div className=' border-b-2  border-black pl-2 text-lg font-semibold '>Ship To</div>
                        <BillingDetails array={data.shipped_To} />
                    </div>

                </div>

                <div className='min-h-[10rem] mt-3  border-b-2 border-t-2 border-black'>
                    <Table invoice={data} key={'chalanTable'} />
                </div>

                <div className='h-fit  text-sm    '>
                    <Bottom invoice={data} />
                </div>
                <div className=' border-b-2 border-black   grid text-sm'>
                    <div className='border-b-2 pl-2 border-black'>Bank Details :- {data.bank.name}</div>
                    <div className='pl-2'>Bank :- <span>{data.bank.bank + ',' + data.bank.no + ',' + data.bank.branch + ',' + data.bank.isfc}</span> </div>
                </div>
                <div className='min-h-[10rem] border-b-2 border-black'>
                    <Fotter invoice={data} key={'fotter'} />
                </div>



            </div >


        </div >
    )
}

export default Page