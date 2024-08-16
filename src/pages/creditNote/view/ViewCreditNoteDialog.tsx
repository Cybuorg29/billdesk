// import { Dialog } from '@mui/material'
// import React, { useState } from 'react'

// type Props = {
//     _id: string
//     open: boolean
//     close: () => void
// }

// const ViewCreditNoteDialog = (props: Props) => {
//     const [Data, setData] = useState<>()
//     return (
//         <Dialog open={props.open} fullScreen className='p-5'>
//             <div className='w-full h-full '>
//                 <div className='h-[8%] border-b-2 flex place-content-between p-5'>
//                     <div className='text-xl'>Preview</div>
//                     <div className='text-xl cursor-pointer' onClick={()=>props.close()}>X</div>

//                 </div>

//             </div>

//         </Dialog>
//     )
// }

// export default ViewCreditNoteDialog



import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ICreditNote } from '../../../store/features/creditNote/model'
import { useAppSelector } from '../../../store/app/hooks'
import SelfInfo from '../../invoice/view/layout/invoice/SelfInfo'
import { getStateCode } from '../../../utils/getStateCode'
import convertIsoDate from '../../../utils/convertIsoDates'
import { IInvoiceProduct } from '../../../models/inventory/productModel'
import { calculateTaxAmount } from '../../../utils/calculateTaxAmount'
import { Itax } from '../../../models/tax/Model'
import { limitDecimalDigits } from '../../../utils/limitDecimalDigits'
import { converToInrFormat } from '../../../utils/ConvertInrFormat'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { print } from '../../../utils/print'
import { usePDF } from 'react-to-pdf'
import { convertToIndianCurrencyWords } from '../../../utils/convertNumToWord'
import { valueAccessor } from '@syncfusion/ej2-grids'

type Props = {
    open: boolean,
    close: any
    id: string
}

