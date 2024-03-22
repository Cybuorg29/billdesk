import { useId, useState } from 'react'
import SelectSenderInfo from './layouts/SelectSendToInfo'
import { IPURCHASE_ORDER, IPURCHASE_ORDER_PRODUCT } from '../model/model'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import ProductTable from './layouts/Table'
import AddProductDialog from './layouts/AddProductDialog'

type Props = {}

const CreatePurchaseOrder = (props: Props) => {
    const keys = {
        heading: useId(),
        button: useId(),
        dialog: useId()
    }

    const [data, setData] = useState<IPURCHASE_ORDER>(
        {
            date: '',
            from: {
                adress: '',
                gstin: '',
                name: '',
                phone: ''
            },

            id: '',
            note: [],
            po_NO: '',
            products: [],
            ref: '',
            terms_And_Conditions: [{
                description: '',
                type: ''
            }],
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
    )

    const [openDialog, setOpenDialog] = useState<boolean>(false)
    return (
        <section className='p-5 w-full h-full  relative '>
            {/* <div className='h-[5%]'>
                <PageHeading name='Create Purchase Order' key={keys.heading} />
            </div> */}
            <AddProductDialog isOpen={openDialog} close={() => { setOpenDialog(false) }} push={(value: IPURCHASE_ORDER_PRODUCT) => { setData((prev) => { return { ...prev, products: [...prev.products, value] } }) }} key={keys.dialog} />


            <div className='p-4 w-full h-full flex flex-col gap-5 bg-component rounded-xl shadow-lg'>
                <div className='w-full h-[20%]   '>
                    <SelectSenderInfo onchange={(value: any, name: string) => { console.log(value.name); setData((prev) => { return { ...prev, [name]: value } }) }} values={[data.from.name, data.ship_To.name]} />

                </div>
                <div className='h-[60%] border  rounded-xl'>
                    <div className='h-[90%] border-t-2 border-black '>
                        <ProductTable array={data.products} />
                    </div>
                    <div className='w-full h-[10%] cursor-pointer bg-blue-200/60 grid place-content-center rounded-b-xl  ' onClick={() => { (!openDialog) ? setOpenDialog(true) : setOpenDialog(false) }}>
                        <div>Add + </div>
                    </div>

                </div>

                <div className=''>
                    <SolidButton color='black' innerText='Save' onClick={() => { console.log(data) }} key={keys.button} />
                </div>
            </div>
        </section>
    )
}

export default CreatePurchaseOrder