import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/app/hooks";
import { employeeObject, setEmployee } from "../../../store/features/employee/employeeSlice";
import { toast } from "react-toastify";
import { EmployeeData } from "../../../store/actions/data/employee/get";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { SolidButton } from "../../../components/ui/Buttons/solid/SolidButton";
import { DeleteIcon } from "../../../components/ui/icons/DeleteIcon";
import { EditIcons } from "../../../components/ui/icons/EditIcon";
import { useNavigate } from "react-router-dom";
import { deleteEmployee } from "../../../store/actions/data/employee/delete";
import { erpAssets } from "../../../images/ImageExport";
import Tabs from "../../../components/ui/tabs/Tabs";
import { converToInrFormat } from "../../../utils/ConvertInrFormat";
import { IExpence } from "../../../models/incomeAndExp/expenceInterface";
import convertIsoDate from "../../../utils/convertIsoDates";


type Props = {};
type roundTabProps = {
  name: string,
  value: string
}

interface tabObj {
  name: string
  amount: any
  logo: any
  sign: any
}


const EmployeeDashboard = (props: Props) => {
  const navigate = useNavigate()

  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const { employee } = useAppSelector(state => state.employees)
  const { expences, isExpences } = useAppSelector(state => state.incomeAndExpence)
  const [employeeDetails, setEmployeeDetails] = useState({
    total: 0,
    contract: 0,
    regular: 0
  });

  const initData = () => {
    setEmployeeDetails({
      total: 0,
      contract: 0,
      regular: 0
    })
    employee.map((index: any) => {
      setEmployeeDetails((prev: any) => { return { ...prev, total: prev.total + 1 } })
      if (index?.type === 200) {
        setEmployeeDetails((prev: any) => { return { ...prev, regular: prev?.regular + 1 } })
      } else if (index?.type === 100) {
        setEmployeeDetails((prev: any) => { return { ...prev, contract: prev?.contract + 1 } })
      }
    })
  }


  useEffect(() => {
    EmployeeData();
  }, []);

  useEffect(() => {
    initData()
  }, [employee])

  useEffect(() => {

  }, [expences])



  const tabData: tabObj[] = [
    {
      name: "Total Employees ",
      amount: employeeDetails.total,
      logo: "",
      sign: "+",
    },
    {
      name: "Regular Employees ",
      amount: employeeDetails.regular,
      logo: "",
      sign: "+",
    },
    {
      name: "Contracted Employees ",
      amount: employeeDetails.contract,
      logo: "",
      sign: "+",
    },
  ];

  const DeleteDialog = () => {
    return (<>
      <Dialog open={openDelete} >
        <DialogTitle>Delete Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you really want to delete this employee</DialogContentText>
        </DialogContent>
        <DialogActions >
          <SolidButton color="error" innerText="Delete" onClick={() => { deleteEmployee(id) }} />
          <SolidButton color="black" innerText="Cancel" onClick={() => { setOpenDelete(false) }} />
        </DialogActions>

      </Dialog>

    </>)
  }



  return (
    <>
      <DeleteDialog />
      <div className="w-full h-full ">
        <div className="h-full">
          <div className="p-4 flex place-content-between ">
            <div className="text-xl font-poopins text-grayFont" >Employees</div>
            <div className="flex gap-5">
              <SolidButton color="black" innerText="Pay Salary" onClick={() => { navigate(`/create/400/expence`) }} />
              <SolidButton color="black" innerText="Add Employee" onClick={() => { navigate(`/create/employee`) }} />
            </div>
          </div>
          <div className="h-[20%]    flex p-4 gap-5">
            {
              tabData.map((index: tabObj, i: number) => {
                return <Tabs name={index.name} amount={index.amount} image={''} link="" key={index.name} />
              })
            }
          </div>
          <div className="border p-4 rounded-xl bg-component w-full h-[65%]">

            <Table className="w-full ">
              <TableHead className="uppercase  text-sm   border-black " >
                <TableRow>
                  <TableCell className="text-grayFont" >#</TableCell>
                  <TableCell className="text-grayFont" >Name</TableCell>
                  <TableCell className="text-grayFont" > type</TableCell>
                  <TableCell className="text-grayFont" >salary</TableCell>
                  <TableCell className="text-grayFont" >Balance</TableCell>
                  <TableCell className="text-grayFont" >Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employee.map((index: any, i: number) => {
                  let type: string = '';
                  if (index?.type === 200) {
                    type = 'Regular';
                  } else {
                    type = 'contract'
                  }
                  const salary = converToInrFormat(index.salary)
                  let Balance = index.salary;
                  const now = new Date();
                  const year = now.getUTCFullYear();
                  const currentMonth = now.getUTCMonth() + 1; // Adding 1 because months are zero-indexed
                  const fiscalYearStartMonth = 4; // April
                  const fiscalYear = currentMonth < fiscalYearStartMonth ? year - 1 : year;

                  const month = (now.getUTCMonth() + 1).toString().padStart(2, '0');
                  const day = now.getUTCDate().toString().padStart(2, '0');
                  const hours = now.getUTCHours().toString().padStart(2, '0');
                  const minutes = now.getUTCMinutes().toString().padStart(2, '0');
                  const seconds = now.getUTCSeconds().toString().padStart(2, '0');
                  const milliseconds = now.getUTCMilliseconds().toString().padStart(3, '0');

                  const greater = `${fiscalYear}-${month}-00-T00:00.000Z`;
                  const lower = `${fiscalYear}-${month}-05-T${hours}:${minutes}:${seconds}.${milliseconds}+00:00`;

                  console.log('greater', greater);
                  console.log('lower', lower);

                  expences.map((expence: any) => {
                    if (
                      expence?.uid === index._id &&
                      convertIsoDate(expence?.createdAt) < convertIsoDate(greater) &&
                      convertIsoDate(expence?.createdAt) > convertIsoDate(lower)
                    ) {
                      toast.success(index.name)
                      Balance = Balance - parseInt(expence?.amount);
                    }
                  });

                  return (
                    <>
                      <TableRow >
                        <TableCell>{++i}</TableCell>
                        <TableCell>{index?.name}</TableCell>
                        <TableCell>{type}</TableCell>
                        <TableCell>{salary}</TableCell>
                        <TableCell>{converToInrFormat(Balance)}</TableCell>
                        <TableCell>
                          <div className="flex gap-5" >
                            <div>{<DeleteIcon color="black" onclick={() => { setId(index?._id); setOpenDelete(true) }} tooltip="Delete Employee" />}</div>
                            <div>{<EditIcons color="blue" onclick={() => { navigate(`/edit/${index._id}/employee`) }} />}</div>
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;
