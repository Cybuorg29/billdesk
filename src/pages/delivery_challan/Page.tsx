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
import { IInvoiceProduct } from '../../models/inventory/productModel';
import { calculateTaxAmount } from '../../utils/calculateTaxAmount';
import { Itax } from '../../models/tax/Model';
import { converToInrFormat } from '../../utils/ConvertInrFormat';
import { limitDecimalDigits } from '../../utils/limitDecimalDigits';

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
        SO_NO: '',
        // challan_no:'',
        // SO_Id:''
    });



    const [taxable, settaxable] = useState(0)

    function updateTaxableValue() {
        let newValue = 0
        data.products.map((index: IInvoiceProduct) => {
            newValue = newValue + index.taxable_Value;
        })
        settaxable(() => newValue);
    }





    const [TaxArray, setTaxArray] = useState<{
        tax: Itax,
        rate: number
    }[]>(initliseTaxArray());




    function initliseTaxArray(): {
        tax: Itax
        rate: number
    }[] {

        let newArray: {
            tax: Itax,
            rate: number
        }[] = [];
        if (newArray.length === 0 && data.products.length !== 0) {
            const rate: any = data.products[0].tax[0].amount;
            newArray.push({
                tax: {
                    amount: calculateTaxAmount(parseInt(rate), data.products[0].taxable_Value),
                    type: data.products[0].tax[0].type
                },
                rate: rate

            })
            // deletedata.products[0].tax[0]
        }
        data.products.map((value: IInvoiceProduct, index: number) => {
            value.tax.map((tax: Itax, taxIndex: number) => {
                if (index === 0 && taxIndex === 0) return 0;
                const find = newArray.findIndex((val) => val.tax.type === tax.type);
                if (find === -1) newArray.push({
                    tax: {
                        amount: calculateTaxAmount(tax.amount, value.taxable_Value),
                        type: tax.type
                    },
                    rate: tax.amount

                })
                else {
                    newArray[find].tax.amount = newArray[find].tax.amount + calculateTaxAmount(tax.amount, value.taxable_Value);
                }

            })
        })

        return newArray;


    }




    useEffect(() => {
        const find: any = invoices.findIndex((value) => value._id === id)
        if (invoices.length === 0) null
        if (find === -1) null
        else setData((prev: any) => invoices[find]);
    }, [id])

    useEffect(() => {

        updateTaxableValue();
        setTaxArray(initliseTaxArray());

    }, [data])


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
                <div className='grid grid-cols-2 border-b-2 border-black'>
                    <div className='pl-2 flex gap-2' ><span>Invoice No :</span>{data.invoice_No}</div>
                    <div className='pl-2 flex gap-2' ><span>Invoice Date :</span>{data.invoice_Date}</div>
                    <div className='pl-2 flex gap-2' ><span>Challan No & Date :</span> {data.challan_No + ' - ' + data.invoice_Date}</div>
                    <div className='pl-2 flex gap-2' ><span>Vehical No :</span> {data.vehical_No}</div>
                    <div className='pl-2 flex gap-2' ><span> Place Of Supply :</span> {data.place_of_supply}</div>
                    <div className='pl-2  border-black' > E Way Bill No  : {data.Eway_No}</div>
                    <div className='pl-2  border-black' > Order No   : {data.SO_NO}</div>
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

                <div className='min-h-[2rem] border-b-2 border-black   '>
                    <div className='grid  border-b-2 border-black'>
                        {
                            TaxArray.map((value: {
                                tax: Itax,
                                rate: number
                            }) => {
                                return <div className='grid grid-cols-3 pl-2  '>
                                    <div className='col-span-2 border-r  text-end pr-5 text-bold text-sm border-black'>{value.tax.type}@{value.rate}%</div>
                                    <div className='pl-2 text-sm text-end pr-5'>{limitDecimalDigits(value.tax.amount)}</div>

                                </div>
                            })
                        }
                    </div>
                    <div className='grid grid-cols-2 pl-5 pr-5'>
                        <div  >Grand Total</div>
                        <div className='text-end '>{converToInrFormat(taxable)}</div>
                    </div>
                    {/* <Bottom invoice={data} /> */}
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