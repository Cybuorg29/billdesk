import React, { useEffect, useId, useState } from 'react'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton';
import { IcreateInvoice } from '../../../models/invoice';
import Inputs from '../../inventory/create/components/Inputs';
import SelectNameTab from './components/SelectNameTab';
import { useAppSelector } from '../../../store/app/hooks';
import { getConnection } from '../../../store/actions/connections/set';
import { toast } from 'react-toastify';
import InputInfo from './layouts/InputInfo';
import { getStateCode } from '../../../utils/getStateCode';
import { createDate } from '../../../utils/CreateDate';
import ProductTable from './layouts/ProductTable';
import { convertNumToWord } from '../../../utils/convertNumToWord';
import SelectInfo from './layouts/SelectInfo';
import { converToInrFormat } from '../../../utils/ConvertInrFormat';

type Props = {}

const CreateInvoice = (props: Props) => {
    const { connections, isConnection } = useAppSelector(state => state.connections)
    const { state } = useAppSelector(state => state.userData)
    const [invoice, setInvoice] = useState<IcreateInvoice>({
        billed_From: {
            name: "",
            gstin: "",
            adress: '',
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
        state_Code: 0
    })

    const selectInfoKey = useId();
    const inputInfoId = useId();
    const productTableKey = useId();



    useEffect(() => {
        if (!isConnection) {
            getConnection();
        }
    }, [connections]);

    useEffect(() => {
        setInvoice((prev) => { return { ...prev, state: state } })
        setInvoice((prev) => { return { ...prev, state_Code: getStateCode(state) } })
        setInvoice((prev) => { return { ...prev, invoice_Date: createDate() } })
    }, [])








    return (
        <div className='w-full h-full p-5' >

            <div className='bg-component  h-[100%] rounded-xl'>
                <div className='text-center items-center grid h-[5%]'>
                    <div className='font-black text-grayFont'>Tax Invoice</div>
                </div>

                {/* set General info component/layout */}
                <div className='h-[15%]' >
                    <InputInfo invoice={invoice} setInvoice={setInvoice} key={inputInfoId} />
                </div>
                {/* select billed to or shipped to  compoenent */}
                <div className='flex border h-[18%]' >
                    <SelectInfo invoice={invoice} setInvoice={setInvoice} key={selectInfoKey} />
                </div>
                <div className='h-[45%]  border border-t-0' >
                    <ProductTable invoice={invoice} setInvoice={setInvoice} key={productTableKey} />
                </div>

                <div className=' h-[5%] flex place-content-between pl-2 pr-3 '>
                    <div className='text-lg text-grayFont'> Grand Total</div>
                    <div className=''>{converToInrFormat(invoice.grand_Total)}</div>

                </div>
            <div className='border h-[12%] rounded-b-xl grid grid-cols-2 pl-2'>
                <div className='border-r'>Terms And Conditions</div>
                <div className='pl-2'>Bank Details</div>

            </div>
            </div>
            <div>
                <button onClick={() => console.log(invoice)} >view</button>
            </div>

        </div>
    )
}

export default CreateInvoice