import { Input } from '@mui/joy'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { deleteExpence, editExpence } from '../../../store/actions/data/IncomeAndExpence/ExpenceActions'
import { removeZero } from '../../../utils/removeZeros'
import { validateNumberInput } from '../../../utils/validateNumberInput'
import ExpenceTable from './components/ExpenceTable'
import TopTab from './components/TopTab'
import EditDialod from './components/dialog/EditDialod'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import IncomeAndExpenceSelect from '../../../components/Select/IncomeAndExpenceSelect'
import ExpenceChart from '../../../components/charts/expences/ExpenceChart'
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
  const { sort, limit } = useParams()
  const navigate = useNavigate()



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
  const handleOpenEditDialog = () => {
    if (!openEdit) {
      setOpenEdit(true);
    } else {
      setOpenEdit(false)
    }
  }


  return (
    <>
      <ConfirmDialog />
      <EditDialod Expence={Expence} handleAmountInput={(e: any) => { handleAmountInput(e) }} openEdit={openEdit} setExpence={(value: any) => setExpence((prev: any) => { return { ...prev, category: value } })} setOpenEdit={() => handleOpenEditDialog()} />
      <div className=' h-[150%]  '  >

        <div className='h-[6%]  rounded-xl'>
          <div className=' grid grid-cols-3  gap-5 items-center w-full  p-2 ' >
            <PageHeading name='Expences' />
            <IncomeAndExpenceSelect />


            <div className='w-full grid place-items-end ' >
              {/* <Button variant='outlined' color='error' className='w-1/2 px-5 py-5 uppercase'  >ADD Expence</Button> */}
              <SolidButton color='black' innerText='Add Expence' onClick={() => navigate(`/create/500/expence`)} />
            </div>

          </div>
        </div>

        <div className=' h-[20%]  rounded-xl m-2 '>
          <TopTab />
        </div>
        <div className='border rounded-xl  h-[66%]  m-2 overflow-auto  bg-component'>
          <ExpenceTable setUid={(value: string) => { setUid(value); setOpen(true) }} openEdit={(value: any) => { setObj(value) }} />
        </div>

      </div>
      <div className='h-[100%]  ' >
        <PageHeading name='Expence Chart'/>
        <div className='bg-component p-2 h-[100%] m-2  rounded-xl'>
          <ExpenceChart/>
        </div>
      </div>

    </>
  )


  function ConfirmDialog() {
    return <Dialog open={open} className='bg-inherit'>
      <DialogTitle className='p-5'>Delete Expence</DialogTitle>
      <DialogContent>Do You really want to Delete this Expence</DialogContent>
      <DialogActions>
        <div className='flex gap-5 items-center' >
          <SolidButton color='primary' innerText='NO' onClick={() => { setOpen(false) }} />
          {/* <Button color='info' variant='contained' onClick={() => { setOpen(false) }}>No</Button> */}

          {/* <Button color='error' variant='contained' id='asdkas' onClick={(e) => { deleteExpence(uid); setOpen(false) }}>Delete</Button> */}
        </div>
        <SolidButton color='error' innerText='DELETE' onClick={() => { deleteExpence(uid); setOpen(false) }} />
      </DialogActions>
    </Dialog>
  }
}

export default ViewExpences