import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { SolidButton } from '../ui/Buttons/solid/SolidButton'
import { changeIncomeAndExpenceByDates } from '../../store/actions/data/IncomeAndExpence'
import { useAppSelector } from '../../store/app/hooks'

type Props = {
    upper: string,
    lower: string,
    isOpen: boolean,
    close: () => void
    onChange: any
}

const DateChangeDialog = ({ isOpen, lower, upper, close, onChange }: Props) => {
    const { from, to } = useAppSelector(state => state.incomeAndExpence)
    const [dates, setDates] = useState({
        lower: to,
        upper: from
    });








    return (
        <Dialog open={isOpen} fullWidth  >
            <div className='flex place-content-between '>
                <DialogTitle >Select Date </DialogTitle>
                <div className='flex place-content-center items-center  p-5 hover:bg-gray-200 w-[1rem] h-[1rem] m-2 cursor-pointer rounded-full ' onClick={() => { close() }}>
                    <div>X</div>
                </div>
            </div>
            {/* <Typography variant='body1' className='pl-5 ' >click to edit</Typography> */}

            {/* <DialogContentText> */}
            <Typography variant='subtitle1' className='pl-4'  ><span className='text-black font-semibold'>from  :</span>  date from which to show data</Typography>
            <Typography variant='subtitle1' className='pl-4'  ><span className='text-black font-semibold'>To  :</span> date till which to show data</Typography>

            <DialogContentText className='pl-4'>
                Click on the input to edit
            </DialogContentText>

            <DialogContent className='pl-5'>

                <div className='flex gap-5'>
                    <div>
                        <div>From</div>
                        <input type='date' title='dateh' data-date-inline-picker="true" className='border' value={dates.upper} onChange={(e) => { setDates((prev) => { return { ...prev, upper: e.target.value } }) }} />
                    </div>
                    <div>


                        <div>To</div>
                        <input type='date' title='dateh' data-date-inline-picker="true" className='border []' value={dates.lower} onChange={(e) => { setDates((prev) => { return { ...prev, lower: e.target.value } }) }} />

                        {/* <input type='date' title='dateh' className='border' /> */}
                    </div>
                </div>
            </DialogContent>

            <DialogActions >
                <div className='flex  items-center place-content-center '>
                    <SolidButton color='black' innerText='Confirm Change' onClick={() => { changeIncomeAndExpenceByDates({ lower: dates.lower, upper: dates.upper }); close(); }} />
                    <div className='p-2 text-gray-400 cursor-pointer hover:bg-gray-300/60 rounded-lg  ' onClick={() => { close() }}>Cancel</div>
                </div>
            </DialogActions>

            {/* </DialogContentText> */}

        </Dialog>
    )
}

export default DateChangeDialog