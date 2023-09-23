import { Dialog, DialogActions, DialogTitle } from '@mui/material'
import React from 'react'
import { SolidButton } from '../../../../components/ui/Buttons/solid/SolidButton'
import { deleteProduct } from '../../../../store/actions/products/delete/deleteProduct'

type Props = {open:boolean,close:()=>void,id:string}

const ConfirmDeleteProductDialog = ({close,open,id}: Props) => {
  return (
    <Dialog open={open}  >
        <DialogTitle>Do you really want to Delete this product ?</DialogTitle>
        <DialogActions>
          <SolidButton color='error' innerText='Delete' onClick={()=>{deleteProduct(id);close()}} key={'deleteProduct'} />
          <SolidButton color='black' innerText='Cancel' onClick={()=>{close()}} key={'deleteProduct'} />
        </DialogActions>

    </Dialog>
  )
}

export default ConfirmDeleteProductDialog