// import React, { Component } from 'react';
// import {Line} from 'react-chartjs-2';

// export class LineChart extends Component {

//   render() {
//     console.log(defaults);
//     const {datasets,height} = this.props;
//     const data = {
//       labels: ['label1', 'label2', 'label3', 'label4', 'label5',
//                  'label6','label7','label8','label9','label10','label11','label12'],
//       datasets:datasets
//     };
//     const options = {
//           plugins: {
//             datalabels: {
//                 display: true,
//                 color: '#FFF',
//                 borderRadius:10,
//                 backgroundColor: function(context) {
//                 return context.dataset.backgroundColor;
//                 },
//                 align	: 'center',
//                 textAlign:'center',
//                 font: {
//                    weight: 'bold'
//                 },
//             }}
//       }
//      return (
//           <Line options={options} data={data} height={height} />
//      );
//    }
//  }

//  export default LineChart;

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
// import 'chartjs-plugin-datalabels';
// import './style.css';

defaults.global.defaultColor = 'yourColor';
defaults.global.defaultFontColor = '#bdbdbd';
defaults.global.defaultFontFamily = 'Poppins, sans-serif';

const options = {
  plugins: {
    datalabels: {
      display: true,
      color: '#FFF',
      borderRadius: 10,
      backgroundColor: function(context) {
        return context.dataset.backgroundColor;
      },
      align: 'center',
      textAlign: 'center',
      font: { size: '12px', weight: 'bold' },
    },
  },
};

const MyLineGraph = ({ data }) => {
  return (
    <div>
      <Line options={options} data={data}></Line>
    </div>
  );
};
export default MyLineGraph;
