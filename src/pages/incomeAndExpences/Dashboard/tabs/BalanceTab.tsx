import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart } from "chart.js";
import { ResponsiveContainer } from "recharts";
import { useAppSelector } from "../../../../store/app/hooks";
import "chartjs-plugin-doughnut-innertext";
import { converToInrFormat } from "../../../../utils/ConvertInrFormat";
Chart.register(ArcElement);
type Props = {};

const BalanceTab = (props: Props) => {
  const { totalExpences, totalIncome } = useAppSelector(
    (state) => state.incomeAndExpence
  );

  const data = {
    labels: ["Expence", "Income"],
    datasets: [
      {
        label: "My First Dataset",
        data: [totalExpences, totalIncome],
        backgroundColor: ["rgb(255, 99, 132)", "Green"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="h-full border shadow-lg duration-150 rounded-xl w-1/3 bg-white hover:scale-105  cursor-pointer p-4" >
      <ResponsiveContainer className={'h-[60%]  grid place-items-center  p-3'} height={'70%'}  >
        <Doughnut data={data} options={{ maintainAspectRatio: false }} />
      </ResponsiveContainer>
      <div className="h-[30%]" >
        <div className="text-center ">Balance</div>
        <div className="text-center font-semibold text-lg ">{converToInrFormat(totalIncome - totalExpences)}</div>
      </div>

    </div>
  );
};

export default BalanceTab;
