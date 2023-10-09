import React, { useState, useEffect } from 'react';
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
import getUpdate from '../../../store/actions/notifications.actoion';
import { useAppSelector } from '../../../store/app/hooks';
import { notificationModel } from '../../../store/reducers/notifications/notification.model';

export interface updateInterface {
  title: string;
  id: string;
  type: string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type Props = { scale: { set: any; value: boolean } };

const NotificationDialog = ({ scale }: Props) => {
   const updates = useAppSelector(state=>state.Notification)

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     getUpdate();
  //   }, 7000);
  //   return () => {
  //     clearInterval(timer); // Clear the interval on component unmount
  //   };
  // }, []);

  return (
    <div>
      <BootstrapDialog
        fullWidth={true}
        onClose={() => scale.set(false)}
        aria-labelledby="customized-dialog-title"
        open={scale.value}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Updates
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => scale.set(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {updates.notification.length === 0 ? (
            <Typography className="text-center" gutterBottom>
              No Updates to show
            </Typography>
          ) : (
            updates.notification.map((index:notificationModel)=>{
              return<>
               <div className='p-3 hover:bg-slate-200/50 cursor-pointer rounded-md '>{index.title}</div>
              </>
            })
          )}
          <Typography gutterBottom></Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default NotificationDialog;
