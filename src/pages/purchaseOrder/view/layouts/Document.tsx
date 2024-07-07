import React, { useEffect, useId, useState } from 'react'
import { useAppSelector } from '../../../../store/app/hooks'
import { toast } from 'react-toastify'
import { IPURCHASE_ORDER } from '../../model/model'
import { initlisePurchaseOrderArray } from '../functions/initlisePurchaseOrder'
import Table from './Table'
import TermsAndConditionSection from '../components/TermsAndConditionSection'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'
import NotesSection from '../components/NotesSection'

type Props = { _id: string | undefined, doc: string, targetref: any }

const Document = ({ _id, doc, targetref }: Props) => {
    const { purchase_Order } = useAppSelector(state => state.po)
    const [data, setData] = useState<IPURCHASE_ORDER>({
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
        ,
        _id: '',
        bills: [],
        createdAt: '',
        updatedAt: ''
    });


    const keys = {
        table: useId()
    }







    useEffect(() => {
        setData((prev: any) => initlisePurchaseOrderArray(purchase_Order, _id));
        console.log(data)
    }, [purchase_Order, _id])
    return (
        <>
            <div className='w-full min-h-full  overflow-auto  p-4  font-bold text-sm ' ref={targetref} >
                <div className='text-end'>{doc}</div>
                <div className='h-[6%] border-2 grid place-content-center  border-black font-bold text-xl text-center'>Purchase Order</div>
                <div className='border-t-0 border-2 pt-1 border-black h-fit  grid grid-cols-2 '>
                    <div className='pl-2'>
                        <div>{data.from.name}</div>
                        <div>{data.from.adress}</div>
                        <div>{data.from.phone}</div>
                        <div>{data.from.gstin}</div>
                    </div>
                    <div className='pr-2 grid  grid-cols-2 justify-items-end '>
                        <div>P.O Number :</div>
                        <div> {data.po_NO}
                        </div>
                        <div>Date :</div>
                        <div>{data.date}</div>
                        <div>Quotation Ref : </div>
                        <div>{(data.ref.length === 0) ? "---" : data.ref}</div>
                    </div>

                </div>
                <div className='grid pl-2 border-2 border-t-0 border-black font-bold'>
                    <div className='text-lg'>To,</div>
                    <div className=''>{data.to.name}</div>
                    <div className=''>{data.to.adress}</div>
                    <div className=''>{data.to.phone}</div>
                    <div className=''>{data.to.gstin}</div>

                </div>
                <div className='h-[3%] border-2 border-t-0 text-xs pl-2 font-bold border-black'>
                    purchase Order Valid From : {data.date} to {data.valid_Date}
                </div>
                <div className='h-fit w-full '>
                    <Table array={data.product} key={keys.table} />
                    <div className='flex gap-4 place-content-end items-center border-2  border-black  pr-3 border-t-0'>
                        Total : {converToInrFormat(data.total)}
                    </div>
                </div>
                <div className='h-fit w-full font-bold text-sm  border-black border-2  border-b-0 border-t-0'>
                    <TermsAndConditionSection array={data.terms_And_Conditions} />
                </div>
                <div className='min-h-[3rem] borer-t-0 border-2 border-black'>
                    <NotesSection array={data.note} />
                </div>
                <div className='h-[6rem] border-black border-2 border-t-0 grid items-end pl-5 p-3'>
                    <div >Authority Signature</div>

                </div>

            </div>
        </>
    )
}

export default Document