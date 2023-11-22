import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../../../store/app/hooks'
import { incomeAndExpencesObjectSchema } from '../../../../store/features/IncomeAndExpences/IncomeAndExpences'
import { IIncome } from '../../../../models/incomeAndExp/incomeInterface'
import convertIsoDate from '../../../../utils/convertIsoDates'

type Props = {}

const IncomeTable = ({ }: Props) => {
  const { income } = useAppSelector(state => state.incomeAndExpence)
  const { sort } = useParams()

  useEffect(() => {
    //  toast.info(sort)
  }, [sort])

  return (
    <div className='  rounded-t-xl ' >

      <div className="flex flex-col" >
        <div className="">
          <div className="inline-block min-w-full ">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500 uppercase">
                  <tr className="border-b dark:border-neutral-500">
                    <th scope="col" className='px-6 py-4' >#</th>
                    <th scope="col" className='px-6 py-4' >Date</th>
                    <th scope="col" className='px-6 py-4' >Category</th>
                    <th scope="col" className='px-6 py-4' >Title</th>
                    <th scope="col" className='px-6 py-4' >Amount</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    income.map((index:IIncome, i: number) => {
                      if (sort === index.type || sort === 'all') {
                        if (index.type === 'invoice') {
                          return (
                            <tr className='cursor-pointer hover:bg-slate-50' >
                              <td className="whitespace-nowrap px-6 py-4 font-medium">{++i}</td>
                              <td className="whitespace-nowrap px-6 py-4">{convertIsoDate(index.createdAt)}</td>
                              <td className="whitespace-nowrap px-6 py-4">{index.type}</td>
                              <td className="whitespace-nowrap px-6 py-4">{index.title}</td>
                              <td className="whitespace-nowrap px-6 py-4">{index.amount}</td>
                            </tr>
                          )

                        }

                        else {


                          return (
                            <tr className="border-b dark:border-neutral-500">
                              <td className="whitespace-nowrap px-6 py-4 font-medium">{++i}</td>
                              <td className="whitespace-nowrap px-6 py-4">{index.createdAt}</td>
                              <td className="whitespace-nowrap px-6 py-4">{index.type}</td>
                              <td className="whitespace-nowrap px-6 py-4">{index.title}</td>
                              <td className="whitespace-nowrap px-6 py-4">{index.amount}</td>
                            </tr>
                          )
                        }
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
  )
}

export default IncomeTable


{/* //   < div className="flex flex-col" >
//     <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
//       <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
//         <div className="overflow-hidden">
//           <table className="min-w-full text-left text-sm font-light">
//             <thead className="border-b font-medium dark:border-neutral-500">
//               <tr>
//                 <th className='' >#</th>
//                 <th className='' >Date</th>
//                 <th className='' >Category</th>
//                 <th className='' >Title</th>
//                 <th className='' >Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="border-b dark:border-neutral-500">
//                 <td className="whitespace-nowrap px-6 py-4 font-medium">{index}</td>
//                 <td className="whitespace-nowrap px-6 py-4">Mark</td>
//                 <td className="whitespace-nowrap px-6 py-4">Otto</td>
//                 <td className="whitespace-nowrap px-6 py-4">@mdo</td>
//               </tr>
//               <tr className="border-b dark:border-neutral-500">
//                 <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
//                 <td className="whitespace-nowrap px-6 py-4">Jacob</td>
//                 <td className="whitespace-nowrap px-6 py-4">Thornton</td>
//                 <td className="whitespace-nowrap px-6 py-4">@fat</td>
//               </tr>
//               <tr className="border-b dark:border-neutral-500">
//                 <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
//                 <td className="whitespace-nowrap px-6 py-4">Larry</td>
//                 <td className="whitespace-nowrap px-6 py-4">Wild</td>
//                 <td className="whitespace-nowrap px-6 py-4">@twitter</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
// </ > */}