import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/app/hooks";
import { employeeObject, setEmployee } from "../../../store/features/employee/employeeSlice";
import { toast } from "react-toastify";
import { EmployeeData } from "../../../store/actions/data/employee/get";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { SolidButton } from "../../../components/ui/Buttons/solid/SolidButton";
import { DeleteIcon } from "../../../components/ui/icons/DeleteIcon";
import { EditIcons} from "../../../components/ui/icons/EditIcon";
import { useNavigate } from "react-router-dom";

type Props = {};
type roundTabProps = {
  name:string,
  value:string
}
   
  export const RoundTab = ({ name, value }: roundTabProps) => (
  <div className="w-52 h-52 rounded-full hover:scale-105 duration-150 cursor-pointer   bg-white shadow-lg   border-[10px] border-[#E5E7EB] grid place-items-center ">
    <div>
      <div>{name}</div>
      <div className="text-center  font-bold ">{value}</div>
    </div>
  </div>
);
const EmployeeDashboard = (props: Props) => {
  const navigate = useNavigate()
  
   const {employee} = useAppSelector(state=>state.employees)
    const [employeeDetails,setEmployeeDetails] = useState({
         total:0,
         contract:0,
         regular:0
    })

    const initData=()=>{
       employee.map((index:any)=>{
         setEmployeeDetails((prev:any)=>{return{...prev,total:prev.total+1}})
         if(index?.type===200){
            setEmployeeDetails((prev:any)=>{return{...prev,regular:prev?.regular+1}})
          }else if(index?.type===100){
            setEmployeeDetails((prev:any)=>{return{...prev,contract:prev?.contract+1}})
          }
       })
    }

   useEffect(() => {
     EmployeeData();
   }, []);
     useEffect(() => {
            initData()         
          
   }, [employee])


   

       

  return (
    <div className="w-full h-full ">
      <div className="h-full">
        <div className="h-[30%]  p-4  flex flex-1  gap-5">
          <RoundTab name="Total Employees" value={`${employeeDetails.total}`} key={"i"} />
          <RoundTab name="Regular Employees" value={`${employeeDetails.regular}`}key={"ii"} />
          <RoundTab name="Contract Employees" value={`${employeeDetails.contract}`} key={"ij"} />
        </div>
        <div className="border p-4 rounded-t-xl w-full h-[70%]">
          <div className="p-4 flex place-content-between ">
            <div>Employees</div>
            <SolidButton color="black" innerText="Add Employee" onClick={()=>{navigate(`/create/employee`)}}  />
          </div>
          <Table className="w-full">
            <TableHead className="uppercase  text-sm  font-black" >
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>employee type</TableCell>
                <TableCell>salary</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employee.map((index: any, i: number) => {
                return (
                  <>
                    <TableRow>
                      <TableCell>{++i}</TableCell>
                      <TableCell>{index?.name}</TableCell>
                      <TableCell>{index?.type}</TableCell>
                      <TableCell>{index?.salary}</TableCell>
                      <TableCell>{index?.balance}</TableCell>
                      <TableCell>
                        <div className="flex gap-5" >
                          <div>{<DeleteIcon  color="black" onclick={()=>{}}  />}</div>
                          <div>{<EditIcons color="blue" onclick={()=>{}} />}</div>
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
  );
};

export default EmployeeDashboard;
