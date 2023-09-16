import React, { useEffect, useState } from 'react'
import Tabs from '../../../../components/ui/tabs/Tabs'
import { ProductObj } from '../../../../models/inventory/productModel'
import { useAppSelector } from '../../../../store/app/hooks'

type Props = {onclick:(type:any)=>void}

const TopTabs = ({onclick}: Props) => {
   const {products,isProducts} = useAppSelector(state=>state.product);

    const [tabArray,setTabArray] =useState([
        {
          image:'',
          link:'',
          name:'Total Products',
          amount:0
        },
        {
          image:'',
          link:'',
          name:'Finished Goods',
          amount:0
        },
        {
          image:'',
          link:'',
          name:'Raw Material',
          amount:0
        },
        {
          image:'',
          amount:0,
          link:'',
          name:'Low Stock'
        }
      ])
       const emptyArray=[
        {
          image:'',
          link:'',
          name:'Total Products',
          amount:0
        },
        {
          image:'',
          link:'',
          name:'Finished Goods',
          amount:0
        },
        {
          image:'',
          link:'',
          name:'Raw Material',
          amount:0
        },
        {
          image:'',
          amount:0,
          link:'',
          name:'Low Stock'
        }
      ]

   

      

    // function to calculate total , finished goods and raw material ;
     const initData=()=>{
      setTabArray(emptyArray);
          const array = [...tabArray];
          products.map((index:ProductObj)=>{
              array[0].amount = array[0].amount +1
              if(index.category==='Finished Goods')array[1].amount = array[1].amount + 1;
              if(index.category==='Raw Material')array[2].amount = array[2].amount + 1;
              if(index.stock<=index.limit) array[3].amount = array[3].amount +1
          })
           setTabArray(array) ;
     }

   
    useEffect(() => { 
        
        initData()
    }, [isProducts])

      
 
      
    return <>
    <div className='lg:grid lg:grid-cols-4 flex  h-[18%] gap-5 mb-3' >
    {
      tabArray.map((index:any,i:number)=>{
       return <div className=' h-full'   onClick={(e:any)=>{onclick(index?.name)}} >
       <Tabs amount={index.amount} image={index?.image} link={index?.link} name={index.name} key={index.name} />
       </div>
      }
    )}
    </div>
    </>
}

export default TopTabs