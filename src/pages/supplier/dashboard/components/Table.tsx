import React, { useId } from 'react'
import { deleteConnection } from '../../../../store/actions/connections/Delete'
import { useAppSelector } from '../../../../store/app/hooks'
import { DeleteIcon } from '../../../../components/ui/icons/DeleteIcon'
import ViewIcon from '../../../../components/ui/icons/ViewIcon'
import ArrowIconForward from '../../../../components/ui/icons/ArrowIconForward'
import { useNavigate } from 'react-router-dom'
import { userDetailSchema } from '../../../../models/userModel'
// type Props = {category:string,setCategory:()=>void}

const Table = () => {
  const { connections } = useAppSelector(state => state.connections)
  const deleteIconKey: any = useId()
  const viewIconKey: any = useId()
  const arrowIconKey: any = useId();
  const navigate = useNavigate();
  return (
    <div className='border-t mt-2  w-full h-full overflow-auto' >
      <div className="flex flex-col" >
        <div className="">
          <div className="inline-block min-w-full ">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium border-neutral-500 uppercase sticky top-0">
                  <tr className="border-b border-neutral-500">
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >#</th>
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Name</th>
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >GSTIN</th>
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Phone</th>
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Email</th>
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Activity</th>
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >type</th>
                    <th scope="col" className='px-6 py-4  sticky text-grayFont  ' >Action</th>
                  </tr>
                </thead>


                <tbody>
                  {
                    connections.supplier.map((index, i: number) => {
                      return <tr className="border-b border-neutral-300 font-light">
                        <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{++i}</th>
                        <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index?.name}</th>
                        <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index?.gstin}</th>
                        <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index?.phone}</th>
                        <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index?.email}</th>
                        <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' > {index?.activities}</th>
                        <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' > {convertType(index.type)}</th>
                        <th scope="col" className='whitespace-nowrap font-medium   sticky ' >
                          <div className='flex ' >
                            <DeleteIcon color='black' onclick={() => { deleteConnection(index, 1) }} key={`${deleteIconKey + 1}`} tooltip={`Delete Client`} />
                            <ViewIcon tooltip='View Client' color='blue' onclick={() => { navigate(`/view/${index._id}/profile`) }} key={`${viewIconKey + 1}`} />
                            <ArrowIconForward onclick={() => { }} tooltip='View Transactions' key={`${arrowIconKey + 1}`} />
                          </div>
                        </th>
                      </tr>


                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div ></div ></div >
  )
  function convertType(type: boolean) {
    if (type) {
      return 'online'
    } else {
      return 'Offline'
    }
  }
}



export default Table