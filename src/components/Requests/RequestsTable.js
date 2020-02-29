import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import UserAvatar from './UserAvatar';
import { Redirect } from 'react-router-dom';

import api from '../../api/api';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 40,
    // margin: '30px 25px 10px 0px',
    // minWidth: 289,
    // maxWidth: 289,
  },
}));

export default function RequestsTable() {
  const classes = useStyles();
  const [clicked, setClicked] = useState(null);

  return (
    <div className={classes.root}>
      {clicked && (
        <Redirect
          to={{
            pathname: '/coupon',
            search: '?id=' + clicked,
          }}
        />
      )}
      <MaterialTable
        columns={[
          {
            title: 'Requested By',
            render: rowData => <UserAvatar request={rowData} />,
          },
          { title: 'Request', field: 'requestSummery' },
          { title: 'Brand', field: 'brand' },
          { title: 'Status', field: 'status' },
        ]}
        data={query =>
          new Promise((resolve, reject) => {
            api
              .getRequests()
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
        editable={{
          onRowDelete: rowData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                api.closeRequest(rowData._id);
                resolve();
              }, 1000);
            }),
        }}
        options={{
          actionsColumnIndex: -1,
        }}
        title="Requests Board"
      />
    </div>
  );
}
