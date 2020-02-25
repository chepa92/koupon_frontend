import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';
import CouponCard from '../Coupon/Coupon';
import api from '../../api/api';

export default function Coupons(props) {
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
    return <CouponCard index={item._id} coupon={item} key={item._id}></CouponCard>;
  };

  return (
    <Grid container className="Coupons">
      {coupons.map(renderEachCoupon).slice(0, limit)}
      <Button size="small" onClick={showMore}>
        {' '}
        show more
      </Button>
    </Grid>
  );
}
