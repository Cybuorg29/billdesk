import { Dialog, DialogActions, DialogContent } from '@mui/material'
import React, { useState } from 'react'
import Inputs from '../create/components/Inputs'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { addStock } from '../../../store/actions/products/update/addStock'
import { useParams } from 'react-router-dom'

interface Props {
    open:any
    id:string
    close:()=>void
}

const AddProductDialog = ({open,close,id}: Props) => {

     const [update,setUpdate] = useState({
        value:0,
        price:0,
        total:0
     })
  return (
    <>
    <Dialog open={open} >
        <DialogContent>
            Enter the Details to Add  Quantity
        </DialogContent>
        <DialogContent>
             <div className='flex gap-5' >
            <Inputs name='Quantity Bought' onchange={(e:React.ChangeEvent<HTMLInputElement>)=>{handleInputChange(e)}} type={'number'} value={update?.value} key={'asd'} />
            <Inputs name='price per unit' onchange={(e:React.ChangeEvent<HTMLInputElement>)=>{handleInputChange(e)}} type={'number'} value={update?.price} key={'asd'} />
            <Inputs name='Total ' onchange={(e:React.ChangeEvent<HTMLInputElement>)=>{handleInputChange(e)}} type={'number'} value={update?.total} key={'asd'} />
             
             </div>
        </DialogContent>
        <DialogActions>
            <div className='flex gap-3' >
                <SolidButton color='black' innerText='Add Quantity' onClick={()=>{addStock({_id:id,price:update.price,quantity:update.value,total:update.total});console.log('asdasd',id);close()}} key={'ad'}/>
                <SolidButton color='error' innerText='Cancel' onClick={()=>{close();setUpdate({value:0,price:0,total:0});}} key={'adqd'}/>
            </div>
        </DialogActions>

    </Dialog>
    </>
  )

  function handleInputChange(e:React.ChangeEvent<HTMLInputElement>){
     const name = e.target.name;
      const value:any = e.target.value;
    if(name==='Quantity Bought') setUpdate((prev:any)=>{return{...prev,value:value,total:prev.price*value}})
    else if(name==='price per unit')  setUpdate((prev:any)=>{return{...prev,price:value,total:prev.value*value}})
    else if(name==='Total')  setUpdate((prev:any)=>{return{...prev,total:value,price:value*prev.value}})

    
  }
}

export default AddProductDialog