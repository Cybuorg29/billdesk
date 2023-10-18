import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductObj } from '../../../models/inventory/productModel';
import { useAppSelector } from '../../../store/app/hooks';
import { getProducts } from '../../../store/actions/products';

type Props = {}
type topSectionProps={
  name:any
  detail:any
}

const ViewProduct = (props: Props) => {
     const {id} = useParams();
      const [product,setProduct]:any = useState<ProductObj>({
        __v:0,
        _id:'',
        category:'',
        code:'',
        createdAt:'',
        description:'',
        image:'',
        limit:0,
        name:'',
        rate:0,
        stock:0,
        tax:[],
        updatedAt:'',
        specifications:[],
        unit:'',
        weight:0

      })
       const {products,isProducts} = useAppSelector(state=>state.product)

          let keys = Object.entries(product)
      useEffect(() => {
        if(isProducts){
             setProducts()
              
        }else{
          getProducts()
        }
      }, [])
      useEffect(() => {
        
      }, [product])
      

      const  Details=({name,detail}:topSectionProps)=>{
        return   <div  className='p-3  ' >
        <div  className='font-poopins text-grayFont text-xl' >{name}</div>
        <div  className='text-lg' >{detail}</div>
      </div>
      }

    



      
  return (
    <div className='w-full h-full p-5'>
      {/* top section contains  image , name and description of product  */}
      <section  className='h-[40%] flex gap-2 ' >
        {/* image div */}
        <div className='w-1/4 h-full bg-gray-200 rounded-md'>
          <img alt='profile'  className='w-full h-full rounded-md' src={product?.image} />
        </div>
        {/* name and dexcription div  */}
        <div className='flex flex-col justify-center h-full w-2/4'>
          <div className='h-fit' >
          <Details name={'Name'}  detail={product?.name}  />    
          <Details name={'Description'}  detail={product?.description}  />    
          </div>

        </div>
      </section>
      {/* bottom section contain rest of the product info  */}
      <section className='grid p-5 grid-cols-3 gap-5' >
        {
          keys.map(([name,detail]:any)=>{
              if(name===''  ||name==='category'||name==='limit'||name==='stock'||name==='rate'||name==='code'){
                return  <div  className='border  shadow-sm rounded-xl  bg-component ' >
                <Details name={name}  detail={detail}  />     
              </div>
              }else if(name==='tax'){
                return   detail.map((index:any)=>{
                  return <div  className='border shadow-sm rounded-lg bg-component' >
                    <Details name={index?.type} detail={index?.amount+'%'} />

                  </div>
                })
              }
          }
          )
        }
        
      </section>
      
    </div>
  )
 

  function setProducts(){

    products.map((index:ProductObj)=>
      (index._id===id)?setProduct(index):null
    )
  }
}




export default ViewProduct