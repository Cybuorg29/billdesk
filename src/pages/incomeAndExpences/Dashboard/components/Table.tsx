import React from 'react'
import { converToInrFormat } from '../../../../utils/ConvertInrFormat'
import { Link, useNavigate } from 'react-router-dom'
import { convertIncAndExpCode } from '../../../../utils/ConverIncAndExpCode'

type Props = { array: any[], name: string, color: string, link: string }

const Table = ({ array, name, color, link }: Props) => {

  const navigate = useNavigate()
  const colorArray = ['text-green-600', 'text-red-600'];
  return (
    <div className="h-full w-full bg-component rounded-xl  ">
    { 
      (array.length===0)?<div className='w-full h-full grid place-items-center text-grayFont' >No Recorded {name} for this month </div>:

    <>
     <div className="flex p-2 h-[10%] place-content-between  ">
        <div className="text-xl font-poopins text-grayFont">{name}</div>
      </div>
      <div className="h-[80%]  overflow-hidden grid grid-rows-6">
        {array.map((index: any, i: number) => {
          const category = convertIncAndExpCode(index?.category)
          if (i <= 5) {
            return (
              <>
                <div className="border border-l-0 border-r-0 p-2 flex">
                  <div className="w-[70%]">
                    <div className=" flex gap-1"><div className='font-semibold text-grayFont text-sm' >{category}</div><div className='text-gray-600 text-sm ' >{`(${index?.date})`}</div></div>
                    <div className="text-gray-500 text-xs">
                      {" "}
                      {index?.title}
                    </div>
                  </div>
                  <div>
                    <div className={`${color}`}>
                      {converToInrFormat(index?.amount)}
                    </div>
                  </div>
                </div>
              </>
            );
          }
        })}
      </div>
      <Link to={link} className="text-blue-500 h-[10%] flex place-content-center items-center " >
        View All
      </Link>
    </>
      }
    </div>

  )
}

export default Table







