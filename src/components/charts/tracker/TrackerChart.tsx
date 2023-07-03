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
import { ToastContainer, toast } from "react-toastify";

type Props = {};

interface TrackerChartData {
  date: string;
  income: number;
  expences: number;
}
interface TrackerChartArray {
  data: TrackerChartData[];
}

const TrackerChart = (props: Props) => {
  const { expences, income } = useAppSelector((state) => state.tracker);
  const [data, setData]: any = useState([]);

  const setChartData = () => {
    let array: any = [];

    income.map((index: any) => {

      if (array.length === 0) {
        // toast.error('empty')
        const obj: TrackerChartData = {
          date: index.date,
          expences: 0,
          income: index.amount,
        };
        array = [...array, obj];
      } else {
        // toast.success('not empty')
        let find = false;
        array.map((item: TrackerChartData) => {
          if (item.date === index.date) {
            item.income = item.income + index.amount;
            toast.info(item.income);
            find = true;
          } else {
          }

        });
        if (find === false) {
          // toast.info(index.date)
          const obj: TrackerChartData = {
            date: index.date,
            expences: 0,
            income: index.amount,
          };
          array = [...array, obj];
        }
      }
    });

    expences.map((index) => {
      if (array.length === 0) {
        // toast.info('empty')
        const obj: TrackerChartData = {
          date: index.date,
          expences: index.amount,
          income: 0,
        };
        array = [...array, obj];
      } else {
        // toast.success('array')
        let find = false;
        //   toast.info(array.length)
        array.map((item: TrackerChartData) => {
          //  toast.info()
          if (item.date === index.date) {
            find = true;
            // toast.success('date')
            item.expences = item.expences + index.amount;
            //  toast.success(item.expences)
          } else {
            //   toast.error('date not found')
          }
        });
        if (find === false) {
          // toast.info(index.date)
          const obj: TrackerChartData = {
            date: index.date,
            expences: index.amount,
            income: 0,
          };
          array = [...array, obj];
        }
      }
    });

    console.log("array", array);
    setData(array);
  };

  useEffect(() => {
    console.log("data", data);
    setChartData();
  }, [expences, income]);

  return (
    <ResponsiveContainer
      width={"100%"}
      aspect={1.5}
      className={"grid items-center h-[100%]"}
    >
      {/* <AreaChart data={data}>
        <Area
          type={"monotone"}
          dataKey={"expences"}
        //   strokeWidth={3}
          stroke="red"
        ></Area>
        <Area
          type={"monotone"}
          stroke="green"
          color="green"
        //   strokeWidth={3}
          dataKey={"income"}
        ></Area>
        <CartesianGrid  strokeDasharray={3 3} ></CartesianGrid>
        <XAxis dataKey={"date"}></XAxis>
        <YAxis />
        <Tooltip />
        <Legend />
      </AreaChart> */}
      <LineChart width={730} height={250} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip key={'title'} />
        <Line type="monotone" dataKey="income" stroke="#8884d8" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
        <Line type="monotone" dataKey="expences" stroke="#82ca9d" strokeWidth={2} fillOpacity={1} fill="url(#colorPv)" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrackerChart;
