import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/app/hooks'
import { useNavigate } from 'react-router-dom'
import { getMonthName } from '../../utils/getMonthName'
import { changeIncomeAndExpenceByMonth } from '../../store/actions/data/IncomeAndExpence'

type Props = {}

interface monthObj{
    name:string
    value:number
  }

const IncomeAndExpenceSelect = (props: Props) => {


    const {month} = useAppSelector(state=>state.incomeAndExpence)
    const [monthArray,setMonthArray] = useState<monthObj[]>()
    const navigate = useNavigate();

  const appendArray =()=>{
    const newArray:any=[];
     let month = new Date().getMonth() +1
   for(let i=4;i<=month;i++){
     const obj = {
       value:i,
       name:getMonthName(i)
     }
     newArray.push(obj)
   }
   if(month<=3){
     console.log('errr')
     for( let i=4;i<=12;i++){
        console.log('asda')
       const obj = {
         value:i,
         name:getMonthName(i)
       }
       newArray.push(obj)
     }

      for(let i=1;i<=month;i++){
       const obj = {
         value:i,
         name:getMonthName(i)
       }
       newArray.push(obj)

      }

   }
   setMonthArray(newArray)          
 }

 useEffect(() => {
      appendArray()
 }, [])


  return (
    <div className='w-fit'>

    <div className="flex w-fit place-items-center text-sm font-black text-black " >
    <label htmlFor="select_month" >Month :</label>
  <select name="Month" id="select_month" value={month} onChange={(e:any)=>{changeIncomeAndExpenceByMonth(e.target.value)}} >
    {
            monthArray?.map((index:monthObj)=>{
                return<>
              <option value={index.value} >{index.name}</option>
              </>
            }) 
    }
    <option  value={13}  >This Year</option>
    <option  value={14}  >previous Years</option>
  </select>
  </div>
                </div>
  )
}

export default IncomeAndExpenceSelect