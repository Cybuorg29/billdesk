import React, { useEffect, useState } from "react";
import NavBar from "../layouts/Navbar/NavBar";
import TopBar from "../layouts/Navbar/TopBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { verifyAndGetData } from "../../api/user/user";

type Props = {};



const Main = (props: Props) => {
  
  const navigate = useNavigate()

  const [Data,setData] = useState({})
  


  useEffect(() => {

       get()
       
  }, [])
  
  
  const  get = async() =>{
     let token:any = sessionStorage.getItem('token')
     if(!token){
       navigate('/login')
       
      }else{
        try{


          token =  JSON.parse(token)
          // const {data} = await getData(token)
          const {data} =  await verifyAndGetData(token) 
          if(data.message===201){
            alert(`session Expired please login again  `)
            navigate('/login')
          }
          setData(data.data)
          console.log ( 'set', data.data)
          sessionStorage.data = JSON.stringify(data.data)
          sessionStorage.id = JSON.stringify(data.data._id)
        }catch(err:any){
          console.log(err.message)
        }
      }
 

   
        
  }



    // const name = useSelector<dataSchema>((state)=>state.name)  
    // useEffect(() => {
    //   alert(name)
    // }, [])
     
  return (
    <>
      <div className=" grid lg:grid-cols-8">
        <NavBar />

        <div className="h-screen col-span-7 bg-slate-50 overflow-auto gap-5  ">
            <TopBar  />
            <div className="p-5" >
            <Outlet  />

            </div>
            
        </div>
      </div>
    </>
  );
};

export default Main;
