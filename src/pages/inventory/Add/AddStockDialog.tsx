import { Dialog, DialogActions, DialogContent, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Inputs from '../create/components/Inputs'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { addStock } from '../../../store/actions/products/update/addStock'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../../store/app/hooks'
import { getConnection } from '../../../store/actions/connections/set'

interface Props {
  open: any
  id: string
  close: () => void
  // changeSupplier: any
}

const AddStockDialog = ({ open, close, id }: Props) => {

  const { connections, isConnection } = useAppSelector(state => state.connections);
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
  }, [connections, isConnection])
  return (
    <>
      <Dialog open={open} >
        <DialogContent>
          Enter the Details to Add  Quantity
          <span className='text-sm pl-3 ' >( This will create an expence ) </span>
        </DialogContent>
        <DialogContent>
          <div className='grid gap-5'>
            <div className='grid gap-3'>
              <label>Select Buyer</label>
              <Select className='' value={update.E_id} onChange={(e: any) => { setUpdate((prev) => { return { ...prev, E_id: e.target.id } }) }} >
                {
                  connections.supplier.map((index: any) => {
                    return (
                      <MenuItem value={`${index?._id}`} >{index?.name}</MenuItem>
                    )
                  })

                }
                {
                  connections.client.map((index: any) => {
                    return (
                      <MenuItem value={`${index?._id}`} >{index?.name}</MenuItem>
                    )
                  })

                }
                <MenuItem onClick={() => { navigate(`/create/connection`) }} className='bg-slate-100'   ><div className='text-blue-600 text-center w-full border' >Add Product</div></MenuItem>
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
              <SolidButton color='black' innerText='Add Quantity' onClick={() => { addStock({ _id: id, price: update.price, quantity: update.value, total: update.total, E_id: update.E_id }); console.log('asdasd', id); close() }} key={'ad'} />
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


  }
}

export default AddStockDialog