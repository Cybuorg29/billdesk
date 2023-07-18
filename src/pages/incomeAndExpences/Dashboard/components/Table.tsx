import React from 'react'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'
import { useNavigate } from 'react-router-dom'

type Props = {array:any[],name:string}

const Table = ({array,name}: Props) => {
     const navigate = useNavigate()
  return (
    <div className='h-full bg-component rounded-xl overflow-hidden ' >
      <div className='h-[10%] border-b flex place-content-between items-center p-2 text-grayFont' >{name}</div>
      <div  className='h-[83%] overflow-hidden bg-green-900' >
     
        {
          array.map((index:any,i:number)=>{
       

                 return    <div className='border border-l-0 border-r-0 p-2 flex' >
            <div className='w-[70%]' >
              <div  className='font-semibold' >{index?.category}</div>
              <div className='text-gray-500 text-xs' > {index?.title}</div>
            </div>
            <div>
              <div className='text-green-600'>{converToInrFormat(index?.amount)}</div>
            </div>
          </div>

          })
        }
      </div>
      <div  className='h-[8%] border-t text-center flex place-items-center cursor-pointer' onClick={()=>{navigate('/view/all/income')}} ><div className='text-center p-2 w-full' >See All</div></div>
    </div>

  )
}

export default Table