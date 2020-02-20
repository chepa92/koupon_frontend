import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from 'material-table'; //https://material-table.com/
import { withStyles } from '@material-ui/core/styles';
import { Router, Switch, Route, Link, Redirect, useHistory  } from 'react-router-dom';
import api from '../../api/api';
import Delete from '@material-ui/icons/Delete';

class CouponsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coupons: [],
      clicked: false,
    };
  }

  handleClick(id) {
    this.setState(state => ({
      clicked: id
    }));
  }


  render() {

    return (
      <div style={{ maxWidth: '100%' }}>
        {this.state.clicked && (
         <Redirect to={{
          pathname: '/coupon',
          search: '?id='+this.state.clicked,
        }} />
        )}
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
            rowData => ({
              icon: 'edit',
              tooltip: 'Edit Coupon',
              onClick: (event, rowData) => {
                this.handleClick(rowData._id)
              },
            }),
          ]}
          editable={{
            // onRowAdd: newData =>
            //   new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //       {
            //         const data = this.state.data;
            //         data.push(newData);
            //         this.setState({ data }, () => resolve());
            //       }
            //       resolve();
            //     }, 1000);
            //   }),

            onRowDelete: rowData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    api.deleteCoupon(rowData._id);
                  }
                  resolve();
                }, 1000);
              }),
          }}
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
