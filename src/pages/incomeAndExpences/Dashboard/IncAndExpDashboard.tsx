import React, { useEffect, useState } from "react";
import { SolidButton } from "../../../components/ui/Buttons/solid/SolidButton";
import { useNavigate } from "react-router-dom";
import exp from "constants";
import { expIcon } from "../../../icons/exportIcons";
import { useAppSelector } from "../../../store/app/hooks";
import { converToInrFormat } from "../../../utils/ConvertInrFormat";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import TrackerChart from "../../../components/charts/tracker/TrackerChart";
import Table from "./components/Table";
import { incomeAndExpencesObjectSchema } from "../../../store/features/IncomeAndExpences/IncomeAndExpences";
import Tabs, { tabProps } from "../../../components/ui/tabs/Tabs";
import { getMonthName } from "../../../utils/getMonthName";
import { changeIncomeAndExpenceByMonth } from "../../../store/actions/data/IncomeAndExpence";
import IncomeAndExpenceSelect from "../../../components/Select/IncomeAndExpenceSelect";
import PageHeading from "../../../components/ui/Page Heading/PageHeading";
type Props = {};


interface monthObj{
  name:string
  value:number
}
interface monthobjArray {
  months:monthObj[]
}

const IncAndExpDashboard = (props: Props) => {
  const { totalExpences, totalIncome, expences, income } = useAppSelector(
    (state) => state.incomeAndExpence
  );
   const {month} = useAppSelector(state=>state.incomeAndExpence)
  const [monthArray,setMonthArray] = useState<monthObj[]>()
  const navigate = useNavigate();
  const tabArray: tabProps[] = [
    {
      name: "Total Income",
      image: '',
      amount: converToInrFormat(totalIncome),
      link: "/view/all/income",
    },
    {
      name: "Total Expences",
      amount: converToInrFormat(totalExpences),
      image: '',
      link: "/view/all/10/expences",
    },
    {
      name: "Balance",
      amount: converToInrFormat(totalIncome - totalExpences),
      image: "",
      link: "/",
    },
  ];


 
  


  return (
    <div className=" h-full p-4 ">
      <div className="text-2xl font-semibold  flex place-content-between  h-[8%]  text-grayFont">
        {" "}
        <div className="flex gap-5 place-items-center">
         <PageHeading name="Transactions"/>
        <IncomeAndExpenceSelect/>
      

        </div>
        <div className="flex gap-3 text-sm font-black place-items-start">
          
          <SolidButton
            color="black"
            innerText="Add Expence"
            onClick={() => {
              navigate(`/create/500/expence`);
            }}
          />
          <SolidButton
            color="black"
            innerText="Add Income"
            onClick={() => {
              navigate(`/create/income`);
            }}
          />
        </div>{" "}
      </div>
      <div className="  flex lg:grid grid-cols-3 gap-5 w-full h-[14%]  mb-4">
        {/* top tabs  */}
        {tabArray.map((index: tabProps) => {
          return (
            <Tabs
              name={index.name}
              image={index.image}
              amount={index.amount}
              link={index.link}
            />
          );
        })}
      </div>
      <div className="flex   gap-3 h-[75%]     rounded-xl ">
        <div className=" w-1/2  rounded-xl pb-1 bg-component h-full" >
      <TrackerChart/>
        </div>
        <div className=" flex  gap-2 h-full w-1/2" >
          <div className="h-full w-1/2 " >
        <Table array={income}   name="Income"  color="text-green-600" link="/view/all/income" />
          </div>
          <div className="h-full  w-1/2 " >
        <Table array={expences} name="Expences" color="text-red-600"  link="/view/all/10/expences" />

          </div>
        </div>
   
      </div>

    </div>
  );
};

export default IncAndExpDashboard;
