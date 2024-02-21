import { MenuItem, Select } from '@mui/material'
import React, { useEffect, useId, useState } from 'react'
import { useAppSelector } from '../../../../store/app/hooks'
import { getConnection } from '../../../../store/actions/connections/set'
import InitliseConnectionsArray from './functions/initlizeConnectionsArray'
import { IbillsPaylable, IcreateBillsPayable } from '../../../../store/features/bills/receivable/model'
import { creatBilledFromObj } from './functions/createBilledFrom'
import Selector from './components/Selector'
import SelectProducts from './components/SelectProducts'
import ProductTable from './layouts/ProductTable'
import { limitDecimalDigits } from '../../../../utils/limitDecimalDigits'
import { roundNumber } from '../../../../utils/RoundOff'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'
import { toast } from 'react-toastify'
import GrandTotalSection from './layouts/GrandTotalSection'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'
import { insertBillsPayable } from '../../../../store/actions/bills/payable/insert'
import { updateProductQuantityOnly } from '../../../../store/actions/products/add/quantity'
import { IInvoiceProduct, ProductObj } from '../../../../models/inventory/productModel'

type Props = {}

const CreateBillsPayable = (props: Props) => {
    const { connections, isConnection } = useAppSelector(state => state.connections);
    const { isProducts, products } = useAppSelector(state => state.product)
    const { istoken, token } = useAppSelector(state => state.auth)
    const [connectionsArray, setConnectionsArray] = useState([]);
    const [rroundOffNum, setRoundOffNum] = useState<number>(0);
    const [isRoundOff, setIsRoundOff] = useState<boolean>(false);
    const [addProductScale, setAddProductScale] = useState<boolean>(false)

    const [data, setData] = useState({
        billed_From: {
            adress: '',
            gstin: '',
            id: '',
            name: '',
            state: ''
        },
        token: token,
        isPaid: false,
        po: '',
        products: [],
        total: 0
    });





    function calculateGrandTotal() {
        let total = 0;
        data.products.map((index: any) => {
            total = total + index.total;
        })
        return total;
    }





    async function roundOff() {
        if (isRoundOff) {
            setRoundOffNum(roundNumber(data.total) - calculateGrandTotal());
            setData((prev) => { return { ...prev, total: roundNumber(prev.total) } })
        } else {

            setData((prev) => { return { ...prev, total: calculateGrandTotal() } })
        }
    }


    useEffect(() => {
        if (!isConnection) getConnection();
        else {
            setConnectionsArray(InitliseConnectionsArray([...connections.client, ...connections.supplier]))
        }
    }, [connections, isConnection])





    useEffect(() => {
        setData((prev) => { return { ...prev, total: calculateGrandTotal() } })
    }, [data.products])





    useEffect(() => {
        // setData((prev) => { return { ...prev, total: calculateGrandTotal() } })
        roundOff();
    }, [data.total, isRoundOff])

    useEffect(() => {
        setData((prev) => { return { ...prev, token: token } })
    }, [istoken, token])


    function submit() {
        insertBillsPayable(data);
        let newArray: any[] = []
        data.products.map((value: any) => {
            return products.map((index: ProductObj) => {
                if (value.id === index._id) {
                    newArray.push({
                        id: index._id,
                        qty: (index.stock + parseInt(value.qty))

                    })
                }
            })

        })
        console.log(newArray);
        Promise.all(newArray.map((index: any) => {
            updateProductQuantityOnly(index.id, index.qty)
        }))
    }




    const keys = {
        selector: useId(),
        selectProduct: useId(),
        productTable: useId()
    }



    return (
        <div className='w-full h-full  flex flex-col gap-4 rounded-xl  p-4 bg-component'>
            <SelectProducts scale={addProductScale} setInvoice={setData} setMinStock={() => { }} setScale={setAddProductScale} key={keys.selectProduct} />
            <div className=' flex h-[8%]   gap-5  place-content-center'>
                <Selector connectionsArray={connectionsArray} data={data} setData={setData} key={keys.selector} />
            </div>
            <div className='h-[60%] border'>
                <ProductTable invoice={data} setInvoice={setData} key={keys.productTable} />
            </div>
            <div className='h-[5%]'>
                <GrandTotalSection isRoundOff={isRoundOff} rroundOffNum={rroundOffNum} setIsRoundOff={setIsRoundOff} setRoundOffNum={setRoundOffNum} total={data.total} key={'asdas'} />
            </div>
            <div className=''>
                <SolidButton color='black' innerText='Insert' onClick={() => { console.log('data', data); submit() }} key={'addButotn'} />

            </div>

        </div>
    )
}

export default CreateBillsPayable