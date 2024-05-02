import { useEffect, useId, useState } from 'react'
import SelectSenderInfo from './layouts/SelectSendToInfo'
import { ICREATE_PURCHASE_ORDER, ICREATE_PURCHASE_ORDER_PRODUCT, IPurchaseOrderBody } from '../model/model'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import ProductTable from './layouts/Table'
import AddProductDialog from './components/AddProductDialog'
import { limitDecimalDigits } from '../../../utils/limitDecimalDigits'
import { converToInrFormat } from '../../../utils/ConvertInrFormat'
import TopSection_NoAnsDate from './layouts/TopSection_NoAnsDate'
import TermsAndConditonSection from './layouts/TermsAndConditonSection'
import removeIndexFromArray from './functions/removeIndex'
import Notes from './layouts/Notes'
import { createPurchaseOrderAction } from '../../../store/actions/purchaseOrder/action'
import { useAppSelector } from '../../../store/app/hooks'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom'

type Props = {}

const CreatePurchaseOrder = (props: Props) => {
    const { name, adress, gstin, phone } = useAppSelector(state => state.userData)
    const keys = {
        heading: useId(),
        button: useId(),
        dialog: useId()
    }
    const navigate = useNavigate();

    const [data, setData] = useState<ICREATE_PURCHASE_ORDER>(
        {
            date: '',
            from: {
                adress: adress,
                gstin: gstin,
                name: name,
                phone: phone
            },

            id: '',
            note: [],
            po_NO: '',
            product: [],
            ref: '',
            terms_And_Conditions: [],
            to: {
                adress: '',
                gstin: '',
                name: '',
                phone: ''
            },
            total: 0,
            valid_Date: '',
            ship_To: {
                adress: '',
                gstin: '',
                name: '',
                phone: ''

            }
        }
    );




    function calculateTaxAmount(rate: number, amount: number): number {
        return limitDecimalDigits((rate / 100) * amount);
    }



    function calculateTotalTax(): number {
        let num = 0;
        data.product.map((index: ICREATE_PURCHASE_ORDER_PRODUCT) => {
            let tax = 0;
            index.tax.map((taxs: any) => {
                return tax = tax + calculateTaxAmount(taxs.amount, (index.quantity * index.rate));
            })

            num = num + tax;
        })
        return num
    }


    function calculateGrandTotal(products: ICREATE_PURCHASE_ORDER_PRODUCT[]) {
        let total = 0;
        products.map((index: ICREATE_PURCHASE_ORDER_PRODUCT) => {
            let tax = 0;
            index.tax.map((taxs: any) => {
                return tax = tax + calculateTaxAmount(taxs.amount, (index.quantity * index.rate));
            });
            total = total + (index.quantity * index.rate) + tax;
        })
        return total;
    }





    function validate(data: ICREATE_PURCHASE_ORDER): Boolean {
        try {

            if (data.date.length === 0) throw new Error("Please Add Date to Save the PO");
            if (data.po_NO.length === 0) throw new Error("Please Add PO Number to Save the PO");
            if (data.to.name.length === 0) throw new Error("Please Add Billed To ")
            if (data.ship_To.name.length === 0) throw new Error("Please Add Shipped To ")
            if (data.product.length === 0) throw new Error("Please Add At Least 1 Product  to Save the PO");
            else {
                data.product.map((index: ICREATE_PURCHASE_ORDER_PRODUCT) => {
                    if (index.quantity === 0) throw new Error("Cannot Add Product With 0 Quantity")
                })
            }

        } catch (Err: any) {
            toast.info(Err.message)
            return false;
        }
        return true

    }




    const [openDialog, setOpenDialog] = useState<boolean>(false)
    return (
        <section className='p-2 w-full h-full  relative  '>
            {/* <div className='h-[5%]'>
                <PageHeading name='Create Purchase Order' key={keys.heading} />
            </div> */}
            <AddProductDialog isOpen={openDialog} close={() => { setOpenDialog(false) }} push={(value: ICREATE_PURCHASE_ORDER_PRODUCT) => { setData((prev) => { return { ...prev, product: [...prev.product, value] } }) }} key={keys.dialog} />


            <div className='p-4 w-full h-full flex flex-col  gap-5 bg-component rounded-xl shadow-lg overflow-auto'>
                <div className='h-[8%] flex gap-5 items-center '>
                    <TopSection_NoAnsDate qut_ref={data.ref} setRef={(value: string) => setData((prev) => { return { ...prev, ref: value } })} poNo={data.po_NO} setData={(value: string) => { setData((prev) => { return { ...prev, po_NO: value } }) }} dates={{ from: data.date, till: data.valid_Date }} setDates={(value: string, type: 'date' | 'valid_Date') => { setData((prev) => { return { ...prev, [type]: value } }) }} />
                </div>
                <div className='w-full h-[10%] '>
                    <SelectSenderInfo onchange={(value: any, name: string) => { console.log(value.name); setData((prev) => { return { ...prev, [name]: value } }) }} values={[data.from.name, data.ship_To.name]} />
                </div>
                <div className='max-h-[70%] min-h-[40%] border  rounded-xl'>
                    <div className='h-[90%] border-t-2 border-black '>
                        <ProductTable array={data.product} setArray={(value: ICREATE_PURCHASE_ORDER_PRODUCT[]) => { setData((prev) => { return { ...prev, product: value, total: limitDecimalDigits(calculateGrandTotal(value)) } }) }} />
                    </div>
                    <div className='w-full border-t border-blue-200 h-[10%]  cursor-pointer bg-blue-200/60 grid place-content-center rounded-b-xl  ' onClick={() => { (!openDialog) ? setOpenDialog(true) : setOpenDialog(false) }}>
                        <div>Add + </div>
                    </div>

                </div>

                <div className='h-[10%] items-center grid text-sm place-content-end p-1 grid-rows-3  gap-4  border rounded-lg'>

                    <div className='items-center grid  grid-cols-2   place-content-end'>
                        <div className='text-end'>Amount Before Tax :</div>
                        <div>
                            {
                                converToInrFormat(data.total - calculateTotalTax())
                            }
                        </div>
                    </div>

                    <div className='items-center grid  grid-cols-2   place-content-end'>
                        <div className='text-end'>Total Tax :</div>
                        <div>
                            {
                                converToInrFormat(calculateTotalTax())
                            }
                        </div>
                    </div>
                    <div className=' items-center grid grid-cols-2  place-content-end '>
                        <div className='text-end'>Grand Total :</div>
                        <div>
                            {
                                converToInrFormat(data.total)
                            }
                        </div>
                    </div>

                </div>



                <div className='h-fit border rounded-lg p-2'>
                    <TermsAndConditonSection array={data.terms_And_Conditions} pushTerm={(value: any) => { setData((prev) => { return { ...prev, terms_And_Conditions: [...prev.terms_And_Conditions, value] } }) }} remove={(i: number) => { setData((prev) => { return { ...prev, terms_And_Conditions: removeIndexFromArray(prev.terms_And_Conditions, i) } }) }} />
                </div>

                <div className='h-fit border rounded-lg p-2'>
                    <Notes array={data.note} close={(i: number) => { setData((prev) => { return { ...prev, note: removeIndexFromArray(data.note, i) } }) }} push={(value: string) => { setData((prev) => { return { ...prev, note: [...prev.note, value] } }) }} />

                </div>


                <div className=''>
                    <SolidButton color='black' innerText='Save' onClick={async () => {
                        console.log(data);
                        if (validate(data)) {
                            await createPurchaseOrderAction(data)
                            navigate('/dashboard/purchase order')
                        }
                    }} key={keys.button} />
                </div>
            </div>
        </section>
    )
}

export default CreatePurchaseOrder