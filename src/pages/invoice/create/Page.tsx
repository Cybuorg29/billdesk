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

type Props = {}

const CreateInvoice = (props: Props) => {
    const { connections, isConnection } = useAppSelector(state => state.connections)
    const { name, gstin, phone, adress, pincode, state } = useAppSelector(state => state.userData)
    const { bank, auth } = useAppSelector(state => state)
    const { token } = auth
    const [rroundOffNum, setRoundOffNum] = useState<number>(0);
    const [isRoundOff, setIsRoundOff] = useState<boolean>(false);
    const [invoice, setInvoice] = useState<IcreateInvoice>({
        billed_From: {
            name: name,
            gstin: gstin,
            adress: `${adress} - ${pincode}`,
            mobile: phone,
            state: state,
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
        isPaid: false
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
        if (!isConnection) {
            getConnection();
        }
    }, [connections]);

    useEffect(() => {
        setInvoice((prev) => { return { ...prev, state: state, state_Code: getStateCode(state), invoice_Date: createDate(), bank: { ...bank }, id: token } })
    }, [token, isToken])

    useEffect(() => {
        roundOff();
    }, [invoice.grand_Total, isRoundOff])



    function calculateGrandTotal() {
        let total = 0;
        invoice.products.map((index: any) => {
            total = total + index.total;
        })
        return total;
    }




    return (

        <>
            <div className='h-full w-full flex flex-col gap-2  font-inclusive'>
                <div className='pl-2'>
                    <PageHeading name='Create Invoice' key={'page'} />
                </div>
                <div className='h-[15%] bg-component grid rounded-lg  '>
                    <InputInfo invoice={invoice} setInvoice={setInvoice} key={inputInfoId} />
                </div>
                <div className='h-[5%]  grid grid-cols-2 gap-2 rounded-lg ' >
                    <SelectInfo invoice={invoice} setInvoice={setInvoice} key={selectInfoKey} />
                </div>
                <div className='h-[45%] bg-component  rounded-lg ml-1 mr-1'>
                    <ProductTable invoice={invoice} setInvoice={setInvoice} key={productTableKey} />
                </div>
                <div className=' h-[5%] flex place-content-between pl-2 pr-3 bg-component mr-1 ml-1 rounded-lg '>
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
                <div className=' h-[15%]  grid grid-cols-2   gap-2 '>
                    <div className='h-full overflow-auto'>
                        <TermAndConditionSection array={invoice.terms_And_Conditions} setArray={setInvoice} key={termAndConditionKey} set={setInvoice} />
                    </div>
                    <BankSection invoice={invoice} key={bankSectionId} />
                </div>
                <div className='  pl-2 flex gap-2'>
                    <SolidButton color='black' innerText='Save and Print' onClick={() => { createInvoice(invoice) }} key={'SolidButton'} />
                    <SolidButton color='black' innerText='Save' onClick={() => { createInvoiceAPI(invoice) }} key={'Solid'} />
                    <SolidButton color='black' innerText='view' onClick={() => { console.log(invoice) }} key={'joonon'} />
                </div>

            </div>

        </>
    )
}

export default CreateInvoice