import React from 'react'
import { SolidButton } from '../../../components/ui/Buttons/solid/SolidButton';
import { useNavigate } from 'react-router-dom';
import exp from 'constants';
import { expIcon } from '../../../icons/exportIcons';
import { useAppSelector } from '../../../store/app/hooks';
import { converToInrFormat } from '../../../utils/ConvertInrFormat';
import SouthWestIcon from "@mui/icons-material/SouthWest";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import TrackerChart from '../../../components/charts/tracker/TrackerChart';
import Table from './components/Table';
type Props = {}
type tabProps={
  name:string
  amount:string
  image:any
  link:string
}

const IncAndExpDashboard = (props: Props) => {
   const {totalExpences,totalIncome,expences,income} = useAppSelector(state=>state.incomeAndExpence)
    const navigate = useNavigate()
    const tabArray:tabProps[]=[
      {
          name:'Total Income',
          image:<SouthWestIcon/>,
          amount:converToInrFormat(totalIncome),
          link:'/'
      },
      {
        name:'Total Expences',
        amount:converToInrFormat(totalExpences),
        image:<NorthEastIcon/>,
        link:'/'
      },
      {
        name:'Balance',
        amount:converToInrFormat(totalIncome-totalExpences),
        image:'=',
        link:'/'
      }
    ]


  const Tabs =({amount,image,link,name}:tabProps)=> {
     return <div className="p-2 place-items-center  bg-component rounded-xl flex hover:scale-105 cursor-pointer duration-150 w-full gap-5" onClick={()=>navigate(`${link}`)}>
    <div className=' w-16 h-16 rounded-full bg-whitesmoke  grid items-center justify-items-center'><div className='scale-150'>{image}</div></div>
    <div className='flex place-items-center '>
      <div>
        <div className='text-gray-600 '>{name} </div>
        <div className='text-2xl font-semibold w-full'>{amount}</div>
      </div>
    </div>
  </div>;
}
  return (
    <div className="p-4 h-full ">
      <div className="text-2xl font-semibold  flex place-content-between  h-[8%]  text-grayFont">
        {" "}
        <div>Income And Expence</div> 
        <div className='flex gap-3'>
          <SolidButton color='black'innerText='Add Expence' onClick={()=>{navigate(`/create/400/expence`)}} />
          <SolidButton color='black'innerText='Add Income' onClick={()=>{navigate(`/create/income`)}} />
          </div>{" "}
      </div>
      <div className="  flex lg:grid grid-cols-3 gap-5 w-full h-[16%]  m-2">
        {
          tabArray.map((index:tabProps)=>{
            return <Tabs name={index.name} image={index.image} amount={index.amount} link={index.link}/>
          })
        }     
     
      </div> 
      
  

    </div>
  );
}

export default IncAndExpDashboard