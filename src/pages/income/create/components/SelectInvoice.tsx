import  { useEffect, useId} from 'react'
import { useAppSelector } from '../../../../store/app/hooks'
import { setInvoiceAction } from '../../../../store/actions/invoice/set'
import { MenuItem, Select} from '@mui/material'
import { Iinvoice } from '../../../../models/invoice/invoice.model'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'

type Props = {value:string,set:any}

const SelectInvoice = ({value,set}: Props) => {
   const {invoices,isLoaded} = useAppSelector(state=>state.invoice)
   const {istoken,token} = useAppSelector(state=>state.auth)
   
   const outerDivKey = useId()

       
   useEffect(() => {
       if(!isLoaded){
         setInvoiceAction()
       }
   }, [istoken,token])
   useEffect(() => {
    
   }, [invoices,isLoaded,value])
   
  return (
    <div className='w-full h-full' key={outerDivKey} >
      <div>Select Invoice</div>
       <Select value={value} className='w-full' >
          {
            invoices.map((index:Iinvoice)=>{
                if(!index.isPaid)return<MenuItem value={index._id} key={index._id}
                onClick={(e:any)=>{set((prev:Iinvoice)=>{return{...prev,amount:index.grand_Total,invoiceId:index._id,title:`Payment Received for invoice no : ${index.invoice_No}`}})}}>
                <div className='grid grid-cols-3 w-full'>
                   <div>{index.invoice_No}</div>
                   <div>{index.billed_To.name}</div>
                   <div>{converToInrFormat(index.grand_Total)}</div>
                </div>
                </MenuItem>
              
            })
          }
        </Select>        
    </div>
  )
}

export default SelectInvoice