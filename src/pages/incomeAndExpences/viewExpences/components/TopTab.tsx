import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Chart, Doughnut } from 'react-chartjs-2'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ResponsiveContainer } from 'recharts'
import { useAppSelector } from '../../../../store/app/hooks'
import { incomeAndExpencesObjectSchema } from '../../../../store/features/IncomeAndExpences/IncomeAndExpences'
type Props = {}
type infoTabProps = { name: string, amount: number, color: string }

const TopTab = (props: Props) => {
    const { sort } = useParams()
    const navigate = useNavigate()
    const { totalExpences, expences } = useAppSelector(state => state.incomeAndExpence)
    const [total, setTotal]: any = useState({
        provisions: 0,
        purchaseOfGoods: 0,
        salaries: 0,
        purchase: 0,
        tax: 0,
        gst: 0,
        others: 0
    })
    const [array, setArray]: any = useState({})
    const colorArray = ["bg-[#878BB6]", "bg-[#4ACAB4]", "bg-[#FF8153]", "bg-[#FFEA88]", "bg-[#FF6384]", 'bg-[#884EA0] ', 'bg-[#EB984E]']

    const init = async () => {
        let tot = {
            provisions: 0,
            purchaseOfGoods: 0,
            salaries: 0,
            purchase: 0,
            tax: 0,
            gst: 0,
            others: 0
        }

        expences.map((index: incomeAndExpencesObjectSchema, i) => {
            let value = 0


            switch (index.category) {
                case '100': {
                    value = tot.provisions + index.amount;
                    setTotal((prev: any) => { return { ...prev, provisions: value } })
                    tot.provisions = value
                    break;
                }
                case '200':
                    {
                        value = tot.purchaseOfGoods + index.amount;
                        setTotal((prev: any) => { return { ...prev, purchaseOfGoods: value } })
                        tot.purchaseOfGoods = value
                        break;
                    }
                case '300':
                    {
                        value = tot.purchase + index.amount;
                        setTotal((prev: any) => { return { ...prev, purchase: value } })
                        tot.purchase = value
                        break;
                    }
                case '400':
                    {
                        value = tot.salaries + index.amount;
                        setTotal({ ...total, salaries: value })
                        tot.salaries = value
                        break;
                    }
                case '500':
                    {
                        value = tot.others + index.amount;
                        setTotal((prev: any) => { return { ...prev, others: value } })
                        tot.others = value
                        break;
                    }
                case '600':
                    {
                        value = total.tax + index.amount;

                        tot.others = value;
                        break;

                    }
                case '700':
                    {
                        value = tot.gst + index.amount
                        tot.gst = value

                    }

            }

        })

        // setData(total)
        setArray(tot)
        let newObj: any = JSON.stringify(data)
        newObj = JSON.parse(newObj)
        newObj.datasets[0].data = [tot.provisions, tot.purchaseOfGoods, tot.salaries, tot.purchase, tot.tax, tot.gst, tot.others]

        setData(newObj)
    }

    useEffect(() => {
        init()

    }, [expences, totalExpences])


    const [data, setData] = useState({
        labels: ['provisions', 'purchaseOfGoods', 'salaries', 'purchase', 'tax', 'gst', 'others'],
        datasets: [{
            label: 'Expence Tracker',
            data: array,
            backgroundColor: [
                // 'green', 'blue', 'blue', , 'green', 'red', 'green'

                "#878BB6", "#4ACAB4", "#FF8153", "#FFEA88", "#FF6384", '#884EA0 ', '#EB984E '

            ],
            hoverOffset: 4
        }]
    })

    useEffect(() => {

    }, [data])



    return (
        <>
        <div className='border p-3  h-full rounded-xl bg-component ' >
            <div className='flex h-full  ' >
                <div className=' h-full  flex place-items-center w-[20%] p-2 ' >
                    <Doughnut data={data} />
                </div>
                <div className='grid flex-1 gap-5 md:grid-cols-4 lg:grid-cols-5 items-center '>
                    <InfoTab name='Provisions' amount={array?.provisions} color={'#878BB6'} />
                    <InfoTab name='Purchase Of Goods' amount={array?.purchaseOfGoods} color={'#4ACAB4'} />
                    <InfoTab name='Purchase' amount={array?.purchase} color={'#FFEA88'} />
                    <InfoTab name='Salaries' amount={array?.salaries} color={'#FF8153'} />
                    <InfoTab name='Tax Paid' amount={array?.tax} color={'#FF6384'} />
                    <InfoTab name='GST Paid' amount={array?.gst} color={'#884EA0'} />
                    <InfoTab name='Others' amount={array?.others} color={'#EB984E'} />
                </div>

            </div>

        </div>
        </>

    )

    function InfoTab({ name, amount, color }: infoTabProps) {
        return <div className=' grid w-fit h-fit place-items-center' >
            <div>
                <div className='flex gap-2 place-items-center'>
                    <div className={`h-2 w-2 rounded-full bg-[${color}]`}></div>
                    <div className='text-xs font-semibold uppercase text-gray-600 text-center'>{name}</div>
                </div>
                <div className='text-xl font-bold text-center'>{amount}</div>
            </div>
        </div>
    }
}

export default TopTab