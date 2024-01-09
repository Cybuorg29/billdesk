import { Dialog, DialogActions, DialogContent, DialogContentText, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Inputs from '../create/components/Inputs'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { addStock } from '../../../store/actions/products/update/addStock'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../../store/app/hooks'
import { getConnection } from '../../../store/actions/connections/set'
import { toast } from 'react-toastify'

interface Props {
  open: any
  id: string
  close: () => void
  // changeSupplier: any
}

const AddStockDialog = ({ open, close, id }: Props) => {

  const { connections, isConnection } = useAppSelector(state => state.connections);
  const { _id } = useAppSelector(state => state.userData)
  const navigate = useNavigate();

  const [update, setUpdate] = useState({
    value: 0,
    price: 0,
    total: 0,
    E_id: ''
  })
  useEffect(() => {
    if (!isConnection) {
      getConnection()
    }
  }, [connections, isConnection, _id])
  return (
    <>
      <Dialog open={open} >
        <DialogContent>
          Enter the Details to Add  Quantity
          <span className='text-sm pl-3 ' >( This will create an expence if you want to add stock without adding expence <span className='text-blue-600 cursor-pointer' onClick={() => { navigate('') }} >click here</span>  ) </span>
        </DialogContent>
        <DialogContentText className='pl-3'>
          Note : The new Price will be for all the stock available before this entry
        </DialogContentText>
        <DialogContent>
          <div className='grid gap-5'>
            <div className='grid gap-3'>
              <label>Select Buyer</label>
              <Select className='' name='Supplier' value={update.E_id} onChange={(e: any) => { handleInputChange(e) }} >
                {
                  connections.supplier.map((index: any) => {
                    return (
                      <MenuItem value={`${index?._id}`} >{index?.name}</MenuItem>
                    )
                  })

                }
                <MenuItem onClick={() => { navigate(`/create/connection`) }} className='bg-slate-100'   ><div className='text-blue-600 text-center w-full border' >Add Supplier</div></MenuItem>
              </Select>
            </div>
            <div className='flex gap-5' >
              <Inputs name='Quantity Bought' onchange={(e: React.ChangeEvent<HTMLInputElement>) => { handleInputChange(e) }} type={'number'} value={update?.value} key={'asd'} />
              <Inputs name='price per unit' onchange={(e: React.ChangeEvent<HTMLInputElement>) => { handleInputChange(e) }} type={'number'} value={update?.price} key={'asd'} />
              <Inputs name='Total ' onchange={(e: React.ChangeEvent<HTMLInputElement>) => { handleInputChange(e) }} type={'number'} value={update?.total} key={'asd'} />
            </div>
          </div>


        </DialogContent>
        <DialogActions>
          <div className='flex gap-3' >
            <Link to={'/dashboard/inventory'} >
              <SolidButton color='black' innerText='Add Quantity' onClick={() => { validateAndPush() }} key={'ad'} />
            </Link>
            <SolidButton color='error' innerText='Cancel' onClick={() => { close(); setUpdate({ value: 0, price: 0, total: 0, E_id: '' }); }} key={'adqd'} />
          </div>
        </DialogActions>

      </Dialog>
    </>
  )
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value: any = e.target.value;
    if (name === 'Quantity Bought') setUpdate((prev: any) => { return { ...prev, value: value, total: prev.price * value } })
    else if (name === 'price per unit') setUpdate((prev: any) => { return { ...prev, price: value, total: prev.value * value } })
    else if (name === 'Total') setUpdate((prev: any) => { return { ...prev, total: value, price: value * prev.value } })
    else if (name === 'Supplier') setUpdate((prev: any) => { return { ...prev, E_id: e.target.value } })
  }




  function validateAndPush() {
    if (update.price === 0) toast('Price cannot be zero')
    else if (update.value === 0) toast('Please Add Quantity ')
    else if (update.E_id === '') toast('Please select an Supplier ')
    else {
      addStock({ _id: id, price: update.price, quantity: update.value, total: update.total, E_id: update.E_id }); console.log('asdasd', id);
      close()
      setUpdate({ value: 0, price: 0, total: 0, E_id: '' })

    }
  }

}





export default AddStockDialog