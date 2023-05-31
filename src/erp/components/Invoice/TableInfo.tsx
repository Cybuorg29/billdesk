import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {date:string,invoiceNo:string,name:string,dueDate:any,status:boolean,amt:number,i:number,id:string}

const TableInfo = ({date,invoiceNo,name,dueDate,status,amt,i,id}: Props) => {

    const navigate = useNavigate()
    let stat:string = `unpaid`;
    if(status===true){
      stat = 'paid'
    }

    if(i%2===0){
      return(
        <>
           <tr className='border-b bg-white  cursor-pointer hover:bg-gray-100  duration-300  ' data-te-toogle='tooltip' title='tap to view'   onClick={()=>{navigate(`${id}/view invoice`)}} >
                <th className='lg:p-5 text-us p-2   font-black text-gray-600  lg:text-sm ' >{date}</th>
                <th className='lg:p-5 text-us p-2   font-black  text-blue-600 lg:text-sm ' >{invoiceNo}</th>
                <th className='lg:p-5 text-us p-2   font-black  lg:text-sm uppercase ' >{name}</th>
                <th className='lg:p-5 text-us p-2   font-black  lg:text-sm ' >{amt}</th>
                <th className='lg:p-5 text-us p-2   font-black  text-gray-700 lg:text-sm ' >{`${stat}`}</th>
                <th className='lg:p-5 text-us p-2   font-black  lg:text-sm ' >{dueDate}</th>
     
              </tr>
        </>
      )

    }else{
      return(
        <>
           <tr className='border-b bg-slate-100  cursor-pointer hover:bg-gray-200  duration-300 ' data-te-toogle='tooltip' title='tap to view' onClick={()=>{navigate(`${id}/view invoice`)}} >
                <th className='lg:p-5 text-us p-2  font-black text-gray-600  lg:text-sm ' >{date}</th>
                <th className='lg:p-5 text-us p-2  font-black   text-blue-600 lg:text-sm ' >{invoiceNo}</th>
                <th className='lg:p-5 text-us p-2  font-black   lg:text-sm uppercase ' >{name}</th>
                <th className='lg:p-5 text-us p-2  font-black   lg:text-sm ' >{amt}</th>
                <th className='lg:p-5 text-us p-2  font-black   text-gray-700 lg:text-sm ' >{`${stat}`}</th>
                <th className='lg:p-5 text-us p-2  font-black   lg:text-sm ' >{dueDate}</th>
     
              </tr>
        </>
      )

    }


}

export default TableInfo