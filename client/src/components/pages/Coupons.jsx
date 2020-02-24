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
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        await api.getCoupons().then(coupons => setCoupons(coupons));
      } catch (err) {
        console.log('error fetching...:', err);
      }
      setEdit(false);
    }
    fetchData();
  }, [edit]);
  const showMore = () => {
    setLimit(prevState => prevState + 8);
    setEdit(true);
  };

  const renderEachCoupon = (item, i) => {
    return (
      <div key={`container${item._id}`}>
        <CouponCard index={item._id} coupon={item}></CouponCard>
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
      <Grid item container justify="center">
        <Button size="small" onClick={showMore}>
          {' '}
          show more
        </Button>
      </Grid>
    </Grid>
  );
}
