import React, { Fragment, useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../Theme/newTheme';
import api from '../../api/api';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import { StyledButton } from '../Theme/Button.styled';
import StatusDialog from './Status';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
  DialogTitle,
  Grid,
} from '@material-ui/core';

export default function FormDialog(props) {
  const [open, setOpenForm] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [status, setStatus] = useState([]);
  const [openRespons, setOpenRespons] = useState(false);
  const onSubmit = data => {
    console.log(data);
    handleClose();
    api
      .addCoupon(data)
      .then(result => {
        console.log('SUCCESS!');
        setStatus('Coupon was added successfuly!');
        setOpenRespons(true);
        api
          .couponPriceHistory(result.coupons._id)
          .then(data => {
            console.log(data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        this.setState({ message: err.toString() });
        setStatus('Oops... Somthing went wrong, try again.');
        setOpenRespons(true);
        console.log(errors);
      });
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };
  const handleCloseRespons = () => {
    setOpenRespons(false);
  };
  return (
    <MuiThemeProvider theme={theme}>
      <Fragment>
        {api.isLoggedIn() && (
          <IconButton onClick={handleOpenForm}>
            <AddCircleIcon fontSize="large" />
          </IconButton>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Grid item style={{ textAlign: 'end' }}>
            <IconButton
              onClick={handleClose}
              style={{ width: '35px', height: '35px', marginTop: 10 }}
            >
              <CancelIcon fontSize="large" />
            </IconButton>
          </Grid>

          <DialogTitle id="form-dialog-title">Create New Coupon</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Please Fill Coupon Information
            </DialogContentText>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                required
                fullWidth
                inputRef={register}
                label="Item name"
                name="title"
              />
              <TextField
                required
                fullWidth
                inputRef={register}
                label="Discount"
                name="discount"
              />
              <TextField
                fullWidth
                inputRef={register}
                label="Coupon name"
                name="couponName"
              />
              <TextField
                required
                fullWidth
                inputRef={register}
                label="Link"
                name="link"
              />
              <TextField
                fullWidth
                inputRef={register}
                label="Image Url"
                name="imgUrl"
              />
              <StyledButton type="submit">save</StyledButton>
            </form>
          </DialogContent>
        </Dialog>
        <StatusDialog
          open={openRespons}
          status={status}
          onClose={handleCloseRespons}
        />
      </Fragment>
    </MuiThemeProvider>
  );
}
