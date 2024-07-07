import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'

type Props = {value:string,onchange:any,type:any,set:any}

const Search = ({onchange,value,type,set}: Props) => {
  
    return (
        <div className="relative mb-4 flex w-full h-1/2 gap-2 flex-wrap items-stretch">
            <input
                value={value}
                type="search"
                className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-blue-500"
                placeholder="Search By Billed To,Invoice Amount or Invoice Date  "
                aria-label="Search"
                aria-describedby="button-addon1"
                onChange={(e) => onchange(e)} />

         <div className=''>
            <Select value={type} onChange={(e:SelectChangeEvent<HTMLInputElement>)=>{set(e.target.value)}} >
                <MenuItem value='Total Invoice' >Total Invoice</MenuItem>
                <MenuItem value='Total Due' >Total Due</MenuItem>
                <MenuItem value='Payment Received' >Payment Received</MenuItem>
            </Select>
         </div>
        </div>
    )
}

export default Search