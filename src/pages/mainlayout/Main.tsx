import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { useDispatch } from "react-redux";
import { saveToken } from "../../store/features/auth/authSlice";
import Loader from "../../Loaders/Loader";
import { change } from "../../store/features/loader/loaderSlice";
import { getUserData } from "../../api/userServices";
import { initilise } from "../../store/features/user/userSlice";
import { toast } from "react-toastify";
import { initliseBank } from "../../store/features/bank/bankSlice";
import { UpdateUSer, initialiseUserData } from "../../store/actions/user/user";
import Topbar from "../../components/navbar/Topbar";
import NavBar from "../../components/navbar/NavBar";
import { Colors, Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
Chart.register(Colors);

type Props = {};

const Main = (props: Props) => {
  const user = useAppSelector((state) => state.userData);
  const token = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   // checking if the token is available
  //      if(token.istoken===false){
  //        navigate('/login ')
  //           toast.info('please Login to continue')
  //      }else{
  //       toast.info('loggedin')
  //       initialiseUserData()

  //      }
  // }, []);

  useEffect(() => {
    // if(user.name===''){
    //   navigate('/settings')
    // }
    if (!token.istoken) {
      toast.info("please login to continue");
      navigate("/login");
    } else {
      initialiseUserData();
    }
  }, [token.istoken]);

  useEffect(() => { }, [user]);

  return (
    <>
      <div className="grid grid-cols-7 bg-whitesmoke   h-screen ">
        <div className="grid col-span-1 bg-whitesmoke h-full">
          <NavBar />
        </div>
        <div className=" bg-whitesmoke w-full col-span-6  h-screen ">
          <div className="  bg-white border  h-[8%]">
            {" "}
            <Topbar />
          </div>
          <div className=" h-[92%]   ">
            <div className=" h-full p-2  overflow-auto bg-whitesmoke rounded-xl ">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
