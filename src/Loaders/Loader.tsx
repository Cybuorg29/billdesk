import React, { useEffect } from "react";
import Dots4 from "./spinner/Dots4";
import { useAppSelector } from "../store/app/hooks";
import Drop from "./drop/Drop";
import SpinnerCircle from "./spinner-circle/SpinnerCircle";
import { Dialog, DialogContent } from "@mui/material";

type Props = {};

const Loader = (props: Props) => {
  const scale = useAppSelector((state) => state.loader.scale);
  useEffect(() => {}, [scale]);
  return (
    <Dialog open={scale}>
      <DialogContent>
        <div className="grid place-items-center">
          <SpinnerCircle />
          <div>Please Wait....</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Loader;
