import React from 'react'
import { DeleteIcon } from '../../../../../components/ui/icons/DeleteIcon'
import ViewIcon from '../../../../../components/ui/icons/ViewIcon'
import ArrowIconForward from '../../../../../components/ui/icons/ArrowIconForward'
import { useNavigate } from 'react-router-dom'
import LoadingAnimation from './loader/LoadingAnimation'

type Props = {array:any[],isLoading:boolean}

const SearchTable = ({array,isLoading}: Props) => {
 
  const navigate = useNavigate();

  return (
     <Table/>
  )





  function Table() {
    return <div className='border-t mt-2  w-full h-full overflow-auto p-4  '  >
      <div className="flex flex-col" >
        <div className="">
          <div className="inline-block min-w-full ">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium border-neutral-500 uppercase sticky top-0">
                  <tr className="border-b border-neutral-500">
                    <th scope="col" className=' py-2  sticky text-grayFont  ' >#</th>
                    <th scope="col" className=' py-2  sticky text-grayFont  ' >Name</th>
                    <th scope="col" className=' py-2  sticky text-grayFont  ' >GSTIN</th>
                    <th scope="col" className=' py-2  sticky text-grayFont  ' >Phone</th>
                    <th scope="col" className=' py-2  sticky text-grayFont  ' >Email</th>
                    <th scope="col" className=' py-2  sticky text-grayFont  ' >Activity</th>
                    <th scope="col" className=' py-2  sticky text-grayFont  ' >Adress</th>
                    <th scope="col" className=' py-2  sticky text-grayFont  ' >view</th>
                  </tr>
                </thead>
            
                <tbody>
                  {
                   array.map((index, i: number) => {
                     console.log(index.type)
                      return <tr  className = "border-b border-neutral-300 font-light    cursor-pointer  duration-150 hover:bg-gray-100"
                       onClick={()=>{navigate(`/view/${index._id}/profile`)}}  id={`${i}`}>
                      <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{++i}</th>
                      <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index ?.name}</th>
                      <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index ?.gstin}</th>
                      <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index ?.phone}</th>
                      <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' >{index ?.email}</th>
                      <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' > {index?.activities}</th>
                      <th scope="col" className='whitespace-nowrap font-medium px-6 py-4  sticky ' > {index?.district + "/" + index?.state}</th>
                      <th scope="col" className = 'whitespace-nowrap font-medium   sticky ' >
                    <div className='flex ' >
                       <ArrowIconForward tooltip='view profile'  onclick={()=>{navigate(`/view/${index._id}/profile`)}} key={index.phone} />
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
  }
}

export default SearchTable