import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../Theme/newTheme';
import api from '../../api/api';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
  },
  inline: {
    display: 'inline',
  },
  comment: {
    margin: '10px 0',
    backgroundColor: '#f9e7f6',
    borderRadius: '25px',
    height: '100px',
  },

  commentText: {
    color: 'black',
    fontSize: '0.95rem',
  },
  commentUser: {
    color: 'black',
    fontSize: '0.80rem',
    textTransform: 'capitalize',
  },
  avatar: {
    marginTop: '6px',
  },
}));

export default function Comment(props) {
  const { comments } = props;
  const classes = useStyles();
  const [user, setUser] = useState({
    img: './images/userImg.png',
    userName: 'user',
  });

  useEffect(() => {
    api
      .getUserPub(comments.user_id)
      .then(usr => {
        setUser(usr);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <ListItem
        key={comments.date}
        alignItems="flex-start"
        className={classes.comment}
      >
        <ListItemAvatar className={classes.avatar}>
          <Avatar alt="Remy Sharp" src={user.img} />
        </ListItemAvatar>
        <ListItemText>
          <Typography
            display="block"
            className={classes.commentUser}
            component="span"
            variant="body2"
            color="textPrimary"
          >
            {user.username}
          </Typography>

          <Typography
            className={classes.commentText}
            component="span"
            variant="body2"
            color="textPrimary"
          >
            {comments.comment}
          </Typography>

          <Typography
            display="block"
            align="right"
            component="span"
            variant="body2"
            color="textSecondary"
          >
            {new Date(comments.date).toUTCString().slice(0, 16)}
          </Typography>
        </ListItemText>
      </ListItem>
    </MuiThemeProvider>
  );
}
