import { Button } from "@mui/material";
import React from "react";
import { SolidButton } from "../../components/ui/Buttons/solid/SolidButton";
import { useNavigate } from "react-router-dom";

type Props = {};

const NotFound = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full grid justify-items-center items-center">
      <div className="grid justify-items-center items-center gap-3 lg:p-0 p-10  ">
        <div className="text-4xl ">Page Not Found</div>
        <div className=" text-gray-500">
          The page you are  for does not exists or you entered some wrong
          data{" "}
        </div>
        <div>
          <SolidButton
            color="black"
            innerText="GO TO DASHBOARD"
            onClick={() => {
              navigate("/Dashboard");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
