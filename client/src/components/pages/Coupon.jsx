import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { EditIcon, DeleteIcon } from '@material-ui/icons';
import CouponPage from '../Coupon/CouponPage';
import CommentsList from '../Comments/comments';
import axios from 'axios';

import api from '../../api/api';
import qs from 'qs';
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
  paper: {
    // height: 140,
    width: 350,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    width: '100%',
    objectFit: 'contain',
    paddingTop: 4,
    maxWidth: '300px',
    maxHeight: '250px',
  },
}));

export default function Coupon(props) {
  const classes = useStyles();
  const [spacing, setSpacing] = useState(2);
  const [comments, setComments] = useState([]);
  const [coupon, setCoupon] = useState([]);
  var id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;

  useEffect(() => {
    api
      .getCoupon(id)
      .then(coupon => {
        console.log(coupon);
        setCoupon(coupon);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    // <div className="Coupon">
    //   <h2>The coupon is:</h2>
    //   <li key={coupon._id}>{coupon.title}</li>
    // </div>
    <Grid container className="Coupon">
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={6}>
          <Grid container justify="flex-end" spacing={spacing}>
            <Grid item>
              {/* <Paper className={classes.paper}> */}
              <CardMedia
                className={classes.img}
                component="img"
                alt="Coupon"
                height="140"
                image={
                  coupon.imgUrl
                    ? coupon.imgUrl
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTCWnEg-zPrA6JZIXqfN7vxCdSWgORuP3b3jycKv1_3oZYODAeF'
                }
              />
              {/* </Paper> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <CouponPage index={id} coupon={coupon} />
        </Grid>
        <Grid item xs={6}>
          <CommentsList index={id} />
        </Grid>
      </Grid>
    </Grid>
  );
}
