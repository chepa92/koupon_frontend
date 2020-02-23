import React, { Fragment, useState } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../Theme/newTheme';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  TextField,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import { StyledButton } from '../Theme/Button.styled';
import api from '../../api/api';

export default function EditDialog(props) {
  const { open, onClose, onChange } = props;
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');
  const [discount, setDiscount] = useState('');
  // const [open, setOpenForm] = useState(false);

  // const handleOpenForm = () => {
  //   setOpenForm(true);
  // };
  // const handleClose = () => {
  //   setOpenForm(false);
  // };
  const saveCoupon = event => {
    event.preventDefault();
    console.log(title, desc, link, discount);
    onChange(title, desc, link, discount);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Fragment>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create New Coupon</DialogTitle>
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
                id="outlined-textarea"
                label="Title"
                size="small"
                placeholder=" Title"
                multiline
                variant="outlined"
                onChange={event => {
                  console.log(event.target.value);
                  setTitle(event.target.value);
                  console.log(title);
                }}
                value={title}
              />
              <TextField
                id="outlined-textarea"
                label="Description"
                placeholder=" Description"
                multiline
                variant="outlined"
                onChange={event => {
                  console.log(event.target.value);
                  setDesc(event.target.value);
                  console.log(desc);
                }}
                value={desc}
              />
              <TextField
                id="outlined-textarea"
                label="Link"
                placeholder=" Link"
                multiline
                variant="outlined"
                onChange={event => {
                  console.log(event.target.value);
                  setLink(event.target.value);
                  console.log(link);
                }}
                value={link}
              />
              <TextField
                id="outlined-textarea"
                label="Discount %"
                placeholder="Discount %"
                multiline
                variant="outlined"
                onChange={event => {
                  console.log(event.target.value);
                  setDiscount(event.target.value);
                  console.log(discount);
                }}
                value={discount}
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
