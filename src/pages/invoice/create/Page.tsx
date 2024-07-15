import React, { MouseEventHandler, useEffect, useId, useState } from 'react'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton';
import { IcreateInvoice } from '../../../models/invoice/invoice.model';
import Inputs from '../../inventory/create/components/Inputs';
import SelectNameTab from './components/SelectNameTab';
import { useAppSelector } from '../../../store/app/hooks';
import { getConnection } from '../../../store/actions/connections/set';
import { toast } from 'react-toastify';
import InputInfo from './layouts/InputInfo';
import { getStateCode } from '../../../utils/getStateCode';
import { createDate } from '../../../utils/CreateDate';
import ProductTable from './layouts/ProductTable';
import SelectInfo from './layouts/SelectInfo';
import { converToInrFormat } from '../../../utils/ConvertInrFormat';
import BankSection from './layouts/BankSection';
import { createInvoiceAPI } from '../../../api/v2/invoice';
import TermAndConditionSection from './layouts/TermAndConditionSection';
import { createInvoice } from '../../../store/actions/invoice/create';
import { isToken } from 'typescript';
import { roundNumber } from '../../../utils/RoundOff';
import { limitDecimalDigits } from '../../../utils/limitDecimalDigits';
import { CheckBoxChangeEventArgs } from '@syncfusion/ej2-grids';
import { ISalesOrder } from '../../salesOrders/Model/model';
import { useNavigate } from 'react-router-dom';

type Props = {}

