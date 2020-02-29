import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../../api/api';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../Theme/newTheme';
import { defaults } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';

defaults.global.defaultFontFamily = 'Poppins, sans-serif';

const options = {
  plugins: {
    datalabels: {
      display: true,
      borderRadius: 10,
      backgroundColor: function(context) {
        return context.dataset.backgroundColor;
      },
      align: 'center',
      textAlign: 'center',
      font: {
        weight: 'bold',
      },
    },
  },
  maintainAspectRatio: false,
  responsive: true,
};

const LineExample = props => {
  const { index } = props;
  const [coupon, setCoupon] = useState(null);
  useEffect(() => {
    api
      .couponPriceHistory(index)
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));

    api
      .getCoupon(index)
      .then(coupon => {
        setCoupon(coupon);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, []);

  var data = {
    labels:
      coupon && coupon.priceHistory
        ? coupon.priceHistory.map(item =>
            new Date(item.date).toUTCString().slice(0, 11)
          )
        : ['No prices available'],
    datasets: [
      {
        label: 'Item Price',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(142, 68, 173, 1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#FD749B',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#FD749B',
        pointHoverBorderColor: '#FD749B',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: coupon ? coupon.priceHistory.map(item => item.price) : [],
      },
    ],
  };
  return (
    <MuiThemeProvider theme={theme}>
      <div
        className="flex flex-col items-center w-full max-w-md"
        style={{ width: '400px', height: '250px' }}
      >
        <Typography variant="subtitle1">Prices history</Typography>
        <Line data={data} options={options} />
      </div>
    </MuiThemeProvider>
  );
};

export default LineExample;
