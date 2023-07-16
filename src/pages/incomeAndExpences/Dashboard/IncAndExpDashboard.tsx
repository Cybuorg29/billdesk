import React from "react";
import ExpencesTab from "./tabs/ExpencesTab";
import IncomeTab from "./tabs/IncomeTab";
import ExpencesTable from "../../../components/table/tracker/ExpencesTable";
import IncomeTable from "../../../components/table/tracker/IncomeTable";
import TrackerChart from "../../../components/charts/tracker/TrackerChart";
import { Link } from "react-router-dom";
import BalanceTab from "./tabs/BalanceTab";
import { useAppSelector } from "../../../store/app/hooks";
import { converToInrFormat } from "../../../utils/ConvertInrFormat";
import RoundedTabs from "../../../components/ui/tabs/RoundedTabs";
type Props = {};

const IncAndExpDashboard = (props: Props) => {
   const {totalIncome,totalExpences} = useAppSelector(state=>state.incomeAndExpence)
  return (
    <div className="grid grid-cols-2 h-full gap-2 ">
      <div className=" h-[100%] ">
        <div className=" h-[40%]  flex  p-4 gap-2  ">
          <IncomeTab />
          {/* <RoundedTabs name="Expence" value={converToInrFormat(totalIncome )} color="border-[#007300]" /> */}
          <ExpencesTab />
          <BalanceTab />
        </div>
        <div className="h-[10%]  mb-2  rounded-xl  p-2  grid grid-cols-2 place-items-center gap-3">
          <Link
            to={`/create/income`}
            className={
              "w-full border bg-black rounded-xl text-sm text-white shadow-xl hover:scale-105 duration-150  uppercase text-center h-full grid place-items-center  "
            }
          >
            {" "}
            Add Income
          </Link>
          <Link
            to={`/create/expence`}
            className={
              "w-full border  bg-black shadow-xl text-sm hover:scale-105 duration-150  text-white rounded-xl uppercase text-center h-full grid place-items-center"
            }
          >
            {" "}
            Add Expence
          </Link>
        </div>
        <div className="  h-[50%]  ">
          <div className="p-1 border shadow-xl rounded-xl grid items-centers  h-[95%] ">
            <TrackerChart />
          </div>
        </div>
      </div>
      <div className=" grid grid-rows-2 gap-2 h-[100%] overflow-hidden ">
        <div className=" ">
          <IncomeTable />
        </div>
        <div className="    ">
          <ExpencesTable />
        </div>
      </div>
    </div>
  );
};

export default IncAndExpDashboard;
