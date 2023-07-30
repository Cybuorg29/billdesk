import React from 'react'
import { colorArray } from '../Buttons/ColorArray';
import { useNavigate } from 'react-router-dom';

type tabProps = {
  name: string;
  amount: string;
  image: any;
  link: string;
};

export const Tabs = ({ name, amount,image,link }: tabProps) => {
   const navigate = useNavigate()
     return(

      <div
      className="p-2 place-items-center  bg-component rounded-xl flex  cursor-pointer duration-150 w-full gap-5"
      onClick={() => navigate(`${link}`)}
    >
     {
      (image==='')?<div></div>: <div className=" w-16 h-16 rounded-full bg-whitesmoke  grid items-center justify-items-center">
      <div className="scale-150">{image}</div>
    </div>
     }
      <div className="flex place-items-center ">
        <div>
          <div className="text-gray-600 ">{name} </div>
          <div className="text-2xl text-grayFont font-semibold w-full">{amount}</div>
        </div>
      </div>
    </div>

     )}

export default Tabs