import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, List, Grid } from '@material-ui/core';
import CouponCard from '../Coupon/Coupon';
import api from '../../api/api';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Coupons(props) {
  const classes = useStyles();
  const [limit, setLimit] = useState(15);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        await api.getCoupons().then(coupons => setCoupons(coupons));
      } catch (err) {
        console.log('error fetching...:', err);
      }
    }
    fetchData();
  }, []);

  // const handleClickAway = () => {
  //   setExpanded(false);
  // };

  const renderEachCoupon = (item, i) => {
    return (
      <div key={`container${item._id}`}>
        <CouponCard
          index={item._id}
          coupon={item}
          // expanded={expanded}
          // onChange={updateCoupon}
          // onDelete={deleteCoupon}
        ></CouponCard>
      </div>
    );
  };

  return (
    <Grid container className="Coupons">
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {coupons.map(renderEachCoupon).slice(0, limit)}
          </Grid>
        </Grid>
      </Grid>
      {/* <Button id="showMoreBtn" variant="text" onClick={loadMore}>
        Show More
      </Button> */}

      {/* {coupons.map(c => (
        <li key={c._id}>{c.title}</li>
      ))} */}
    </Grid>
  );
}
