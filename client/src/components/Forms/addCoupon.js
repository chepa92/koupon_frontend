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
  DialogTitle,
} from '@material-ui/core';
import { StyledButton } from '../Theme/Button.styled';
import api from '../../api/api';

export default function FormDialog(props) {
  // const { open } = props;
  const [open, setOpenForm] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
  };
  const handleClose = () => {
    setOpenForm(false);
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
          <DialogTitle id="form-dialog-title">Create New Coupon</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Fill Coupon Information
            </DialogContentText>
            <form></form>
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={handleClose} color="primary">
              Add
            </StyledButton>
            <StyledButton onClick={handleClose} color="primary">
              Cancel
            </StyledButton>
          </DialogActions>
        </Dialog>
      </Fragment>
    </MuiThemeProvider>
  );
}
