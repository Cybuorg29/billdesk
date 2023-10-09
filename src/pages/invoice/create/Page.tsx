import React, { useEffect, useId, useState } from 'react'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton';
import { IcreateInvoice } from '../../../models/invoice';
import Inputs from '../../inventory/create/components/Inputs';
import SelectNameTab from './components/SelectNameTab';
import { useAppSelector } from '../../../store/app/hooks';
import { getConnection } from '../../../store/actions/connections/set';
import { toast } from 'react-toastify';
import SelectInfo from './layouts/SelectInfo';

type Props = {}

const CreateInvoice = (props: Props) => {
    const { connections, isConnection } = useAppSelector(state => state.connections)
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
        date_of_supply: '',
        discount: 0,
        Grand_total: 0,
        gst_On_Reverce_Charge: 0,
        invoice_Date: '',
        invoice_No: '',
        place_of_supply: '',
        products: [],
        reverce_Charge: false,
        state: '',
        total_Tax: 0,
        transport_Mode: '',
        vehical_No: ''
    })

    const pageHeadingKey = useId();
    const selectInfoKey = useId();
    const viewInvoiceButtonId  = useId();



    useEffect(() => {
        if (!isConnection) {
            toast('getting')
            getConnection();
        }
    }, [])

    useEffect(() => {

    }, [connections])




    return (
        <div className='w-full h-full p-5' >
            <div className='h-[8%] flex place-content-between overflow-hidden'>
                <PageHeading name='Create Invoice' key={pageHeadingKey} />
                <div>
                    <SolidButton color='black' innerText='view invoices' onClick={() => { }} key={viewInvoiceButtonId} />
                </div>
            </div>
            <div className='bg-component  h-[90%] rounded-xl'>
 
                  {/* set General info component/layout */}




                {/* select billed to or shipped to  compoenent */}
                <div className='flex border h-[25%]' >
                    <SelectInfo invoice={invoice} setInvoice={setInvoice} key={selectInfoKey} />
                </div>
                
            </div>

        </div>
    )
}

export default CreateInvoice