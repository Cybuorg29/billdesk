import React, { useEffect, useState } from 'react'


export type productSchema = {

    _id: string
    name: string
    description: string
    code: string
    sgst: number
    cgst: number
    __v: number
    image: string
    rate: number
    qty: number
    amt: number
    sgstAmt: number
    cgstAmt: number
    id: number

}

type productArray = {
    data: productSchema[]
}


type Props = {}

const InvoiceTable: React.FC<productArray> = ({ data }) => {
    console.log('tableInvoice', data)
    const [grandTotal, setGrandTotal]: any = useState(0)
    const [total, setTotal] = useState(0)
    const [totalCgst, setTotalCgst]: any = useState(0)
    const [totalSgst, setTotalSgst]: any = useState(0)

    useEffect(() => {
        console.log('effect')
        data.map((index: productSchema, i) => {
            //   console.log('datamap',i)
            //  console.log('taxable value',taxablevalue)
            //  grand = grand + taxablevalue;
            //  console.log('grand',grand)
            // Cgst = Cgst + index.cgstAmt
            // Sgst = Sgst + index.sgstAmt


            // if(i===data.length-1){
            //    console.log('asdasd')
            //    console.log(grand)
            //   setGrandTotal(grand)
            //   console.log(grandTotal)

            // }
            const taxablevalue: number = index.amt - (index.sgstAmt + index.cgstAmt);
            setTotal((prev: number) => prev + taxablevalue)
            setTotalCgst((prev: number) => prev + index.cgstAmt)
            setTotalSgst((prev: number) => prev + index.sgstAmt)
            setGrandTotal((prev: number) => prev + index.amt)
        })

    }, [data])

    const AmountDetails = (aaa: { name: string, amt: number }) => {
        return <div className='flex   grid-cols-2 gap-2 ' key={`de${aaa.name}`} >
            <div>{aaa.name} :</div>
            <div>{aaa.amt}</div>
        </div>
    }


    return (
        <div>


            <table className='w-full  table-auto' >
                <thead>
                    <tr className='border border-black' >
                        <th className='text-sm  border-r border-black ' >Sr. No</th>
                        <th className='text-sm  border-r border-black ' >Product Description</th>
                        <th className='text-sm  border-r border-black ' >HSN code</th>
                        <th className='text-sm  border-r border-black ' >Qty</th>
                        <th className='text-sm  border-r border-black ' >Rate</th>
                        <th className='text-sm  border-r border-black ' >Taxable Value</th>
                        <th className='text-sm  border-r border-black ' >
                            <div className='grid ' >
                                <div className='border-b border-black' >GST%</div>
                                <div className=' grid grid-cols-2  ' >
                                    <div className='border-r border-black  text-center' >SGST</div>
                                    <div className='text-center' >CGST</div>
                                </div>

                            </div>
                        </th>
                        <th className='text-sm  border-r border-black ' >
                            <div className='grid ' >
                                <div className='border-b border-black' >GST</div>
                                <div className='grid grid-cols-2' >
                                    <div className='border-r border-black  ' >SGST</div>
                                    <div className='text-center' >CGST</div>
                                </div>

                            </div>
                        </th>
                        <th className='text-sm' >Total</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        data.map((index, i) => {
                            const taxablevalue: number = index.amt - (index.sgstAmt + index.cgstAmt)
                            return (
                                <>
                                    <tr className='border border-black' key={`tr${i}`} >
                                        <th className='text-sm  border-r border-black  font-black ' >{++i}</th>
                                        <th className='text-sm  border-r border-black  font-black ' >{index.description}</th>
                                        <th className='text-sm  border-r border-black  font-black ' >{index.code}</th>
                                        <th className='text-sm  border-r border-black  font-black ' >{index.qty}</th>
                                        <th className='text-sm  border-r border-black  font-black ' >{index.rate}</th>
                                        <th className='text-sm  border-r border-black  font-black ' >{taxablevalue}</th>
                                        <th className='text-sm  border-r border-black  font-black ' >
                                            <div className='grid grid-cols-2' >
                                                <div className='border-r border-black' >{index.cgst}</div>
                                                <div>{index.sgst}</div>
                                            </div>
                                        </th>
                                        <th className='text-sm  border-r border-black  ' >
                                            <div className='grid grid-cols-2' >
                                                <div className='border-r border-black' >{index.cgstAmt}</div>
                                                <div>{index.sgstAmt}</div>
                                            </div>
                                        </th>
                                        <th className='text-sm   ' >{index.amt}</th>
                                    </tr>
                                </>
                            )
                        })

                    }
                </tbody>
            </table>
            <div className='grid justify-items-end p-2 border border-black text-sm  ' >
                <AmountDetails name={`Total`} amt={total} />
                <AmountDetails name={`CGST`} amt={totalCgst} />
                <AmountDetails name={`SGST`} amt={totalSgst} />
                <AmountDetails name={`Grand Total `} amt={grandTotal} />
            </div>





        </div>
    )


}

export default InvoiceTable
