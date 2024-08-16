import { Dialog, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ICreateDebitNote, IDebitNote } from '../../../store/features/debitNote/model'
import { useAppSelector } from '../../../store/app/hooks'
import { setPayablesAction } from '../../../store/actions/bills/payable'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import Table from './layouts/Table'
import { IInvoiceProduct } from '../../../models/inventory/productModel'
import removeIndex from '../../../utils/removeIndex'
import { createDebitNote } from '../../../store/actions/debitNote/action'
import { Input } from '@mui/joy'
import { initlisePurchaseOrder } from '../../../store/actions/purchaseOrder/action'
import { toast } from 'react-toastify'

type Props = {
    open: boolean,
    close: any
}

const CreateDebitNote = ({ close, open }: Props) => {
    const { userData, payables, auth, po, bank } = useAppSelector(state => state);
    const [Data, setData] = useState<ICreateDebitNote>({
        against_Invoice_Id: '',
        against_Invoice_No: '',
        bank: {
            name: bank.name,
            bank: bank.bank,
            ifsc: bank.isfc,
            ac_no: bank.no
        },
        debit_Note_Date: '',
        from: {
            adress: userData.adress,
            gmail: userData.email,
            gstin: userData.gstin,
            name: userData.name,
            phone: userData.phone,
            state: userData.state
        },
        id: '',
        note_No: '',
        place_Of_Supply: '',
        products: [],
        to: {
            adress: '',
            gmail: '',
            gstin: '',
            name: '',
            phone: '',
            state: ''
        },
        total: 0,
        token: '',
        po_id: ''
    });



    function returnToInitialState() {
        return {
            against_Invoice_Id: '',
            against_Invoice_No: '',
            bank: {
                name: bank.name,
                bank: bank.bank,
                ifsc: bank.isfc,
                ac_no: bank.no
            },
            debit_Note_Date: '',
            from: {
                adress: userData.adress,
                gmail: userData.email,
                gstin: userData.gstin,
                name: userData.name,
                phone: userData.phone,
                state: userData.state
            },
            id: '',
            note_No: '',
            place_Of_Supply: '',
            products: [],
            to: {
                adress: '',
                gmail: '',
                gstin: '',
                name: '',
                phone: '',
                state: ''
            },
            total: 0,
            token: '',
            po_id: ''
        }

    }


    function updatePO_ID(no: string) {
        const find = po.purchase_Order.find((value) => value.po_NO === no);
        if (find) setData((prev) => { return { ...prev, po_id: find._id } });
    }


    function handleQtyChange(value: number, index: number, data: ICreateDebitNote): ICreateDebitNote {
        let newData: ICreateDebitNote = JSON.parse(JSON.stringify(Data));
        console.log('newData', newData)
        newData.products[index].qty = value;
        newData.products[index].total = newData.products[index].qty * newData.products[index].rate
        return newData
    }



    function calculateTaxAmount(rate: number, amount: number): number {
        return (rate / 100) * amount;
    }

    function calculateGrandTotal() {
        let total = 0;
        Data.products.map((index: any) => {
            total = total + index.total;
        })
        return total;
    }


    function validateAndPush(obj: ICreateDebitNote) {
        try {

            if (obj.against_Invoice_Id.length == 0) throw Error("Please Select Invoice");
            if (obj.note_No.length == 0) throw Error("Please Insert Debit Note Number");
            if (obj.products.length === 0) throw Error("Please Add atleast 1 product");
            createDebitNote(obj);
            close();
        } catch (Err: any) {
            toast.error(Err.message)
        }

    }


    useEffect(() => {
        if (!payables.isLoaded) setPayablesAction(new Date().getMonth() + 1);
        if (!po.isLoaded) initlisePurchaseOrder();
    }, [payables, auth, po]);

    useEffect(() => {

        const findInvoice = payables.invoice.find((value) => value._id === Data.against_Invoice_Id);
        if (findInvoice) setData((prev) => {
            return {
                ...prev, to: {
                    adress: findInvoice.billed_From.adress,
                    gstin: findInvoice.billed_From.gstin,
                    name: findInvoice.billed_From.name,
                    gmail: '',
                    phone: '',
                    state: findInvoice.billed_From.state

                }
            }
        })


    }, [Data.against_Invoice_Id]);

    useEffect(() => {
        let total = 0
        Data.products.map((index) => {
            let tax = 0
            index.tax.map((t) => {
                tax = tax + calculateTaxAmount(t.amount, index.total);
            })
            const tot = (index.total) + tax
            total = total + tot;
        })
        setData((prev) => { return { ...prev, total: total } });

    }, [Data.products])

    useEffect(() => {
        setData((prev) => {
            return {
                ...prev, from: {
                    adress: userData.adress,
                    gstin: userData.gstin,
                    name: userData.name,
                    gmail: userData.email,
                    phone: userData.phone,
                    state: userData.state,

                },
                bank: {
                    name: bank.name,
                    bank: bank.bank,
                    ifsc: bank.isfc,
                    ac_no: bank.no
                }
            }
        })

    }, [auth.token])






    return (
        <Dialog open={open} fullScreen className='w-full p-5' >
            <div className='flex h-[10%] w-full place-content-between border-b-2'>
                <div className='text-2xl p-5'>Create Debit Note</div>
                <div className='p-5 cursor-pointer text-xl' onClick={() => { setData(() => returnToInitialState()); close() }}>X</div>
            </div>
            <div className='p-5 h-[80%]  '>
                <div className='h-[20%]  m-2 grid-cols-2 grid '>
                    <div className='w-full h-full grid'>
                        Invoice :
                        <Select value={Data.against_Invoice_Id} className='w-full' onChange={(e) => { setData((prev) => { return { ...prev, against_Invoice_Id: e.target.value } }) }}>
                            {
                                payables.invoice.map((value) => {
                                    return <MenuItem value={value._id} onClick={(e: any) => { setData((prev) => { return { ...prev, against_Invoice_No: (value.no || '') } }); updatePO_ID(value.po) }}>{value?.no}</MenuItem>
                                })
                            }

                        </Select>
                    </div>
                    <div className='m-2  grid'>
                        Debit Note Number :
                        <Input value={Data.note_No} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setData((prev) => { return { ...prev, note_No: e.target.value } }) }} />
                    </div>
                </div>
                <div className='h-[70%] '>
                    <Table remover={(index: number) => { setData((prev) => { return { ...prev, products: removeIndex(prev.products, index) } }) }} products={Data.products} invoice_Id={Data.against_Invoice_Id} add={(value: IInvoiceProduct) => setData((prev) => { return { ...prev, products: [...prev.products, value] } })} handleQtyChange={(value: number, index: number) => { setData((prev) => handleQtyChange(value, index, prev)) }} />

                </div>
                <div className='h-[10%] grid grid-cols-2 pl-4  '>
                    <div className='flex items-center'>Grand Total</div>
                    <div className='flex items-center text-end place-content-end pr-5'>{Data.total}</div>

                </div>





            </div>
            <div className='pl-5 flex gap-5 '>
                <SolidButton color='black' innerText='Save' onClick={() => { console.log(Data); validateAndPush(Data) }} />
                <SolidButton color='black' innerText='View' onClick={() => { console.log(Data); console.log() }} />
            </div>

        </Dialog>
    )
}

export default CreateDebitNote