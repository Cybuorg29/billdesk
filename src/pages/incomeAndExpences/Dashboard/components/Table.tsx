import React from 'react'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'
import { Link, useNavigate } from 'react-router-dom'
import { convertIncAndExpCode } from '../../../../utils/ConverIncAndExpCode'

type Props = { array: any[], name: string, color: string, link: string }

const Table = ({ array, name, color, link }: Props) => {

  const navigate = useNavigate()
  const colorArray = ['text-green-600', 'text-red-600'];
  return (
    <div className="h-[100%] w-full bg-component rounded-xl  relative border ">
      <div className="text-xl font-poopins text-grayFont pl-5 pr-5 p-2 border-b  h-[8%]">{name}</div>
      <div className='h-[84%]'>
      {
        (array.length === 0) ?
         <div className='w-full h-full grid place-items-center text-grayFont' >No Recorded {name} for this month </div> :
          <>
            <div className="  overflow-auto flex flex-col h-full" >
              {array.map((index: any, i: number) => {
                const category = convertIncAndExpCode(index?.category)
                return (
                  <>
                    <div className='border-b flex w-full ' >
                      <div className='p-2  flex grid-cols-3 place-content-between w-full' >
                        <div className='col-span-2' >
                          <div className=' text-grayFont font-bold' >{category}</div>
                          <div className=' text-black  text-sm' >{index?.title}</div>
                          <div className=' text-gray-500 text-sm' >{index?.date}</div>
                        </div>
                        <div className='col-span-1 ' >
                          <div className={`${color} text-end w-full`}>
                            {converToInrFormat(index?.amount)}
                          </div>
                        </div>


                      </div>

                    </div>
                  </>
                );

              })}
            </div>

         
           
          </>
          
      }
      </div>
      <Link to={link} className="text-blue-500  border  w-full rounded-b-xl h-[8%] flex place-content-center items-center  z-50" >
              View All
            </Link>

    </div>
  )
}

export default Table