const CreateInvoice = (props: Props) => {
    const { connections, isConnection } = useAppSelector(state => state.connections)
    const { name, gstin, phone, adress, pincode, state } = useAppSelector(state => state.userData)
    const { bank, auth, salesOrders } = useAppSelector(state => state)
    const { token } = auth
    const navigate = useNavigate()
    const [rroundOffNum, setRoundOffNum] = useState<number>(0);
    const [isRoundOff, setIsRoundOff] = useState<boolean>(false);
    const [invoice, setInvoice] = useState<IcreateInvoice>({
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
        invoice_No: '',
        transport_Mode: '',
        invoice_Date: '',
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
        Eway_No: '',
        SO_NO: ''
    })

    const selectInfoKey = useId();
    const inputInfoId = useId();
    const productTableKey = useId();
    const termAndConditionKey = useId();
    const bankSectionId = useId();


    function roundOff() {
        if (isRoundOff) {
            setRoundOffNum(roundNumber(invoice.grand_Total) - calculateGrandTotal());
            setInvoice((prev) => { return { ...prev, grand_Total: roundNumber(prev.grand_Total) } })
        } else {

            setInvoice((prev) => { return { ...prev, grand_Total: calculateGrandTotal() } })
        }
    }



    useEffect(() => {
        if (!isConnection) getConnection();

    }, [token, isToken, name, invoice]);



    useEffect(() => {
        setInvoice((prev) => {
            return {
                ...prev, state: state, state_Code: getStateCode(state), invoice_Date: createDate(), bank: { ...bank }, id: token,
                billed_From: {
                    name: name,
                    gstin: gstin,
                    adress: `${adress}`,
                    mobile: phone,
                    state: state,
                    state_Code: getStateCode(state),
                }
            }
        })
    }, [token, isToken, state, name, gstin])

    useEffect(() => {
        roundOff();
    }, [invoice.grand_Total, isRoundOff])
    useEffect(() => {
        setInvoice((prev: IcreateInvoice) => { return { ...prev, products: [] } })
    }, [invoice.SO_NO])



    function calculateGrandTotal() {
        let total = 0;
        invoice.products.map((index: any) => {
            total = total + index.total;
        })
        return total;
    }


    function validateAndSave(data: IcreateInvoice) {
        try {
            if (data.invoice_No === '') throw new Error("Plase Enter Invoice No To Save the Document");
            if (data.billed_To.name === '') throw new Error("Plase Select  Billed To");
            if (data.shipped_To.name === '') throw new Error("Plase Select  Shipped To");
            if (data.products.length === 0) throw new Error("Plase Add Atleast One Product");
            // if(data.) throw new Error("Plase Add Atleast One Product");
            createInvoice(data);
            navigate('/dashboard/invoice')



        } catch (err: any) {
            toast.error(err.message);
        }
    }


    useEffect(() => {
        class billingDetails {
            name = ''
            adress = ''
            state = ''
            state_Code = 0
            gstin = ''
            constructor(name: string, adress: string, state: string, gstin: string) {
                this.name = name;
                this.adress = adress;
                this.state = state;
                this.state_Code = getStateCode(state);
                this.gstin = gstin

            }


        }
        const value = salesOrders.Sales_Orders.find((salesOrder: ISalesOrder) => salesOrder._id === invoice.SO_NO);
        console.log('value', value)
        const cli = [...connections.supplier, ...connections.client].find((con) => con.name === value?.to.name && con.adress === value?.ship_To.adress);
        const ship = [...connections.supplier, ...connections.client].find((con) => con.name === value?.to.name && con.adress === value?.ship_To.adress);
        console.log(cli)
        setInvoice((prev) => { return { ...prev, billed_To: new billingDetails(cli?.name, cli?.adress, cli?.state, cli?.gstin), shipped_To: new billingDetails(ship?.name, ship?.adress, ship?.state, ship?.gstin), transport_Mode: `${(value?.shipping_Meathod) ? value.shipping_Meathod : ""}` } })
    }, [invoice.SO_NO]);



    useEffect(() => {
        window.addEventListener("beforeunload", (e) => {
            e.preventDefault();
            // confirm("Reload Will Erase All The UnSaved Changes. Do You Really Want To Reload")
        });
        return () => {
            window.removeEventListener("beforeunload", (e) => {
                e.preventDefault();
                const a = window.confirm("Reload Will Erase All The Changes.")
                if (a) window.location.reload();
            });
        };
    }, []);






    return (

        <>
            <div className='h-full w-full p-3 gap-2  font-inclusive overflow-auto '>
                <div className='pl-2 h-[5%] overflow-hidden'>
                    <PageHeading name='Create Invoice' key={'page'} />
                </div>
                <div className='h-fit w-full  bg-component rounded-xl'>

                    <div className=' min-h-full mb-2 bg-component grid rounded-lg  '>
                        <InputInfo SoNO={invoice.SO_NO} invoice={invoice} setInvoice={setInvoice} key={inputInfoId} />
                    </div>
                    <div className='h-[5%]  p-1  grid grid-cols-2    ' >
                        <SelectInfo invoice={invoice} setInvoice={setInvoice} key={selectInfoKey} />
                    </div>
                    <div className='min-h-[15rem]   m-1  bg-component   rounded-lg '>
                        <ProductTable invoice={invoice} setInvoice={setInvoice} key={productTableKey} />
                    </div>
                    <div className=' h-[5%] m-1 flex place-content-between pl-2 pr-3 bg-component mr-1 ml-1 rounded-lg '>
                        <div className='text-lg text-grayFont'> Grand Total</div>
                        <div className='flex gap-10'>
                            <div >
                                <div className='flex gap-2'>
                                    <input type='checkbox' title='RoundOff' onClick={() => { (isRoundOff) ? setIsRoundOff(false) : setIsRoundOff(true); setRoundOffNum(0) }} ></input>
                                    <div>Round off({` ${limitDecimalDigits(rroundOffNum)}`})</div>
                                </div>
                            </div>
                            <div className=''>{converToInrFormat(invoice.grand_Total)}</div>
                        </div>
                    </div>
                    <div className=' min-h-[10rem]    gap-2 '>
                        <div className='h-full overflow-auto'>
                            <TermAndConditionSection array={invoice.terms_And_Conditions} setArray={setInvoice} key={termAndConditionKey} set={setInvoice} />
                        </div>
                        <BankSection invoice={invoice} key={bankSectionId} />
                    </div>

                </div>
                <div className='  pl-2 mt-3 flex gap-2 h-[15%]'>
                    <SolidButton color='black' innerText='Save' onClick={() => { validateAndSave(invoice) }} key={'SolidButton'} />
                    <SolidButton color='black' innerText='view' onClick={() => { console.log(invoice) }} key={'SolidButton'} />
                </div>

            </div>
        </>
    )
}

export default CreateInvoice