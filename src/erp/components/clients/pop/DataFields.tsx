import { Input, Textarea } from "@mui/joy";
import { Button } from "@mui/material";
import React, { useState } from "react";

interface termSchema {
  tAndC: string;
}

export interface clientSchema {
  name: string;
  gstin: string;
  phone: string;
  pincode: string;
  adress: string;
  balance: number;
  transport: string;
  state: string;
  dist: string;
  term: [];
}

type Props = {
  data: clientSchema;
  handleChange: any;
  handleTermChange: (action: boolean, value: any) => void;
  deleteTerm: (term: string) => void;
};

const DataFields = ({
  data,
  handleChange,
  handleTermChange,
  deleteTerm,
}: Props) => {
  const [addTermScale, setTermScale] = useState("scale-0");
  const [pushTerm, setPushTerm] = useState("");
  return (
    <>
      <div className="relative  ">
        <div
          className={` absolute bg-white shadow-xl border w-full z-50 ${addTermScale} duration-200 p-5 `}
        >
          <div className="grid justify-items-end">
            <div
              className="p-5 cursor-pointer "
              onClick={() => setTermScale("scale-0")}
            >
              X
            </div>
          </div>
          <div className="p-5 grid gap-5">
            <label className="">Enter the Term or condition</label>
            <Textarea
              value={pushTerm}
              onChange={(e) => setPushTerm(e.target.value)}
            ></Textarea>
            <div className="grid justify-items-center">
              <Button
                variant="outlined"
                className="w-2/12"
                onClick={() => {
                  handleTermChange(true, pushTerm);
                  setTermScale("scale-0");
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <label>Business Name</label>
            <Input
              value={data.name}
              id="name"
              onChange={(e) => {
                handleChange(e.target.id, e.target.value);
              }}
            ></Input>
          </div>
          <div className="grid gap-2">
            <label>GSTIN</label>
            <Input
              value={data.gstin}
              id="gstin"
              onChange={(e) => {
                handleChange(e.target.id, e.target.value);
              }}
            ></Input>
          </div>
          <div className="grid gap-2">
            <label>Phone</label>
            <Input
              value={data.phone}
              id="phone"
              onChange={(e) => {
                handleChange(e.target.id, e.target.value);
              }}
            ></Input>
          </div>
          <div className="grid gap-2">
            <label>District</label>
            <Input
              value={data.dist}
              id="district"
              onChange={(e) => {
                handleChange(e.target.id, e.target.value);
              }}
            ></Input>
          </div>
          <div className="grid gap-2">
            <label>State</label>
            <Input
              value={data.state}
              id="state"
              onChange={(e) => {
                handleChange(e.target.id, e.target.value);
              }}
            ></Input>
          </div>
          <div className="grid gap-2">
            <label>Pincode</label>
            <Input
              value={data.pincode}
              id="pincode"
              onChange={(e) => {
                handleChange(e.target.id, e.target.value);
              }}
            ></Input>
          </div>
          <div className="grid gap-2">
            <label>Adress</label>
            <Input
              value={data.adress}
              id="adress"
              onChange={(e) => {
                handleChange(e.target.id, e.target.value);
              }}
            ></Input>
          </div>
          <div className="grid gap-2">
            <label>Starting Balance</label>
            <Input
              value={data.balance}
              id="balance"
              onChange={(e) => {
                handleChange(e.target.id, e.target.value);
              }}
            ></Input>
          </div>
          <div className="grid gap-2">
            <label>Prefered Transportation Mode</label>
            <Input
              value={data.transport}
              id="transport"
              onChange={(e) => {
                handleChange(e.target.id, e.target.value);
              }}
            ></Input>
          </div>
        </div>
        <label>Term and Conditions</label>
        <Button
          onClick={() => {
            setTermScale("scale-100");
          }}
        >
          Add{" "}
        </Button>
        <div className="border rounded-xl h-[25vh] overflow-auto ">
          <table className=" table-auto w-full  ">
            <thead>
              <tr className="border-b">
                <th className="p-2">#</th>
                <th className="p-2">Term & Condition</th>
                <th className="p-2">X</th>
              </tr>
            </thead>
            <tbody className="">
              {data.term.map((index, i: number) => {
                return (
                  <>
                    <tr className=" border ">
                      <th className="  p-2 ">{++i}</th>
                      <th
                        className="  p-2  "
                        style={{ wordWrap: "break-word" }}
                      >
                        <div className="break-words p-2">{index}</div>
                      </th>
                      <th
                        onClick={() => {
                          deleteTerm(index);
                        }}
                        className="text-end p-2 text-gray-500 cursor-pointer col-span-1"
                      >
                        X
                      </th>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      <div className=" grid justify-items-center w-full p-5  ">
        <Button variant="outlined" className="w-6/12">
          Add Client
        </Button>
      </div>
      </div>
    </>
  );
};

export default DataFields;
