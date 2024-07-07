import React, { useState } from 'react'
import { ICREATE_SALES_ORDER_PRODUCT, ICreateSalesOrder, ISALES_ORDER_PRODUCT, ISalesOrder } from '../Model/model'
import { useAppSelector } from '../../../store/app/hooks'
import SelectBillingInfo from './layouts/SelectBillingInfo'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import SalesInformation from './layouts/SalesInformation'
import ProductTable from './layouts/Table'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import TotalSection from './layouts/TotalSection'
import { calculateTaxAmount } from '../../../utils/calculateTaxAmount'
import { toast } from 'react-toastify'
import { createSalesOrderAction } from '../../../store/actions/salesOrders/action'

type Props = {}

const CreateSalesOrders = (props: Props) => {
    const { _id, name, adress, phone, pincode } = useAppSelector(state => state.userData)
    const [data, setData] = useState<ICreateSalesOrder>(
        {
            date: '',
            delivery_Date: '',
            due_Date: '',
            from: {
                adress: adress,
                name: name,
                phone: phone,
                pincode: pincode
            },
            id: _id,
            invoice_No: '',
            notes: [],
            payment_Terms: [],
            product: [],
            ship_To: {
                adress: '',
                name: '',
                phone: '',
                pincode: ''
            },
            shipping_Meathod: '',
            to: {
                adress: '',
                name: '',
                phone: '',
                pincode: ''

            },
            Total: 0,
            total_Discount: 0
        }
    )


    function handleProductChange(array: ICREATE_SALES_ORDER_PRODUCT[]): { total: number, tax: number } {
        let total = 0;
        let tax = 0;
        array.map((value: ICREATE_SALES_ORDER_PRODUCT) => {
            value.tax.map((val: any) => {
                tax = tax + calculateTaxAmount((value.rate * value.quantity), val.amount)
            })
            console.log('tax', tax)

            return total = total + ((value.rate * value.quantity))
        })
        return { total, tax };
    }

    function handleTableData(value: ICREATE_SALES_ORDER_PRODUCT[]) {
        const { tax, total } = handleProductChange(value)
        setData((prev) => { return { ...prev, product: value, Total: total + tax } });
    }





    return (
        <div className='w-full h-full p-5  gap-5 overflow-auto'>
            {/* <div className='text-xl '> Create Sales Order</div> */}
            <PageHeading name='Create Sales Order' />
            <div className='h-[18%] mt-5 bg-component rounded-lg '>
                <SelectBillingInfo set={(value: any, name: string) => { console.error(name); setData((prev) => { return { ...prev, [name]: value } }) }} value={[data.to.name, data.ship_To.name]} />
            </div>

            <div className='h-[15%] mt-5 bg-component rounded-lg'>
                <SalesInformation Delivery={data.delivery_Date} due={data.due_Date} order_no={data.invoice_No} shipping_Meathod={data.shipping_Meathod} set={(value: string, name: string) => { setData(prev => { return { ...prev, [name]: value } }) }} />
            </div>

            <div className='h-[60%] rounded-lg mt-5 bg-component'>
                <ProductTable update={(value: ICREATE_SALES_ORDER_PRODUCT[]) => { handleTableData(value) }} array={data.product} push={(value: ISALES_ORDER_PRODUCT) => { setData(prev => { return { ...prev, product: [...prev.product, value] } }) }} />
            </div>
            <div className='w-full bg-component h-[25%] mt-5 rounded-lg' >
                <TotalSection amount={data.Total} products={data.product} />
            </div>
            <div className='mt-5'>
                <SolidButton color='black' innerText='Save' onClick={() => { console.log(data); createSalesOrderAction(data) }} />
            </div>

        </div>
    )
}

export default CreateSalesOrders