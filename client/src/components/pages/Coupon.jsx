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
  comments: {
    margin: '30px 60px',
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
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={6}>
          <Grid container justify="flex-end" spacing={spacing}>
            <Grid item>
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
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <CouponPage index={id} coupon={coupon} />
        </Grid>
        <Grid item container justify="center">
          <Grid item className={classes.comments}>
            <CommentsList index={id} />
          </Grid>
          <Grid
            style={{ width: 400, height: 350 }}
            className={classes.comments}
          >
            <LineExample index={id} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
