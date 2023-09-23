import  React,{useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
export  interface  updateInterface{
  title:string
  id:string
  type:string
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type Props = {scale:{set:any,value:boolean}}

const NotificationDialog = ({scale}: Props) => {
 const [updates,setUpdates]:any = useState<updateInterface[]>([]);



 useEffect(()=>{
  
    const req =  setTimeout(function(){
     console.log('request')
    },300)

     return ()=> clearInterval(req)
  })

  return (
    <div>
      <BootstrapDialog
      fullWidth={true}
        onClose={()=>scale.set(false)}
        aria-labelledby="customized-dialog-title"
        open={scale.value}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Updates
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={()=>scale.set(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent   dividers>
            {
                (updates.length===0)? <Typography className='text-center' gutterBottom>No Updates to show
                </Typography>:  updates.map((index:updateInterface)=>{
                    return  <Typography gutterBottom>
                      {index.title}
                  </Typography>
                })
            }
          <Typography gutterBottom>
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}











export default NotificationDialog