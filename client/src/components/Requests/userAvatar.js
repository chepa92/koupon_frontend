import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline',
    float: 'left',
    textTransform: 'capitalize',
  },
}));
export default function UserAvatar(props) {
  const classes = useStyles;
  const { request } = props;
  const [user, setUser] = useState({
    img: './images/userImg.png',
    userName: 'user',
    userLevel: 0,
  });

  useEffect(() => {
    api
      .getUserPub(request.publisher)
      .then(usr => {
        console.log(usr);
        setUser(usr);
      })
      .catch(err => console.log(err));

    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <Avatar
        src={user.img}
        alt="itemPhoto"
        style={{ float: 'left', marginRight: '20px' }}
      />
      <Typography className={classes.root}>{user.username}</Typography>
      <Rating name="read-only" value={user.userLevel} readOnly />
    </div>
  );
}
