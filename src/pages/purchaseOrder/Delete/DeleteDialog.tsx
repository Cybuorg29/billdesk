import { Dialog, DialogActions, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import { IPURCHASE_ORDER } from '../model/model'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { DeletePurchaseOrder } from '../../../store/actions/purchaseOrder/action'

type Props = {
  isOpen: boolean
  Data: IPURCHASE_ORDER | undefined
  close: any
  index: number
}

const PurchaseOrderDeleteDialog = ({ Data, isOpen, close, index }: Props) => {
  return (
    <>
      <Dialog open={isOpen} fullWidth className='p-5'>
        <DialogTitle>Do You Really Want To Delete This Purchase Order</DialogTitle>
        <div className='p-5'>
          <DialogContentText>Order Created On: {Data?.date} </DialogContentText>
          <DialogContentText>Order Billed To : {Data?.to.name} </DialogContentText>
        </div>

        <DialogActions>
          <div className='flex gap-4 place-content-center items-center'>

            <SolidButton color='error' innerText='Delete' onClick={() => { DeletePurchaseOrder(Data?._id, index); close() }} key={'Dlete'} />
            <div className='text-gray-500 cursor-pointer' onClick={() => { close() }}>Cancel</div>
          </div>
        </DialogActions>

      </Dialog>
    </>
  )
}

export default PurchaseOrderDeleteDialog