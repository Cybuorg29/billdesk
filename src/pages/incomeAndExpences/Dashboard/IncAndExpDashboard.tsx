import React, { useEffect, useState } from "react";
import { SolidButton } from "../../../components/ui/Buttons/solid/SolidButton";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/app/hooks";
import { converToInrFormat } from "../../../utils/ConvertInrFormat";
import TrackerChart from "../../../components/charts/tracker/TrackerChart";
import Table from "./components/Table";
import Tabs, { tabProps } from "../../../components/ui/tabs/Tabs";
import IncomeAndExpenceSelect from "../../../components/Select/IncomeAndExpenceSelect";
import PageHeading from "../../../components/ui/Page Heading/PageHeading";
import { updateTopTabs } from "./functions/updateTopTabs";
type Props = {};


interface monthObj {
  name: string
  value: number
}
interface monthobjArray {
  months: monthObj[]
}

const IncAndExpDashboard = (props: Props) => {
  const { totalExpences, totalIncome, expences, income } = useAppSelector(
    (state) => state.incomeAndExpence
  );
  const navigate = useNavigate();
  const tabArray: any = updateTopTabs(income, expences)




  useEffect(() => {

  }, [income, expences])



  return (
    <>
      <div className=" h-full p-4 ">
        <div className="text-2xl font-semibold  flex place-content-between  h-[10%]  text-grayFont">
          {" "}
          <div className="flex gap-5 place-items-center">
            <PageHeading name="Cash Flow" />
            <IncomeAndExpenceSelect />


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
            <TrackerChart />
          </div>
          <div className=" flex  gap-2 h-full w-1/2" >
            <div className="h-full w-1/2 " >
              <Table array={income} name="Income" color="text-green-600" link="/view/all/income" />
            </div>
            <div className="h-full  w-1/2 " >
              <Table array={expences} name="Expences" color="text-red-600" link="/view/all/10/expences" />
            </div>
          </div>

        </div>

      </div>

    </>
  );
};

export default IncAndExpDashboard;
