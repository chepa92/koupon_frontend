import React, { Fragment, useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../Theme/newTheme';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import { StyledButton } from '../Theme/Button.styled';

export default function EditDialog(props) {
  const { coupon, open, onClose, onChange } = props;
  const [title, setTitle] = useState('');
  const [couponName, setCouponName] = useState('');
  const [link, setLink] = useState('');
  const [discount, setDiscount] = useState('');

  const saveCoupon = event => {
    event.preventDefault();
    onChange(title, couponName, link, discount);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Fragment>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Coupon</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Fill Coupon Information
            </DialogContentText>
            <Grid
              item
              container
              justify="center"
              direction="column"
              spacing={2}
            >
              <TextField
                required
                id="outlined-textarea"
                label="Title"
                size="small"
                placeholder=" Title"
                multiline
                variant="outlined"
                onChange={event => {
                  setTitle(event.target.value);
                }}
                defaultValue={coupon.title}
              />
              <TextField
                id="outlined-textarea"
                label="Сoupon Name"
                placeholder=" Сoupon Name"
                multiline
                variant="outlined"
                onChange={event => {
                  setCouponName(event.target.value);
                }}
                defaultValue={coupon.couponName}
              />
              <TextField
                required
                id="outlined-textarea"
                label="Link"
                placeholder=" Link"
                multiline
                variant="outlined"
                onChange={event => {
                  setLink(event.target.value);
                }}
                defaultValue={coupon.link}
              />
              <TextField
                id="outlined-textarea"
                label="Discount %"
                placeholder="Discount %"
                multiline
                variant="outlined"
                onChange={event => {
                  setDiscount(event.target.value);
                }}
                defaultValue={coupon.discount}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={saveCoupon} color="primary">
              Save
            </StyledButton>
            <StyledButton onClick={onClose} color="primary">
              Cancel
            </StyledButton>
          </DialogActions>
        </Dialog>
      </Fragment>
    </MuiThemeProvider>
  );
}
