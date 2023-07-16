import React from "react";
import "../css/Income.css";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import { useAppSelector } from "../../../../store/app/hooks";
import { converToInrFormat } from "../../../../utils/ConvertInrFormat";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { ResponsiveContainer } from "recharts";
type Props = {};

const IncomeTab = ({ }: Props) => {
  const { totalExpences } = useAppSelector((state) => state.incomeAndExpence);
  const data = {
    labels: ["Expence"],
    datasets: [
      {
        label: "My First Dataset",
        data: [totalExpences],
        backgroundColor: ["rgb(255, 99, 132)"],
        hoverOffset: 4,
      },
    ],
  };
  return (
    // <div>
    //     <div className='w-full h-full p-2  shadow-xl  rounded-xl grid' >

    //         <div className="title">
    //             <span>
    //                 <CurrencyRupeeRoundedIcon />
    //             </span>
    //             <p className="p-2 font-semibold">
    //                 Expences
    //             </p>

    //         </div>
    //         <div className='text-3xl text-center font-semibold ' >{total}</div>
    //         <div className='grid justify-items-center' >
    //             <div className=' rounded-r-full  rounded-l-full    bg-gray-500/20 h-2 w-11/12' >
    //                 <div className='grid w-[60%] bg-red-500 h-2' ></div>
    //             </div>

    //         </div>

    //     </div>

    // </div>

    <div className="h-full border shadow-lg duration-150 rounded-xl w-1/3 bg-white hover:scale-105  cursor-pointer p-4" >
      <ResponsiveContainer className={'h-[60%]  grid place-items-center  p-3'} height={'70%'}  >
        <Doughnut data={data} options={{ maintainAspectRatio: false }} />
      </ResponsiveContainer>
      <div className="h-[30%]" >
        <div className="text-center ">Expences</div>
        <div className="text-center font-semibold text-lg ">{converToInrFormat(totalExpences)}</div>
      </div>

    </div>
  );
};

export default IncomeTab;
