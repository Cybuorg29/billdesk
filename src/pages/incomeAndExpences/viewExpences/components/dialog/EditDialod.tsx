import React ,{ useState } from 'react'
import { Input } from '@mui/joy'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select } from '@mui/material'
import { SolidButton } from '../../../../../components/ui/Buttons/solid/SolidButton'
import { editExpence } from '../../../../../store/actions/data/IncomeAndExpence/ExpenceActions'
type Props = {openEdit:boolean,Expence:any,setExpence:any,setOpenEdit:any,handleAmountInput:any}

const EditDialod = ({Expence,openEdit,setExpence,setOpenEdit,handleAmountInput}: Props) => {
  return (
    <>
    <Dialog open={openEdit}>
      <DialogTitle>Edit Expence</DialogTitle>
      <DialogContent>
        <div className='grid gap-5'>
          <div className='p-5 border rounded-xl '>
            <div className='grid gap-3 w-1/2'>
              <label>Expence Type</label>
              <Select value={Expence?.category} onChange={(e) => { setExpence(e)}}>
                <MenuItem value='400'>Salaries Paid </MenuItem>
                <MenuItem value='300'>Purchase </MenuItem>
                <MenuItem value='200'>Purchase of Goods</MenuItem>
                <MenuItem value='100'>Provision Paid</MenuItem>
                <MenuItem value='600'>Tax Filled (other)</MenuItem>
                <MenuItem value='700'>GST Filled</MenuItem>
                <MenuItem value='500'>others</MenuItem>

              </Select>
            </div>
            <div className='flex flex-wrap my-5 gap-4  mt-4'>
              <div className='grid gap-3 w-1/2 '>
                <label>Title (Note)</label>
                <Input value={Expence?.title} onChange={(e) => { setExpence({ ...Expence, title: e.target.value }) }} />
              </div>
              <div className='grid gap-3 '>
                <label>Amount</label>
                <Input type='number' value={Expence?.amount} onChange={(e) => { handleAmountInput(e) }} />
              </div>

            </div>
            <div className='flex gap-2'>
              <SolidButton color='primary' innerText='Save' onClick={() => { editExpence(Expence); setOpenEdit(false) }} />
              <SolidButton color='black' innerText='Discard Changes' onClick={() => { setOpenEdit(false) }} />
            </div>
          </div>
        </div>

      </DialogContent>

    </Dialog>
    </>

  )
}

export default EditDialod