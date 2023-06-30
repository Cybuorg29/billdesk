import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../../../store/app/hooks'
import { incomeAndExpencesObjectSchema } from '../../../../store/features/IncomeAndExpences/IncomeAndExpences'

type Props = {}

const IncomeTable = ({ }: Props) => {
  const { income } = useAppSelector(state => state.incomeAndExpence)
  const { sort } = useParams()

  useEffect(() => {
    //  toast.info(sort)
  }, [sort])

  return (
    <div className=' border rounded-t-xl' >
      {/* <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

      {
        income.map((index:incomeAndExpencesObjectSchema,i:number)=>{
          if(index.category===sort||sort==='all'){ 
            return(
              <TableRow key={index.id} >
                    <TableCell>{++i}</TableCell>
                    <TableCell>{index.date}</TableCell>
                    <TableCell>{index.category}</TableCell>
                    <TableCell>{index.title}</TableCell>
                    <TableCell>{index.amount}</TableCell>
                  </TableRow>
                )
              }
              
              
              
            })
          }
          </TableBody>
    </Table> */}
   <div  className="flex flex-col" >
    <div className="">
      <div className="inline-block min-w-full ">
        <div className="overflow-hidden">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
            <tr className="border-b dark:border-neutral-500">
                <th  scope="col"  className='px-6 py-4' >#</th>
                <th  scope="col"  className='px-6 py-4' >Date</th>
                <th  scope="col"  className='px-6 py-4' >Category</th>
                <th  scope="col"  className='px-6 py-4' >Title</th>
                <th  scope="col"  className='px-6 py-4' >Amount</th>
           
              </tr>
            </thead>
        <tbody>
          {
            income.map((index: incomeAndExpencesObjectSchema, i: number) => {
              if (sort === index.category || sort === 'all') {
                if (index.category === 'invoice') {
                  return (
                    <tr className='cursor-pointer hover:bg-slate-50' >
                      {/* <th  className='p-2  border-b-2 font-ubuntu ' >{++i}</th>
                  <th  className='p-2 border-b-2 font-ubuntu ' >{index.date}</th>
                  <th  className='p-2 border-b-2 font-ubuntu ' >{index.category}</th>
                  <th  className='p-2 border-b-2 font-ubuntu ' >{index.title}</th>
                  <th  className='p-2 border-b-2 font-ubuntu ' >{index.amount}</th> */}

                      <td className="whitespace-nowrap px-6 py-4 font-medium">{++i}</td>
                      <td className="whitespace-nowrap px-6 py-4">{index.date}</td>
                      <td className="whitespace-nowrap px-6 py-4">{index.category}</td>                      
                      <td className="whitespace-nowrap px-6 py-4">{index.title}</td>
                      <td className="whitespace-nowrap px-6 py-4">{index.amount}</td>
                    </tr>
                  )

                }

                else {


                  return (
                      <tr className="border-b dark:border-neutral-500">
                      {/* <th  className='p-2  border-b-2 font-ubuntu ' >{++i}</th>
                <th  className='p-2 border-b-2 font-ubuntu ' >{index.date}</th>
                <th  className='p-2 border-b-2 font-ubuntu ' >{index.category}</th>
                <th  className='p-2 border-b-2 font-ubuntu ' >{index.title}</th>
                <th  className='p-2 border-b-2 font-ubuntu ' >{index.amount}</th> */}
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{++i}</td>
                      <td className="whitespace-nowrap px-6 py-4">{index.date}</td>
                      <td className="whitespace-nowrap px-6 py-4">{index.category}</td>                      
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