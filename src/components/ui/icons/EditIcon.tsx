import EditIcon from '@mui/icons-material/Edit';

type props  = {onclick:any,color:string}
export const EditIcons=({onclick,color}:props)=> {
      let  obj:any ;
     if(color==='black'){
          obj =  <div className='rounded-full hover:bg-gray-400/20  p-1' >
           <EditIcon className='cursor-pointer' />
          </div>
     }else if(color ==='blue') {
         obj =<div className='rounded-full hover:bg-gray-400/20  p-1' >
           <EditIcon  color='primary' className='cursor-pointer' onClick={()=>{onclick()}} /> 
         </div>
     }
     return obj;
}