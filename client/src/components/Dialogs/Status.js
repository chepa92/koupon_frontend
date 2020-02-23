import React, { Fragment, useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../Theme/newTheme';
import { Router, NavLink } from 'react-router-dom';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  DialogTitle,
  Box,
} from '@material-ui/core';
import { StyledButton } from '../Theme/Button.styled';
import api from '../../api/api';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 350,
    flexGrow: 1,
    margin: 'auto',
  },
}));

export default function StatusDialog(props) {
  const classes = useStyles;
  const { open, status, onClose } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <Fragment>
        <Dialog
          className={classes.root}
          open={open}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <img
              src="/images/done.png"
              alt="done"
              style={{ width: 160, height: 120 }}
            />
          </DialogContent>

          <DialogTitle id="form-dialog-title">{status}</DialogTitle>
          <DialogActions>
            <StyledButton onClick={onClose} color="primary">
              Ok
            </StyledButton>
          </DialogActions>
        </Dialog>
      </Fragment>
    </MuiThemeProvider>
  );
}
