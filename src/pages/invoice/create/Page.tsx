import React, { useEffect, useId, useState } from 'react'
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
import { convertNumToWord } from '../../../utils/convertNumToWord';
import SelectInfo from './layouts/SelectInfo';
import { converToInrFormat } from '../../../utils/ConvertInrFormat';
import BankSection from './layouts/BankSection';
import { createInvoiceAPI } from '../../../api/v2/invoice';
import TermAndConditionSection from './layouts/TermAndConditionSection';
import { createInvoice } from '../../../store/actions/invoice/create';
import { isToken } from 'typescript';

type Props = {}

const CreateInvoice = (props: Props) => {
    const { connections, isConnection } = useAppSelector(state => state.connections)
    const { state } = useAppSelector(state => state.userData)
    const {bank,auth} = useAppSelector(state => state)
     const {token} = auth
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
        state_Code: 0,
        terms_And_Conditions: [],
        bank:{
            bank:'',
            branch:'',
            isfc:'',
            name:'',
            no:''
        },
        id:'',
         isPaid:false
    })

    const selectInfoKey = useId();
    const inputInfoId = useId();
    const productTableKey = useId();
    const termAndConditionKey = useId();
    const bankSectionId = useId();



    useEffect(() => {
        if (!isConnection) {
            getConnection();
        }
    }, [connections]);

    useEffect(() => {
        setInvoice((prev) => { return { ...prev, state: state,state_Code:getStateCode(state),invoice_Date:createDate(),bank:bank,id:token } })
    }, [token,isToken])








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
                  <div className=''>{converToInrFormat(invoice.grand_Total)}</div>
              </div>
               <div className=' h-[15%]  grid grid-cols-2   gap-2 '>
                <div className='h-full overflow-auto'>
                  <TermAndConditionSection array={invoice.terms_And_Conditions} setArray={setInvoice} key={termAndConditionKey} set={setInvoice}  />
                </div>
                   <BankSection invoice={invoice} key={bankSectionId} />
              </div>
              <div className='  pl-2 flex gap-2'>
                     <SolidButton color='black' innerText='Save and Print' onClick={()=>{createInvoice(invoice)}} key={'SolidButton'}/>
                     <SolidButton color='black' innerText='Save' onClick={()=>{createInvoiceAPI(invoice)}} key={'Solid'}/>
                     <SolidButton color='black' innerText='view' onClick={()=>{console.log(invoice)}} key={'joonon'}/>
                 </div>
                 {/* <div className='grid grid-cols-2 h-[15%] '>
                    <div className=' h-full overflow-auto'>
                    <TermAndConditionSection array={invoice.terms_And_Conditions} setArray={setInvoice} key={termAndConditionKey} set={setInvoice}  />
                    </div>
                    <div className='bg-red-900 h-full'></div>

                 </div> */}
        </div>
      
        </>
    )
}

export default CreateInvoice