import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../../api/api';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../Theme/newTheme';
import { defaults } from 'react-chartjs-2';

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
  }, []);

  var data = {
    labels: coupon
      ? coupon.priceHistory.map(item =>
          new Date(item.date).toUTCString().slice(0, 11)
        )
      : [],
    datasets: [
      {
        label: 'Coupon Price ',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(142, 68, 173, 1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: coupon ? coupon.priceHistory.map(item => item.price) : [],
      },
    ],
  };
  return (
    <MuiThemeProvider theme={theme}>
      <div className="flex flex-col items-center w-full max-w-md">
        <h4>Prices </h4>
        <Line data={data} options={options} />
      </div>
    </MuiThemeProvider>
  );
};

export default LineExample;
