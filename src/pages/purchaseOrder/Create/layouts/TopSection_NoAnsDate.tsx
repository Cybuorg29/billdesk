import { Input } from '@mui/joy'
import React from 'react'

type Props = {
    poNo: string
    setData: any
    setDates: any
    dates: {
        from: string
        till: string
    }
    qut_ref: string
    setRef: any
}

const TopSection_NoAnsDate = ({ poNo, setData, dates, setDates, qut_ref, setRef }: Props) => {
    return (
        <>
            <span>Purchase Order No :</span>
            <div><Input value={poNo} onChange={(e) => { setData(e.target.value) }} /></div>
            <div className='h-full  text-xs flex place-content-end   gap-2  rounded-lg'>
                <div className='grid'>
                    <div className='text-end text-gray-400'>Format(dd-mm-yyyy)</div>
                    <div className='flex   place-content-center items-center gap-1  '>
                        <div>Valid From :</div>
                        <div><input title='aaa' className='border ' type='text' value={dates.from} onChange={(e) => { setDates(e.target.value, 'date') }} /></div>
                    </div>
                </div>
                <div className='grid'>
                    <div className='text-end text-gray-400'>Format(dd-mm-yyyy)</div>
                    <div className='flex place-content-center items-center gap-1   '>
                        <div>Valid Till :</div>
                        <div><input title='aaa' className='border' type='text' value={dates.till} onChange={(e) => { setDates(e.target.value, 'valid_Date') }} /></div>
                    </div>
                </div>
            </div>
            <div className='flex gap-5 items-center'>
                <label>Quotation Refrence</label>
                <Input type='text' title='Qut' value={qut_ref} onChange={(e) => setRef(e.target.value)} />

            </div>
        </>
    )
}

export default TopSection_NoAnsDate