import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppSelector } from '../../../../store/app/hooks'
import { ProductObj } from '../../../../models/inventory/productModel'
import { IcreateInvoice } from '../../../../models/invoice/invoice.model'
import { getProducts } from '../../../../store/actions/products'
import { toast } from 'react-toastify'

type Props = {scale:boolean,setScale:any,setInvoice:any}

interface IProductTab {
    name:string
    value:any
}

  

const AddProductDialog = ({scale,setScale,setInvoice}: Props) => {
    const blue = 'text-blue-800'
    const { products,isProducts } = useAppSelector(state => state.product)

    class PRODUCT{
         
        name=''
        description=''
        code=''
        qty=0
        rate=0
        unit=''
        discount=0
        total=0
        amount=0
        taxable_Value=0
        tax=[]
        constructor(name:string,description:string,code:string,rate:number,unit:string,tax:any){
            this.name = name;
            this.description = description 
            this.code =  code
            this.rate = rate
            this.unit = unit
            this.tax = tax
        }
    }

    useEffect(() => {
       getProducts()
          
    }, [products])

    const ProductTab = ({name,value}:IProductTab) => {
         if(name==='Rate'){
            return <>
             <div className='flex grid-cols-2 gap-2' >
                <div>{name}{':'}</div>
                <div className='text-blue-800'>{(value.length>10)?value.slice(0,20 )+".....":value}</div>

            </div>
            </>
         }
        return <>
            <div className='flex grid-cols-2 gap-2' >
                <div>{name}{':'}</div>
                <div className='text-gray-500'>{(value.length>10)?value.slice(0,20 )+".....":value}</div>

            </div>
        </>
    }

    return (
        <Dialog open={scale} fullWidth >
            <div className='p-3'>
                <DialogContentText>
                    <div className='flex place-content-between'>
                        <div className='h-fit' >Click on the product to add</div>
                        <div className='text-xl cursor-pointer' onClick={()=>setScale(false)}>X</div>

                    </div>
                </DialogContentText>
                <DialogContent> 
                    <div className='min-h-[60%] overflow-auto flex flex-col gap-5  '>
                    <div className="flex flex-col" >
            <div className="">
              <div className="inline-block min-w-full ">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left  ">
                    <thead className="border-b  text-sm border-neutral-500 uppercase sticky top-0">
                      <tr className="border-b border-neutral-500">
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >#</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Name</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Rate</th>
                        <th scope="col" className='px-1 py-2  sticky text-grayFont  ' >Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                        products.map((index: ProductObj,i:number) => {
                            return<tr className="border-b border-gray-400 text-sm font-source2 cursor-pointer hover:bg-black/20 hover:text-white" key={`index.name${i}`}   onClick={(e:any)=>{setInvoice((prev:IcreateInvoice)=>{return{...prev,products:[...prev.products,new PRODUCT(index.name,index.description,index.code,index.rate,index.unit,index.tax)]}});setScale(false)}} >
                                <th scope="col" className='px-1 py-2  sticky text-black ' >{++i}</th>
                                <th scope="col" className='px-1 py-2  sticky text-black ' >{index.name}</th>
                                <th scope="col" className='px-1 py-2  sticky text-gray-500 ' >{index.rate}</th>
                                <th scope="col" className='px-1 py-2  sticky text-gray-500 ' >{index.stock}</th>
                            </tr>

                             
                            
                        })
                    }
                    </tbody>
                    </table>
                    </div>
                    </div>
                    </div>
                    </div>

                 
                    </div>

                </DialogContent>
            </div>
        </Dialog>
    )
}

export default AddProductDialog