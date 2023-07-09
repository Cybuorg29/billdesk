import { Input } from '@mui/joy'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import { deleteExpence, editExpence } from '../../../store/actions/data/IncomeAndExpence/ExpenceActions'
import { removeZero } from '../../../utils/removeZeros'
import { validateNumberInput } from '../../../utils/validateNumberInput'
import ExpenceTable from './components/ExpenceTable'
import TopTab from './components/TopTab'
// import './components/css/Expences.css'

type Props = {}
interface ExpenceObj {
  _id: string
  title: string
  category: string
  amount: number
  provisionAmt: any[];
  id: string
  date: string
  __v: number
}

const ViewExpences = (props: Props) => {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [uid, setUid] = useState('')
  const [updateObj, setUpdateObj]: any = useState<ExpenceObj>()


  const [Expence, setExpence] = useState({
    title: ``,
    category: '',
    amount: 0,
    date: '',
    Emp_id: '',
    token: ''
  })
  const setObj = (value: any) => {
    setExpence(value);
    setOpenEdit(true);
  }


  const handleAmountInput = (e: any) => {
    let amt = validateNumberInput(e.target.value)
    // let amt = parseFloat(e.target.value);
    amt = removeZero(amt);
    setExpence({ ...Expence, amount: amt })

  }


  return (
    <div className=' h-full grid gap-5 grid-rows-6   '  >
      <ConfirmDialog />
      <Dialog open={openEdit} >
        <DialogTitle>Edit Expence</DialogTitle>
        <DialogContent>
          <div className='grid gap-5' >
            <div className='p-5 border rounded-xl ' >
              <div className='grid gap-3 w-1/2'>
                <label>Expence Type</label>
                <Select value={Expence?.category} onChange={(e) => { setExpence((prev) => { return { ...prev, category: e.target.value } }) }} >
                  <MenuItem value='400'>Salaries Paid </MenuItem>
                  <MenuItem value='300'>Purchase </MenuItem>
                  <MenuItem value='200'>Purchase of Goods</MenuItem>
                  <MenuItem value='100'>Provision Paid</MenuItem>
                  <MenuItem value='600'>Tax Filled (other)</MenuItem>
                  <MenuItem value='700'>GST Filled</MenuItem>
                  <MenuItem value='500'>others</MenuItem>

                </Select>
              </div>
              <div className='flex flex-wrap my-5 gap-4  mt-4' >
                <div className='grid gap-3 w-1/2 ' >
                  <label>Title (Note)</label>
                  <Input value={Expence?.title} onChange={(e) => { setExpence({ ...Expence, title: e.target.value }) }} />
                </div>
                <div className='grid gap-3 ' >
                  <label>Amount</label>
                  <Input type='number' value={Expence?.amount} onChange={(e) => { handleAmountInput(e) }} />
                </div>

              </div>
              <div className='flex gap-2'>
                <Button color='warning' variant='contained' onClick={() => { editExpence(Expence); setOpenEdit(false) }} >save </Button>
                <Button color='info' variant='contained' onClick={() => { setOpenEdit(false) }} >Discard Changes</Button>
              </div>
            </div>
          </div>

        </DialogContent>

      </Dialog>

      <div className=' row-span-2 '>
        <TopTab />
      </div>
      <div className='border rounded-xl  row-span-4  overflow-auto '>
        <ExpenceTable setUid={(value: string) => { setUid(value); setOpen(true) }} openEdit={(value: any) => { setObj(value) }} />
      </div>

    </div>

  )

  function ConfirmDialog() {
    return <Dialog open={open} className='bg-inherit'>
      <DialogTitle className='p-5'>Delete Expence</DialogTitle>
      <DialogContent>Do You really want to Delete this Expence</DialogContent>
      <DialogActions>
        <Button color='info' variant='contained' onClick={() => { setOpen(false) }}>No</Button>
        <Button color='error' variant='contained' id='asdkas' onClick={(e) => { deleteExpence(uid); setOpen(false) }}>Delete</Button>
      </DialogActions>
    </Dialog>
  }
}

export default ViewExpences