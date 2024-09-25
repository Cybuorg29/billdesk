import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/app/hooks'
import { useNavigate } from 'react-router-dom'
import { getMonthName } from '../../utils/getMonthName'
import { changeIncomeAndExpenceByMonth } from '../../store/actions/data/IncomeAndExpence'
import { toast } from 'react-toastify'
import { IIncome } from '../../models/incomeAndExp/incomeInterface'
import { IExpence } from '../../models/incomeAndExp/expenceInterface'
import { converToInrFormat } from '../../utils/ConvertInrFormat'
import convertIsoDate from '../../utils/convertIsoDates'
import DateChangeDialog from './dateChangeDialog'

type Props = {}

interface monthObj {
  name: string
  value: number
}

const IncomeAndExpenceSelect = (props: Props) => {


  const { month, expences, income, isExpences, isIncome, from, to } = useAppSelector(state => state.incomeAndExpence)
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  // const [monthArray, setMonthArray] = useState<monthObj[]>(appendArray())

  const [dates, setDates] = useState({
    upper: '',
    lower: '',

  })
  const navigate = useNavigate();

  interface monthObj {
    name: string;
    value: number;
  }

  function appendArray(): monthObj[] {
    const monthNames: string[] = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    function getMonthNumber(monthName: string) {
      // Create an array of month names
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      // Find the index of the input month name in the array
      const monthIndex = monthNames.indexOf(monthName);

      // Check if the month name is valid
      if (monthIndex !== -1) {
        // Add 1 to the index to get the month number (1-12)
        return monthIndex + 1;
      } else {
        // Return null or -1 to indicate an invalid month name
        return -1;
      }
    }

    let months: monthObj[] = [];
    const currentDate = new Date();
    const fiscalStartMonthIndex = monthNames.indexOf("April");

    // Calculate the number of months from April of the current fiscal year
    // to the current month
    const monthsCount = (currentDate.getMonth() + 1 + 12 - fiscalStartMonthIndex + 1) % 12;

    if (monthsCount > 4) for (let i = 0; i < monthsCount; i++) {
      const monthIndex = (fiscalStartMonthIndex + i) % 12;
      months.push({
        name: monthNames[monthIndex],
        value: getMonthNumber(monthNames[monthIndex])
      });
    }
    else {
      let num = 0
      for (let i = 4; i <= 12 + monthsCount; i++) {

        if (i > 12) {
          months.push({
            name: monthNames[num],
            value: getMonthNumber(monthNames[num])
          });
          ++num;
        }
        else {
          months.push({
            name: monthNames[i],
            value: getMonthNumber(monthNames[i])
          });
        }

      }
    }

    return months;
  }


  function initliseDates() {


    const today = new Date();
    // console.log('upper', upper)
    let upper: any = ""
    let lower: any = ""

    if (!isIncome || !isExpences) {
      let month: any = ""
      month = (today.getMonth() + 1 > 9) ? today.getMonth() + 1 : `0${today.getMonth() + 1}`
      lower = `${today.getFullYear() + '-' + month + '-' + 30}`
      upper = `${today.getFullYear() + '-' + month + '-' + '01'}`;

    } else {
      const mon = (today.getMonth() + 1 > 9) ? today.getMonth() + 1 : `0${today.getMonth() + 1}`
      lower = `${today.getFullYear() + '-' + mon + '-' + 30}`
      upper = `${today.getFullYear() + '-' + mon + '-' + '01'}`;
      // month = convertIsoDate().split('-')

    }


    // setDates(prev => { return { ...prev, upper: upper } })


    return { upper: upper, lower: lower }

  }


  // Populate the months array for the whole year



  useEffect(() => {
    // setMonthArray(appendArray())
    setDates(initliseDates());

  }, [])


  return (
    <div className='w-fit'>

      {/* <div className="flex w-fit place-items-center text-sm font-black text-black " >
        <label htmlFor="select_month" >Month :</label>
        <select name="Month" id="select_month" value={month} onChange={(e: any) => { changeIncomeAndExpenceByMonth(e.target.value) }} >
          {
            monthArray?.map((index: monthObj) => {
              return <>
                <option value={index.value} >{index.name}</option>
              </>
            })
          }
          <option value={13}  >This Year</option>
          <option value={14}  >previous Years</option>
        </select>
      </div> */}
      <DateChangeDialog lower={from} upper={to} isOpen={openDialog} close={() => setOpenDialog(false)} onChange={(e: React.ChangeEvent<any>) => { setDates((prev) => { return { ...prev, [e.target.name]: e.target.value } }) }} />
      <div className=' lg:flex lg:scale-100 scale-50 place-content-center font-sans text-sm text-black gap-5'>
        <div>
          {/* <input type='date' name='dates' placeholder='date' value={from} className='px-2 rounded-md' /> */}
          <div className='flex gap-2'>
            <div className='text-gray-600'>From :  </div>
            {
              convertIsoDate(from).split('at')[0]
            }

          </div>
        </div>

        <div>
          {/* <input type='date' name='dates' placeholder='date' value={from} className='px-2 rounded-md' /> */}
          <div className='flex gap-2'>
            <div className='text-gray-600'>To :  </div>
            {
              convertIsoDate(to).split('at')[0]
            }

          </div>
        </div>



        <div className='cursor-pointer border px-2 py-1 bg-black text-white rounded-md' onClick={() => { (!openDialog) ? setOpenDialog(true) : setOpenDialog(false) }}>
          change
        </div>
      </div>
    </div>
  )
}

export default IncomeAndExpenceSelect