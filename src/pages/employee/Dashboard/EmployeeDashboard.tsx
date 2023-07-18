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
import { deleteEmployee } from "../../../store/actions/data/employee/delete";
import { erpAssets } from "../../../images/ImageExport";
import ImageTabs from "../../../components/ui/tabs/imageTabs";
import ImageTabs2 from "../../../components/ui/tabs/imageTabs2";

type Props = {};
type roundTabProps = {
  name:string,
  value:string
}

interface tabObj{
  name:string
  amount:any
  logo:any
  sign:any
}
   

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

       

  return (
    <div className="w-full h-full ">
      <div className="h-full">
        <div className="h-[30%]    flex p-4 gap-5">
          {/* <ImageTabs  array={tabData} /> */}
          {
            tabData.map((index:tabObj,i:number)=>{
               if(i%2===0)return <ImageTabs name={index.name} amount={index.amount} logo={''} sign={''} />
               else return <ImageTabs name={index.name} amount={index.amount} logo={''} sign={''} />
            })
          }
        </div>
        <div className="border p-4 rounded-t-xl w-full h-[65%]">
          <div className="p-4 flex place-content-between ">
            <div>Employees</div>
            <div className="flex gap-5">
            <SolidButton color="black" innerText="Pay Salary" onClick={()=>{navigate(`/create/400/expence`)}}  />
            <SolidButton color="black" innerText="Add Employee" onClick={()=>{navigate(`/create/employee`)}}  />
            </div>
          </div>
          <Table className="w-full ">
            <TableHead className="uppercase  text-sm  border-b border-t border-black " >
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
                   let  type:string = '';
                    if(index?.type===200){
                      type = 'Regular';                                             
                    }else{
                      type = 'contract'
                    }
                return (
                  <>
                    <TableRow>
                      <TableCell>{++i}</TableCell>
                      <TableCell>{index?.name}</TableCell>
                      <TableCell>{type}</TableCell>
                      <TableCell>{index?.salary}</TableCell>
                      <TableCell>{index?.balance}</TableCell>
                      <TableCell>
                        <div className="flex gap-5" >
                          <div>{<DeleteIcon  color="black" onclick={()=>{deleteEmployee(index._id)}}  />}</div>
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
