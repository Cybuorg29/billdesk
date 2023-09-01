import React, { useEffect, useState } from 'react'
import PageHeading from '../../../components/ui/Page Heading/PageHeading'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../../../store/actions/products'
import { useAppSelector } from '../../../store/app/hooks'
import { ProductObj } from '../../../models/inventory/productModel'
import { DeleteIcon } from '../../../components/ui/icons/DeleteIcon'
import { EditIcons } from '../../../components/ui/icons/EditIcon'
import ViewIcon from '../../../components/ui/icons/ViewIcon'
import { toast } from 'react-toastify'
import { deleteProduct } from '../../../store/actions/products/delete/deleteProduct'
import AddIcon from '../../../components/ui/icons/AddIcon'
import MinusIcon from '../../../components/ui/icons/MinusIcon'
import AddStockDialog from '../Add/AddStockDialog'
import Tabs from '../../../components/ui/tabs/Tabs'
import TopTabs from './components/TopTabs'
import ConfirmDeleteProductDialog from './components/ConfirmDeleteProductDialog'

type Props = {}

const InventoryDashboard = (props: Props) => {
  const navigate = useNavigate()
  const [view, setView]: any = useState<'all' | number>(10)
  const { istoken } = useAppSelector(state => state.auth)
  const { products } = useAppSelector(state => state.product)
  const [AddDialog, setAddDialog] = useState<boolean>(false)
  const [_id, setId] = useState<string>('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [type, setType]: any = useState('Total Products')




  
  useEffect(() => {
    getProducts()
  }, [istoken])








  return (
    <div className='h-full w-full overflow-auto p-5' >
      <AddStockDialog open={AddDialog} id={_id} close={() => setAddDialog(false)} />
      <ConfirmDeleteProductDialog close={() => setConfirmDelete(false)} id={_id} open={confirmDelete} key={'confirmDeleteProductDialog'} />
      <TopSection />
      <TopTabs product={products} onclick={(type: any) => { setType(type) }} />
      <div className='h-[69%] bg-component rounded-xl p-3' >
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
        <div className='w-full h-full' >

          {
            (products.length !== 0) ? <ProductTable /> : <div className='h-full w-full grid justify-items-center items-center'>
              <div className='text-gray-500 font-poopins' >No Products Added .Add some Products to view</div>

            </div>
          }
        </div>



      </div>
    </div>


  )



  function TopSection() {
    return <>

      <div className='h-[10%] flex place-content-between' >
        <PageHeading name='Inventory ' key={'inventory '} />
        <div>
          <SolidButton color='black' innerText='Add Product' onClick={() => { navigate('/create/product') }} key={'Add Product'} />
        </div>
      </div>
    </>
  }

  function ProductTable() {
    return <div className='border-t mt-2  w-full h-full overflow-auto' >
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
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Rate</th>
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Stock</th>
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Min Limit</th>
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map((index: ProductObj, i: number) => {


                      if (i < view || view === 'all') {

                        if (type === index.category || type === 'Total Products' || type==='Low Stock' &&index.stock<=index.limit) return <>

                          <tr className="border-b border-neutral-300 font-light">
                            <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{++i}</th>
                            <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index.name}</th>
                            <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index.description}</th>
                            <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index.rate}</th>
                            <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index.stock}</th>
                            <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' > {index.limit}</th>
                            <th scope="col" className='whitespace-nowrap font-medium   sticky ' >
                              <div className='flex ' >
                                <DeleteIcon color='black' onclick={() => { setConfirmDelete(true); setId(index._id) }} key={'adas'} />
                                <EditIcons color='blue' onclick={() => { }} key={'asda'} />
                                <ViewIcon color='black' onclick={() => { navigate(`/view/${index._id}/product`) }} key={index._id} />
                                <AddIcon color='blue' onclick={() => { setAddDialog(true); setId(index._id) }} key={index._id} />
                                <MinusIcon color='black' onclick={() => { navigate(`/view/${index._id}/product`) }} key={index._id} />

                              </div>
                            </th>
                          </tr>
                        </>
                      }else{
                      }
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