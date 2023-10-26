import React, { useEffect, useId, useState } from "react";
import { useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListIcon from "@mui/icons-material/List";
import { useAppSelector } from "../../store/app/hooks";
import { capitalizeFirstLetter } from "../../utils/CapitalFirst";
import SearchIcon from '@mui/icons-material/Search';
import OptionBar from "./OptionBar";
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationDialog from "../ui/Notifications/NotificationDialog";
import { Badge } from "@mui/material";
type props = {};



const Topbar = ({ }: props) => {
  const { name } = useAppSelector((state) => state.userData);
  const { notification } = useAppSelector(state => state.Notification)
  const [location, setLocation] = useState("");
  const [optionBarScale, setOptionBarScale] = useState(`w-0 `);
  const [NotificationScale, setNotificationScale] = useState<boolean>(false)
  let changeLocation: any;
  const local = useLocation();
  useEffect(() => {
    changeLocation = window.location.pathname;
    changeLocation = changeLocation.split("/").pop();
    let change = "";
    if (changeLocation === "undefined") {
      change = "Not Found";
    } else {
      for (let i = 0; i <= changeLocation.length - 1; i++) {
        if (
          changeLocation[i] === `%` ||
          changeLocation[i] === "2" ||
          changeLocation[i] === "0"
        ) {
          if (changeLocation[i + 1] === "2") {
          } else if (changeLocation[i + 1] === "0") {
          }
          change = change + " ";
        } else {
          change = capitalizeFirstLetter(change);
          change = change + changeLocation[i];
        }
      }
    }
    setLocation(change);
  }, [local.pathname]);
  const scale = {
    value: optionBarScale,
    set: setOptionBarScale
  }

  const notificationScale = {
    value: NotificationScale,
    set: setNotificationScale
  }
  const NotificationKey = useId()
  return (
    <>
      <OptionBar scale={scale} />
      <NotificationDialog scale={notificationScale} key={NotificationKey} />
      <div className="h-full w-full shadow-sm flex  items-center place-content-between" >

        <div
          className="flex items-center  lg:pl-4 pl-2 lg:scale-105 lg:gap-2  "
          onClick={() => window.history.back()}
        >
          <ArrowBackIcon className="cursor-pointer" />
          <div className=" lg:text-sm text-xs font-bold">{location}</div>
        </div>
        <div className="text-xl text-grayFont" >{name}</div>
        <div className="pr-3 flex gap-2  items-center">
          <div className="relative">
            <div className=" cursor-pointer    "  title="view notifications" onClick={()=>{setNotificationScale(true)}}>
              <Badge badgeContent={notification.length} color="error" >
                <NotificationsIcon color="action" />
              </Badge>
            </div>
          </div>
          <div className=" " onClick={() => setOptionBarScale('w-[25%]')} >
            <ListIcon fontSize="large" className="cursor-pointer scale-105" />
          </div>
        </div>

      </div>
    </>
  );
};

export default Topbar;
