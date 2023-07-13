import React from "react";
import "../css/Income.css";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import { useAppSelector } from "../../../../store/app/hooks";
import { converToInrFormat } from "../../../../utils/ConvertInrFormat";
import { Doughnut } from "react-chartjs-2";
import { ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
type Props = {};

const IncomeTab = ({ }: Props) => {
  const { totalIncome } = useAppSelector((state) => state.incomeAndExpence);

  const data = {
    labels: ["Expence"],
    datasets: [
      {
        label: "My First Dataset",
        data: [totalIncome],
        backgroundColor: ["green"],
        hoverOffset: 4,
      },
    ],
  };
  return <div className="h-full border shadow-lg duration-150 rounded-xl w-1/3 bg-white hover:scale-105  cursor-pointer p-4" >
    <ResponsiveContainer className={'h-[60%]  grid place-items-center  p-3'} height={'70%'}  >
      <Doughnut data={data} options={{ maintainAspectRatio: false }} />
    </ResponsiveContainer>
    <div className="h-[30%] " >
      <div className="text-center ">Income</div>
      <div className="text-center font-semibold text-lg ">{converToInrFormat(totalIncome)}</div>
    </div>

  </div>


};

export default IncomeTab;
