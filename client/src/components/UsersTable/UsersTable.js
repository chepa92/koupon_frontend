import React, { Component } from 'react';
import MaterialTable from 'material-table'; //https://material-table.com/
import { Redirect } from 'react-router-dom';
import api from '../../api/api';

class UsersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
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
              pathname: '/profile',
              search: '?id=' + this.state.clicked,
            }}
          />
        )}
        <MaterialTable
          columns={[
            {
              title: 'Image',
              field: 'img',
              render: rowData => (
                <img
                  style={{ height: 36, borderRadius: '50%' }}
                  src={rowData.img}
                />
              ),
            },
            { title: 'Username', field: 'username' },
            { title: 'Email', field: 'email' },
            { title: 'Admin', field: 'admin' },
            { title: 'Telegram Notifications', field: 'telegram_notify' },
            { title: 'Created', field: 'created_at' },
            { title: 'Active', field: 'active' },
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              api
                .getAllUsers()
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
              tooltip: 'Edit User',
              onClick: (event, rowData) => {
                this.handleClick(rowData._id);
              },
            }),
          ]}
          editable={{
            onRowDelete: rowData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    api.suspendUser(rowData._id);
                  }
                  resolve();
                }, 1000);
              }),
          }}
          options={{
            actionsColumnIndex: -1,
          }}
          title="Users"
        />
      </div>
    );
  }
}

export default UsersTable;
