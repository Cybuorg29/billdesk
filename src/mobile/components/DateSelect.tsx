import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/app/hooks';
import { useNavigate } from 'react-router-dom';
import convertIsoDate from '../../utils/convertIsoDates';
import Button from './Button';
import DateChangeDialog from '../../components/Select/dateChangeDialog';

type Props = {}

const DateSelect = (props: Props) => {
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
        <div className=' p-2 w-full h-full   grid gap-2'>
            {/* <div className='w-full h-[60%] grid grid-cols-2 gap-1'>
                <div className='border w-full h-full text-gray-600 font-ubuntu flex place-content-center items-center  bg-component '>
                    From:<span className='text-purple-700'>{convertIsoDate(to).split('at')[0]}</span>
                </div>
                <div className='border w-full h-full text-gray-600 font-ubuntu flex place-content-center items-center  bg-component '>
                    to:<span className='text-purple-700'>{convertIsoDate(from).split('at')[0]}</span>
                </div>
                <div className='border w-full h-full bg-component '></div>
            </div>
            <div className='border w-full h-[40%] bg-component '></div> */}
            <DateChangeDialog lower={from} upper={to} isOpen={openDialog} close={() => setOpenDialog(false)} onChange={(e: React.ChangeEvent<any>) => { setDates((prev) => { return { ...prev, [e.target.name]: e.target.value } }) }} />
            <div className='w-full h-full border rounded-xl bg-component p-2'>
                <div className='text-xl'>Date </div>
                <div className='text-gray-600 text-md'>Showing Data from <span className='text-black font-semibold'>{convertIsoDate(from).split('at')[0]}</span> to <span className='text-black font-semibold'>{convertIsoDate(to).split('at')[0]}</span></div>
                <div className=''>
                    <Button name='Change' onClick={() => { setOpenDialog(true) }} />
                </div>
            </div>
            {/* <div className='w-full h-full border'></div> */}

        </div>
    )
}

export default DateSelect