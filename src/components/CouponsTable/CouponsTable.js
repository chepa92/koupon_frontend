import React from 'react';
import MaterialTable from 'material-table'; //https://material-table.com/
import { Redirect } from 'react-router-dom';
import api from '../../api/api';

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
      clicked: id,
    }));
  }

  render() {
    return (
      <div style={{ maxWidth: '100%' }}>
        {this.state.clicked && (
          <Redirect
            to={{
              pathname: '/coupon',
              search: '?id=' + this.state.clicked,
            }}
          />
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
                  alt="itemss"
                />
              ),
            },
            { title: 'Id', field: '_id' },
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              api
                .getCoupons()
                .then(result => {
                  resolve({
                    data: result,
                    page: 1,
                    totalCount: 100,
                  });
                })
                .catch(err => console.log(err));
            })
          }
          actions={[
            rowData => ({
              icon: 'edit',
              tooltip: 'Edit Coupon',
              onClick: (event, rowData) => {
                this.handleClick(rowData._id);
              },
            }),
          ]}
          editable={{
            onRowDelete: rowData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  api.deleteCoupon(rowData._id);
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
