import React, { useEffect, useId, useState } from 'react'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import SelectTab from './components/Select';
import { useNavigate, useParams } from 'react-router-dom';
import { ICreateIncome, IIncome } from '../../../models/incomeAndExp/incomeInterface';
import SelectInvoice from './components/SelectInvoice';
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton';
import Inputs from '../../inventory/create/components/Inputs';
import { converToInrFormat } from '../../../utils/ConvertInrFormat';
import { toast } from 'react-toastify';
import PaymentTypeSection from './layouts/PaymentTypeSection';
import { addIncome } from '../../../store/actions/data/IncomeAndExpence';

type Props = {}
export const incomeTypes = {

}

const CreateIncome = (props: Props) => {
    const { type } = useParams();
    const [selectedType, setSelectedType] = useState<'invoice' | 'others'>(set())
    const navigate = useNavigate();
    const [income, setIncome] = useState<ICreateIncome>({
        type: selectedType,
        amount: 0,
        title: '',
        token: '',
        transactionId: '',
        invoiceId: '',
        receivedAs: 'online'
    })
    const pageHeadingKey = useId();
    const selectTabKey = useId();
    const selectInvoiceSectionKey = useId();
    const titleInputKey = useId();
    const amountInputKey = useId();
    const paymenyTypeSectionId = useId();

    function set() {
        if (type === 'invoice') return 'invoice'
        return 'others'
    }

    function validateBeforePush() {
        if (income.amount === 0) toast.info('Cannot Add Income Of ₹0')
        if (income.title === '') toast.info('please add title/Note')
        if (income.type === 'invoice' && income.invoiceId === '') toast.info('Please select the invoice')
        if (income.receivedAs === 'online' && income.transactionId === '') toast.info('Please insert trasnaction id')
        else{
           addIncome({income,navigate});
    }
    }

    useEffect(() => {
        setIncome((prev) => { return { ...prev, amount: 0, title: '', invoiceId: '' } })
    }, [selectedType])

    return (
        <div className='p-5 w-full h-full flex flex-col gap-4 '>
            <div className='h-[10%] flex place-content-between' >
                <PageHeading name='Record Income' key={pageHeadingKey} />
            </div>
            <div className='h-[65%] bg-component rounded-xl p-5  flex flex-col gap-4    ' >
                <div className='grid grid-cols-2 gap-4'>
                    <SelectTab set={setSelectedType} value={selectedType} key={selectTabKey} />
                    <div className='' key={selectInvoiceSectionKey}>
                        {
                            (selectedType === 'invoice') ? <SelectInvoice value={income.invoiceId} set={setIncome} /> : null
                        }
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <Inputs name='Title(Note)' onchange={(e: React.ChangeEvent<HTMLInputElement>) => { setIncome((prev: ICreateIncome) => { return { ...prev, title: e.target.value } }) }} type={typeof income.title} value={income.title} key={titleInputKey} />
                    {
                        (selectedType === 'invoice') ?
                            <Inputs name='Amount' onchange={() => { }} type={'text'} value={converToInrFormat(income.amount)} key={amountInputKey} />
                            : <Inputs name='Amount' onchange={(e: React.ChangeEvent<HTMLInputElement>) => { setIncome((prev: any) => { return { ...prev, amount: e.target.value } }) }} type={typeof income.amount} value={income.amount} key={amountInputKey} />

                    }
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <PaymentTypeSection value={income} set={setIncome} key={paymenyTypeSectionId} />
                </div>


                <div>
                    <SolidButton color='black' innerText='Save' onClick={() => { console.log(income); validateBeforePush() }} />
                </div>
            </div>
        </div>
    )
}

export default CreateIncome