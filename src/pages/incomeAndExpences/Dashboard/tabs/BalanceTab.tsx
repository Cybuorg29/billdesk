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
    <div className=" h-full w-1/3 bg-white border shadow-lg rounded-xl grid items-center justify-items-center   hover:scale-105 cursor-pointer duration-150">
      <div>
        <div>
          <div className="h-[100px]">
            <Doughnut data={data} />
          </div>
        </div>
        <div className="grid justify-items-center mt-2">
          <div>Balance</div>
          <div className="text-center text-lg font-semibold">
            {converToInrFormat(totalIncome - totalExpences)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceTab;
