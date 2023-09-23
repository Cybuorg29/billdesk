import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../store/app/hooks";
import TableRo from "./components/TableRow";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Props = {};

const ExpenceTable = (props: Props) => {
  const { expences } = useAppSelector((state) => state.incomeAndExpence);
  const navigate = useNavigate();
  return (
    <div className="border  h-full overflow-hidden rounded-xl shadow-xl relative ">
      <div className="p-2 border-b font-bold text-sm">Expence</div>
      <Table className="">
        <TableHead>
          <TableRow>
            <TableCell key={1} >#</TableCell>
            <TableCell key={2} >Date</TableCell>
            <TableCell key={3} >Note</TableCell>
            <TableCell key={4} >Category</TableCell>
            <TableCell key={5} >Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expences.map((index: any, i: number) => {
            if (i <= 4) {
              return (
                <>
                  <TableRo
                    key={`tr${i}`}
                    amount={index?.amount}
                    date={index?.date}
                    i={++i}
                    note={index.title.slice(-25)}
                    category={index?.category}
                  />
                </>
              );
            }
          })}
        </TableBody>
      </Table>
      <div
        className="h-8 bg-black hover:h-10 duration-150 absolute bottom-0 z-40 w-full text-end  text-white  text-sm grid justify-items-end items-center pr-10 rounded-b-xl cursor-pointer "
        onClick={() => navigate("/view/all/10/expences")}
      >
        <div className="hover:scale-105">See all {`>`}</div>
      </div>
    </div>
  );
};

export default ExpenceTable;
