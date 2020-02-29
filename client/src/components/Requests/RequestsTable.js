import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import UserAvatar from '../Requests/userAvatar';
import FormDialog from '../Dialogs/addCoupon';
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
  const [open, setOpen] = useState(false);

  // useEffect(()=>{
  //   function getImg(){
  //     new Promise((resolve, reject) => {
  //       api
  //         .getUser(rowData.publisher)
  //         .then(result => {
  //           console.log(result);
  //           setImg(result.img);
  //           resolve({});
  //         })
  //         .catch(err => console.log(err));
  //     })
  //   }
  // })

  function handleClick(rowData) {
    if (rowData.couponRelated) {
      setClicked(rowData.couponRelated);
    }
    setOpen(true);
  }

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
