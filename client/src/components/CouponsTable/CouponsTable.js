import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from 'material-table'; //https://material-table.com/
import { withStyles } from '@material-ui/core/styles';
import { Router, Switch, Route } from 'react-router-dom';

class CouponsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coupons: [],
    };
  }

  render() {
    return (
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Title', field: 'title' },
            { title: 'Coupon Name', field: 'couponName' },
            { title: 'Publisher', field: 'publisher' },
            { title: 'Active', field: 'active' },
            {
              title: 'Image',
              field: 'imgUrl',
              render: rowData => (
                <img
                  style={{ height: 36, borderRadius: '50%' }}
                  src={rowData.imgUrl}
                />
              ),
            },
            { title: 'Id', field: '_id' },
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              let url = 'http://localhost:5001/api/coupon/getAllCoupons';
              fetch(url)
                .then(response => response.json())
                .then(result => {
                  resolve({
                    data: result,
                    page: 1,
                    totalCount: 100,
                  });
                });
            })
          }
          actions={[
            {
              icon: 'delete',
              tooltip: 'Delete Coupon',
              onClick: (event, rowData) => {
                console.log(rowData._id);
              },
            },
            rowData => ({
              icon: 'edit',
              tooltip: 'Edit Coupon',
              onClick: (event, rowData) => {
                console.log(rowData._id);
              },
            }),
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
          title="Coupons"
        />
      </div>
    );
  }
}

export default CouponsTable;
