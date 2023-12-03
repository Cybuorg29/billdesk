import { Dialog, DialogActions, DialogTitle, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'
import Inputs from './Inputs'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'

type Props = {dialog:boolean,pushTax:{type:any,amount:number},handleTaxOperations:any,setDialog:any,setPushTax:any}

const TaxDialog = ({dialog,handleTaxOperations,pushTax,setDialog,setPushTax}: Props) => {
  return (
   <>
    <Dialog open={dialog} >
        <DialogTitle>Add Tax</DialogTitle>
        <DialogActions>
          <div className='grid gap-5' >
            <div className='w-full  ' >
              <label>Tax Type</label>
              <Select value={pushTax?.type} className='w-full' onChange={(e: SelectChangeEvent<HTMLSelectElement>) => { setPushTax('type',e.target.value)}}  >
                <MenuItem value={'CGST'} >CGST</MenuItem>
                <MenuItem value={'IGST'} >IGST</MenuItem>
                <MenuItem value={'SGST'} >SGST</MenuItem>
                <MenuItem value={'Cess'} >Cess</MenuItem>

              </Select>
            </div>
            <Inputs value={pushTax?.amount} name='tax(%)' type={'Number'} onchange={(e: React.ChangeEvent<HTMLInputElement>) => { setPushTax('amount',e.target.value) }}  ></Inputs>
            <div className='flex gap-5' >
              <SolidButton color='black' innerText='ADD' onClick={() => { handleTaxOperations('push') }} key={'addTax'} />
              <SolidButton color='primary' innerText='Cancel' onClick={() => { setDialog(false) }} key={'TaxCancel'} />
            </div>
          </div>
          <div>

          </div>
        </DialogActions>
      </Dialog>
   </>
  )
}

export default TaxDialog