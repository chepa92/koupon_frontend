import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../api/api';
import StatusDialog from '../Dialogs/Status';
import EditiDialog from '../Dialogs/editCoupon';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import LikeIcon from '@material-ui/icons/ThumbUp';
import { StyledButton } from '../Theme/Button.styled';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import { IconButton, Typography, Grid, Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 20,
  },
}));

export default function CouponPage(props) {
  const { coupon, index } = props;
  const classes = useStyles();
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [bestPrice, setBestPrice] = useState('not available');
  // const [coupon, setCoupon] = useState();

  useEffect(() => {
    if (coupon.priceHistory) {
      if (coupon.priceHistory[0] !== undefined) {
        var newPrice = coupon.priceHistory.reduce(
          (min, p) => (p.price < min ? p.price : min),
          coupon.priceHistory[0].price
        );
        setBestPrice(newPrice + '$');
      }
    }
  }, [coupon]);

  const handleDelete = () => {
    setOpen(true);
    setStatus('Deleted coupon succesfully');
    try {
      api.deleteCoupon(index).then(response => console.log(response));
    } catch (err) {
      console.log('error fetching...:', err);
    }
  };
  const handleClose = () => {
    setEdit(false);
    setOpen(false);
  };
  const handleEdit = () => {
    setEdit(true);
  };
  const saveCoupon = (title, couponName, link, discount) => {
    var body = {
      title: title,
      couponName: couponName,
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
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12} lg={6}>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              src={coupon.publisherImg}
              alt="/images/userImg.png"
            ></Avatar>
          </ListItemAvatar>
          <ListItemText primary={coupon.title} secondary={coupon.couponName} />
        </ListItem>
      </Grid>

      {api.isLoggedIn() && (
        <Grid item xs={12} lg={6} justify="center">
          <IconButton
            onClick={() => {
              api.likeCoupon(coupon._id);
            }}
          >
            <LikeIcon />
          </IconButton>
          <IconButton onClick={addAlert}>
            <AddAlertIcon />
          </IconButton>
          <IconButton onClick={handleEdit} style={{ cursor: 'pointer' }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} style={{ cursor: 'pointer' }}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      )}

      <Grid item container>
        <Typography>
          Best price was
          <StyledButton
            style={{ marginLeft: '50px' }}
            href={coupon.link ? coupon.link : '#'}
            target="_blank"
          >
            <h2>{bestPrice}</h2>
          </StyledButton>
        </Typography>
      </Grid>
      <Grid item container>
        <Typography>Discount: {coupon.discount}</Typography>
      </Grid>
      <StatusDialog open={open} status={status} onClose={handleClose} />
      <EditiDialog
        coupon={coupon}
        open={edit}
        onChange={saveCoupon}
        onClose={handleClose}
      />
    </Grid>
  );
}
