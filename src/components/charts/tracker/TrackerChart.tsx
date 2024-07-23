import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/app/hooks";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "react-toastify";
import { sortByDate, sortIsoDates } from "../../../utils/SortDates";
import { IIncome } from "../../../models/incomeAndExp/incomeInterface";
import convertIsoDate from "../../../utils/convertIsoDates";
import { IExpence } from "../../../models/incomeAndExp/expenceInterface";

type Props = {};

interface TrackerChartData {
  date: string;
  income: number;
  expences: number;
}

const TrackerChart = (props: Props) => {
  const { expences, income } = useAppSelector(
    (state) => state.incomeAndExpence
  );
  const [data, setData]: any = useState([]);

  const setChartData = () => {
    let array: any = [];

    // income.map((index: IIncome) => {
    //   if (array.length === 0) {
    //     // toast.error('empty')
    //     const obj: TrackerChartData = {
    //       date: convertIsoDate(index.createdAt),
    //       expences: 0,
    //       income: index.amount,
    //     };
    //     array = [...array, obj];
    //   } else {
    //     // toast.success('not empty')
    //     let find = false;
    //     array.map((item: TrackerChartData) => {
    //       if (item.date === index.createdAt) {
    //         item.income = item.income + index.amount;
    //         toast.info(item.income);
    //         find = true;
    //       } else {
    //       }
    //     });
    //     if (find === false) {
    //       // toast.info(index.date)
    //       const obj: TrackerChartData = {
    //         date: convertIsoDate(index.createdAt),
    //         expences: 0,
    //         income: index.amount,
    //       };
    //       array = [...array, obj];
    //     }
    //   }
    // });

    // expences.map((index) => {
    //   if (array.length === 0) {
    //     // toast.info('empty')
    //     const obj: TrackerChartData = {
    //       date: convertIsoDate(index.createdAt),
    //       expences: index.amount,
    //       income: 0,
    //     };
    //     array = [...array, obj];
    //   } else {
    //     // toast.success('array')
    //     let find = false;
    //     //   toast.info(array.length)
    //     array.map((item: TrackerChartData) => {
    //       //  toast.info()
    //       if (item.date === index.date) {
    //         find = true;
    //         // toast.success('date')
    //         item.expences = item.expences + index.amount;
    //         //  toast.success(item.expences)
    //       } else {
    //         //   toast.error('date not found')
    //       }
    //     });
    //     if (find === false) {
    //       // toast.info(index.date)
    //       const obj: TrackerChartData = {
    //         date: convertIsoDate(index.createdAt),
    //         expences: index.amount,
    //         income: 0,
    //       };
    //       array = [...array, obj];
    //     }
    //   }
    // });

    let newArray: TrackerChartData[] = [];


    income.map((value: IIncome) => {
      if (newArray.length === 0) {
        const obj: TrackerChartData = {
          date: convertIsoDate(value.createdAt).split('at')[0],
          income: value.amount,
          expences: 0
        }
        newArray.push(obj);
      } else {

        const find = newArray.findIndex((dat) => dat.date === value.createdAt);
        if (find !== -1) {
          newArray[find].income = newArray[find].income + value.amount;

        } else {
          const obj: TrackerChartData = {
            date: convertIsoDate(value.createdAt).split('at')[0],
            income: value.amount,
            expences: 0
          }
          newArray.push(obj);

        }

      }
    });

    expences.map((value: IExpence) => {
      if (newArray.length === 0) {
        const obj: TrackerChartData = {
          date: convertIsoDate(value.createdAt).split('at')[0],
          income: value.amount,
          expences: 0
        }
        newArray.push(obj);
      } else {

        const find = newArray.findIndex((dat) => dat.date === convertIsoDate(value.createdAt).split('at')[0]);
        if (find !== -1) {
          newArray[find].expences = newArray[find].expences + value.amount;
        } else {
          const obj: TrackerChartData = {
            date: convertIsoDate(value.createdAt).split('at')[0],
            income: 0,
            expences: value.amount
          }
          newArray.push(obj);

        }

      }


    })

    // newArray = newArray.sort((a: any, b: any) => {
    //   const date1 = new Date(a.date);
    //   const date2 = new Date(b.date);
    //   return date1.getDate() - date2.getDate();
    // });
    newArray = sortIsoDates(newArray);
    newArray = newArray.map((index: any) => {
      index.date = convertIsoDate(index.date).split('at')[0];
      return index;
    })
    console.log(newArray)

    // array = array.slice(-5);
    setData(newArray);
  }

  useEffect(() => {
    setChartData();
  }, [expences, income]);

  return (
    <>
      <ResponsiveContainer
        width={"100%"}
        height={"100%"}
        className={"grid items-center  bg-component rounded-xl    w-full h-full overflow-auto "}
      >

        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <Legend />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#82ca9d"

            fill="url(#colorPv)"
          />
          <Area
            type="monotone"
            dataKey="expences"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>

  );
};

export default TrackerChart;
