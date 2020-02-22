import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import qs from 'qs';

export default function Coupon(props) {
  const [coupon, setCoupon] = useState([]);
  var id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;
  console.log(id);

  useEffect(() => {
    async function fetchData() {
      try {
        await api.getCoupon(id).then(coupon => setCoupon(coupon));
      } catch (err) {
        console.log('error fetching...:', err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="Coupon">
      <h2>The coupon is:</h2>
      <li key={coupon._id}>{coupon.title}</li>
    </div>
  );
}
