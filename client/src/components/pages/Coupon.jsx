import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CouponPage from '../Coupon/CouponPage';
import CommentsList from '../Comments/comments';
import axios from 'axios';
import LineExample from '../Chart/Graph';

import api from '../../api/api';
import qs from 'qs';
import { Grid, CardMedia } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
    maxHeight: '250px',
  },
  comments: {
    margin: '30px 60px',
  },
  gridpadL: {
    padding: '3% 5% 0 10% !important',

  },
  gridpadR: {
    padding: '3% 0% 0 5% !important',

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
    <Grid container className="Coupon">
      <Grid item xs={12} lg={6} className={classes.gridpadL}>
        <CardMedia
          className={classes.img}
          component="img"
          alt="Coupon"
          image={
            coupon.imgUrl
              ? coupon.imgUrl
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTCWnEg-zPrA6JZIXqfN7vxCdSWgORuP3b3jycKv1_3oZYODAeF'
          }
        />
      </Grid>
      <Grid item xs={12} lg={6} className={classes.gridpadR}>
        <CouponPage index={id} coupon={coupon} />
      </Grid>
      <Grid item xs={12} lg={6} className={classes.gridpadL}>
        <CommentsList index={id} />
      </Grid>
      <Grid item xs={12} lg={6} className={classes.gridpadR}>
        <LineExample index={id} />
      </Grid>
    </Grid>
  );
}