const ViewCreditNoteDialog = ({ open, close, id }: Props) => {
    const [data, setData] = useState<ICreditNote>();
    const { CreditNote, auth } = useAppSelector(state => state)
    const { targetRef, toPDF } = usePDF()



    const [TaxArray, setTaxArray] = useState<{
        tax: Itax,
        rate: number
    }[]>(initliseTaxArray());




    function initliseTaxArray(): {
        tax: Itax
        rate: number
    }[] {

        let newArray: {
            tax: Itax,
            rate: number
        }[] = [];
        if (newArray.length === 0 && data?.products.length !== 0) {
            const rate: any = data?.products[0].tax[0].amount;
            newArray.push({
                tax: {
                    amount: calculateTaxAmount(parseInt(rate), data?.products[0].total || 0),
                    type: data?.products[0].tax[0].type || ''
                },
                rate: rate

            })
            // deletedata.products[0].tax[0]
        }
        data?.products.map((value: IInvoiceProduct, index: number) => {
            value.tax.map((tax: Itax, taxIndex: number) => {
                if (index === 0 && taxIndex === 0) return 0;
                const find = newArray.findIndex((val) => val.tax.type === tax.type);
                if (find === -1) newArray.push({
                    tax: {
                        amount: calculateTaxAmount(tax.amount, value.total),
                        type: tax.type
                    },
                    rate: tax.amount

                })
                else {
                    newArray[find].tax.amount = newArray[find].tax.amount + calculateTaxAmount(tax.amount, value.total);
                }

            })
        })

        return newArray;


    }


    useEffect(() => {
        if (CreditNote.isLoaded) {
            setTaxArray(() => initliseTaxArray())
        }
    }, [data])

    useEffect(() => {
        if (CreditNote.isLoaded) {
            const find = CreditNote.notes.find((value) => value._id === id);
            if (find) setData(find);
        }
    }, [id, auth.istoken])
    return (
        <Dialog open={open} fullScreen className='p-5' >
            <div className='w-full h-full '>

                <div className='flex h-[8%] place-content-between p-3  border-b-2'>
                    <div className='text-xl'>Credit Note</div>
                    <div className='text-xl cursor-pointer' onClick={() => { close(); }}>X</div>
                </div>
                <div className='h-[90%] flex gap-2 font-rubik font-semibold'>
                    <div className='h-full overflow-auto  w-[80%] border-2 border-t-0  '
                    >
                        <div className='h-fit w-full p-10 ' ref={targetRef}>

                            <div className='flex place-content-between'>
                                <div>{data?.from.gstin}</div>
                                <div className='text-sm'>Original for receipent/dublicate for transport / triplicate for Sender</div>

                            </div>



                            <div className='w-full  min-h-[15rem]  border-2  border-black' >
                                <div className='p-3 border-b-2 border-black flex place-content-center text-lg'>Credit Note</div>
                                <div className='min-h-[15rem]  border-b-2 border-black grid grid-cols-2 '>
                                    <div className='grid grid-rows-2 border-r-2 border-black'>
                                        <div className='grid pl-2 '>
                                            <div>{data?.from.name}</div>
                                            <div>{data?.from.adress}</div>
                                            <div>{data?.from.gstin}</div>
                                            <div>{data?.from.phone}</div>
                                            <div>{data?.from.state}</div>
                                            <div>{getStateCode(data?.from.state)}</div>
                                        </div>
                                        <div className='grid pl-2 border-t-2 border-black '>
                                            <div>Billed from :</div>
                                            <div>{data?.to.name}</div>
                                            <div>{data?.to.adress}</div>
                                            <div>{data?.to.gstin}</div>
                                            <div>{data?.to.phone}</div>
                                            <div>{data?.to.state}</div>
                                            <div>{getStateCode(data?.from.state)}</div>
                                        </div>

                                    </div>

                                    <div className='grid grid-cols-2 grid-rows-3'>
                                        <div className='p-2 border-r-2 border-black'>
                                            <div>Debit Note No</div>
                                            <div>{data?.note_No}</div>
                                        </div>
                                        <div className='p-2 '>
                                            <div>Dated</div>
                                            <div>{convertIsoDate(data?.createdAt).split('at')[0]}</div>
                                        </div>
                                        <div className='p-2 border-t-2 border-black border-r-2'>
                                            <div>Original Invoice No </div>
                                            <div>{data?.against_Invoice_No}</div>
                                        </div>
                                        <div className='p-2 border-t-2 border-black '>
                                            <div> Bill Of Landing </div>
                                            <div>{convertIsoDate(data?.createdAt)}</div>
                                        </div>

                                        <div className='p-2 border-t-2 border-black border-r-2'>
                                            <div> Vehical No </div>
                                            <div>{data?.vehical_No}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* gap */}
                                <div className='h-[1rem] border-b-2 border-black'></div>


                                {/* table */}
                                <div className='  w-full min-h-[10rem] overflow-auto border-t-0 border-b-2 pb-2  text-sm relative  border-black ' >
                                    <div className="flex flex-col" >
                                        <div className="">
                                            <div className="inline-block min-w-full ">
                                                <div className="overflow-hidden   ">
                                                    <table className="min-w-full text-left ">
                                                        <thead className="border-b  text-sm border-black   uppercase sticky top-0">
                                                            <tr className="border-b border-black border-r-0 text-center" >
                                                                <th scope="col" className='px-0.5 py-1 border-r-2  sticky text-black  border-black ' >#</th>
                                                                <th scope="col" className='px-0.5 py-1 border-r-2 border-black text-xs   sticky text-black  ' >Description</th>
                                                                {/* <th scope="col" className='px-0.5 py-1 border-r-2 border-black text-xs   sticky text-black  ' >HSN code</th> */}
                                                                <th scope="col" className='px-0.5 py-1 border-r-2 border-black text-xs   sticky text-black  ' >Qty</th>
                                                                <th scope="col" className='px-0.5 py-1 border-r-2 border-black text-xs   sticky text-black  ' >Unit</th>

                                                                <th scope="col" className='px-0.5 py-1 border-r-2 border-black text-xs   sticky text-black  ' >Rate</th>
                                                                {/* <th scope="col" className='px-0.5 py-1 border-r-2 border-black text-xs   sticky text-black  ' >Amount</th> */}
                                                                <th scope="col" className='px-0.5 py-1  text-xs  sticky text-black  border-black  border-r-0' >Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                data?.products.map((index: IInvoiceProduct, i: number) => {
                                                                    let k = i;
                                                                    return <tr className="border-b border-black  font-bold" key={`index.name${i}`}>

                                                                        <th scope="col" className=' sticky  border-2  border-black  border-l-0 text-start' >{++k}</th>
                                                                        <th scope="col" className=' sticky  border-2  border-black  border-l-0 text-start' >
                                                                            <div>{index.name}</div>
                                                                            <div>{index.description}</div>
                                                                        </th>
                                                                        {/*  <th scope="col" className=' sticky  border-2  border-black  border-l-0 text-center' >>{index.code}</th> */}
                                                                        <th scope="col" className=' sticky  border-2  border-black  border-l-0 text-center' >{index.qty}</th>
                                                                        <th scope="col" className=' sticky  border-2  border-black  border-l-0 text-center' >{index.rate}</th>
                                                                        <th scope="col" className=' sticky  border-2  border-black  border-l-0 text-center' >{index.unit}</th>
                                                                        <th scope="col" className=' sticky  border-2  border-black  border-r-0 text-center' >{index.total}</th>
                                                                    </tr>
                                                                })
                                                            }

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='h-[5rem] border-b-2 border-black'>
                                    <div className='grid  border-b-2 border-black'>
                                        {
                                            TaxArray.map((value: {
                                                tax: Itax,
                                                rate: number
                                            }) => {
                                                return <div className='grid grid-cols-3 pl-2  '>
                                                    <div className='col-span-2 border-r  text-end pr-5 text-bold text-sm border-black'>{value.tax.type}@{value.rate}%</div>
                                                    <div className='pl-2 text-sm text-end pr-5'>{limitDecimalDigits(value.tax.amount)}</div>

                                                </div>
                                            })
                                        }
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        <div className='text-end'>Grand Total</div>
                                        <div className='text-end pr-3'>{converToInrFormat(data?.total) || ''}</div>
                                    </div>
                                </div>
                                <div className='min-h-[10rem]  grid grid-cols-2'>
                                    <div className='border-r-2 border-black p-5'>
                                        Amount in Words
                                        <div>{convertToIndianCurrencyWords(data?.total || 0)}</div>
                                    </div>
                                    <div className='grid grid-cols-2 '>
                                        <div className='h-full w-full p-2 border-r-2 border-black'>
                                            <div className='text-sm'>
                                                <div>A/c Holder Name :</div>
                                                <div>{data?.bank.name || '-'}</div>
                                            </div>

                                            <div className='text-sm  gap-3'>
                                                <div>Bank Name :</div>
                                                <div>{data?.bank.bank || '-'}</div>
                                            </div>
                                            <div className='text-sm  gap-3'>
                                                <div>A/c No :</div>
                                                <div>{data?.bank.ac_no || '-'}</div>
                                            </div>
                                            <div className='text-sm gap-3'>
                                                <div>Branch And IFSC code :</div>
                                                <div>{data?.bank.ifsc || '-'}</div>
                                            </div>

                                        </div>
                                        <div className=' text-sm grid justify-items-center items-end '>
                                            <div>
                                                Authority Signature
                                                <div>{`(${data?.from.name || ''})`}</div>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='h-full  w-[20%]'>
                        <div className='h-[80%]'></div>
                        <div className='h-[20%]'>
                            <SolidButton color='black' innerText='Download Or Print' onClick={() => { print(targetRef, toPDF) }} />
                        </div>
                    </div>


                </div>

            </div>

        </Dialog>
    )
}

export default ViewCreditNoteDialog