import React, { useEffect, useState } from 'react'
import PageHeading from '../../components/ui/Page Heading/PageHeading'
import { SolidButton } from '../../components/ui/Buttons/solid/SolidButton'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../../store/actions/products'
import {  useAppSelector } from '../../store/app/hooks'
import { ProductObj } from '../../models/inventory/productModel'

type Props = {}

const InventoryDashboard = (props: Props) => {
  const navigate = useNavigate()
  const [view, setView] = useState<string | number>(10)
  const { istoken } = useAppSelector(state => state.auth)
   const {products} =  useAppSelector(state=>state.product)
  useEffect(() => {
    getProducts()
  }, [istoken])


  return (
    <div className='h-full overflow-auto p-5' >
      <TopSection />
      <div className='h-[82%] bg-component rounded-xl p-3' >
        <div className='flex  place-content-between ' >
          <div className='text-xl'>Products</div>
          <div className='flex gap-2'>
            <label>View</label>
            <select title='view' name='View' value={view} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setView(e.target.value) }} className='' >
              <option value={10} >10</option>
              <option value={25} >25</option>
              <option value={'all'} >All</option>
            </select>
          </div>
        </div>
        <ProductTable/>
      


      </div>
    </div>

      
  )

function TopSection() {
  return <>
    <div className='h-[15%] flex place-content-between' >
      <PageHeading name='Inventory ' key={'inventory '} />
      <div>
        <SolidButton color='black' innerText='Add Product' onClick={() => { }} key={'Add Product'} />
      </div>
    </div>
  </>
}

function ProductTable(){
  return <div className='border-t mt-2' >
  <div className="flex flex-col" >
    <div className="">
      <div className="inline-block min-w-full ">
        <div className="overflow-hidden">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium border-neutral-500 uppercase sticky top-0">
              <tr className="border-b border-neutral-500">
                <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >#</th>
                <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Name</th>
                <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Description</th>
                <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Stock</th>
                <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Rate</th>
                <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Min Limit</th>
                <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Action</th>
              </tr>
            </thead>
            <tbody>
              {
                products.map((index:ProductObj,i:number)=>{
                  return<>
                        <tr className="border-b border-neutral-300 font-light">
                <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{++i}</th>
                <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index.name}</th>
                <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index.description}</th>
                <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index.stock}</th>
                <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index.rate}</th>
                <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' > {index.limit}</th>
                <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{}</th>
              </tr>
                  </>
                })                        
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
}
}
export default InventoryDashboard