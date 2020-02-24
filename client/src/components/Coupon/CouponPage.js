import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../api/api';
import StatusDialog from '../Dialogs/Status';
import { useHistory } from 'react-router-dom';
import EditiDialog from '../Dialogs/editCoupon';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import { StyledButton } from '../Theme/Button.styled';

import {
  IconButton,
  Typography,
  Grid,
  CardMedia,
  Container,
  Paper,
  Avatar,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 20,
  },
}));

export default function CouponPage(props) {
  const { coupon, index } = props;
  const classes = useStyles();
  let history = useHistory();
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [bestPrice, setBestPrice] = useState('not available');
  const [show, setShow] = useState(false);
  // const [coupon, setCoupon] = useState();

  useEffect(() => {
    if (coupon.priceHistory) {
      if (coupon.priceHistory[0] != undefined) {
        var newPrice = coupon.priceHistory.reduce(
          (min, p) => (p.price < min ? p.price : min),
          coupon.priceHistory[0].price
        );
        console.log(newPrice);
        setBestPrice(newPrice + '$');
        setShow(true);
      }
    }
  }, [coupon]);

  const handleDelete = () => {
    console.log(api.getLocalStorageUser()._id);
    console.log(coupon.publisher);
    setOpen(true);
    setStatus('Deleted coupon succesfully');
    try {
      api.deleteCoupon(index).then(response => console.log(response));
    } catch (err) {
      console.log('error fetching...:', err);
    }
  };
  const handleCloseDelete = () => {
    setOpen(false);
    history.goBack();
  };
  const handleClose = () => {
    setEdit(false);
    setOpen(false);
  };
  const handleEdit = () => {
    setEdit(true);
  };
  const saveCoupon = (title, desc, link, discount) => {
    var body = {
      title: title,
      couponName: desc,
      discount: discount,
      link: link,
      publisherImg: api.getLocalStorageUser().img,
    };
    try {
      api.updateCupon(index, body).then(response => console.log(response));
      setStatus('All changes were saved');
      setOpen(true);
    } catch (err) {
      console.log('error fetching...:', err);
      setStatus('Something is wrong... try again');
      setOpen(true);
    }
  };

  const addAlert = () => {
    try {
      api.couponNotify(index).then(response => console.log(response));
      setStatus(
        'Alert was created, you will be notified when we find a better price.'
      );
      setOpen(true);
    } catch (err) {
      console.log('error fetching...:', err);
      setStatus('Something is wrong... try again');
      setOpen(true);
    }
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item>
        <Avatar src={coupon.publisherImg} alt="/images/userImg.png"></Avatar>
      </Grid>
      <Grid item xs container spacing={2}>
        <Grid item>
          <Grid item>
            <Typography variant="subtitle1">{coupon.title}</Typography>
          </Grid>

          <Typography variant="body2" gutterBottom>
            {coupon.couponName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Discount: {coupon.discount}
          </Typography>
        </Grid>
      </Grid>

      {/* {api.getLocalStorageUser()._id === coupon.publisher ||
        (api.isAdmin() && ( */}
      {api.isLoggedIn() && (
        <Grid item xs={3}>
          <IconButton onClick={handleEdit} style={{ cursor: 'pointer' }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} style={{ cursor: 'pointer' }}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      )}

      <Grid item container>
        <StyledButton href={coupon.link} target="_blank">
          Go
        </StyledButton>
      </Grid>
      {!api.isLoggedIn() && <Typography>Sign in to see best price</Typography>}
      {api.isLoggedIn() && (
        <Grid item container>
          <Typography>
            Best price
            <StyledButton
              href={coupon.bestLink ? coupon.bestLink : '#'}
              target="_blank"
            >
              {bestPrice}
            </StyledButton>
          </Typography>
          <IconButton onClick={addAlert}>
            <AddAlertIcon />
          </IconButton>
        </Grid>
      )}
      <StatusDialog open={open} status={status} onClose={handleClose} />
      <EditiDialog open={edit} onChange={saveCoupon} onClose={handleClose} />
    </Grid>
  );
}
