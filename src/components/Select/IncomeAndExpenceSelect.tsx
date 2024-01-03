import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/app/hooks'
import { useNavigate } from 'react-router-dom'
import { getMonthName } from '../../utils/getMonthName'
import { changeIncomeAndExpenceByMonth } from '../../store/actions/data/IncomeAndExpence'
import { toast } from 'react-toastify'

type Props = {}

interface monthObj {
  name: string
  value: number
}

const IncomeAndExpenceSelect = (props: Props) => {


  const { month } = useAppSelector(state => state.incomeAndExpence)
  const [monthArray, setMonthArray] = useState<monthObj[]>(appendArray())
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
    const monthsCount = (currentDate.getMonth() + 12 - fiscalStartMonthIndex + 1) % 12;

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



  // Populate the months array for the whole year



  useEffect(() => {
    setMonthArray(appendArray())
  }, [])


  return (
    <div className='w-fit'>

      <div className="flex w-fit place-items-center text-sm font-black text-black " >
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
      </div>
    </div>
  )
}

export default IncomeAndExpenceSelect