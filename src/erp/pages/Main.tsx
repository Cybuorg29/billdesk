import React, { useEffect, useState } from "react";
import NavBar from "../layouts/Navbar/NavBar";
import TopBar from "../layouts/Navbar/TopBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { verify} from "../../api/user/user";
import { toast } from "react-toastify";

type Props = {};

const Main = (props: Props) => {
  const navigate = useNavigate();

  const [Data, setData] = useState({});

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    let token: any = sessionStorage.getItem("token");
    if (!token||token===undefined||token===null) {
      toast.info('please login to continue')
      navigate("/login");
    } else {
      try {
        token = JSON.parse(token);
        const { data } = await verify(token)
          if(data.code ===400){
            toast.error('Please login to continue')
            navigate('/login')

            

          } else{
            

          }    
      } catch (err: any) {
        toast.error('error');
        console.log(err.message);
        toast.error(err.message);
        navigate("/login");
      }
    }
  };

  // const name = useSelector<dataSchema>((state)=>state.name)
  // useEffect(() => {
  //   alert(name)
  // }, [])

  return (
    <>
      <div className=" grid lg:grid-cols-8">
        <NavBar />

        <div className="h-screen col-span-7 bg-slate-50 overflow-auto gap-5  ">
          <TopBar />
          <div className="p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
