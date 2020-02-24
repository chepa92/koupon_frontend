import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../Theme/newTheme';
import api from '../../api/api';
import { StyledButton } from '../Theme/Button.styled';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {
  List,
  ListItem,
  Button,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  TextField,
  IconButton,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
  },
  inline: {
    display: 'inline',
  },
  comment: {
    borderStyle: 'solid',
    borderColor: '#bb57a9',
    margin: '10px 0',
    border: '0.5px',
  },
}));

export default function CommentsList(props) {
  const { index } = props;
  const classes = useStyles();
  const [limit, setLimit] = useState(5);
  const [newComment, setComment] = useState('');
  const [comments, setComments] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const [edit, setedit] = useState(true);

  useEffect(() => {
    api
      .getCoupon(index)
      .then(coupon => {
        console.log(coupon);
        setCoupon(coupon);
        setComments(coupon.comments);
      })
      .catch(err => console.log(err));
    setedit(false);
  }, [edit]);

  const showMore = () => {
    setLimit(prevState => prevState + 5);
    setedit(true);
  };

  const saveComment = () => {
    console.log(newComment);
    var body = {
      comment: newComment,
    };
    try {
      api.commentCoupon(index, body).then(response => console.log(response));
    } catch (err) {
      console.log('error fetching...:', err);
    }
    setComments(prevState => [
      ...prevState,
      {
        comment: newComment,
        img: api.getLocalStorageUser().img,
        userName: api.getLocalStorageUser.userName,
        date: new Date(),
      },
    ]);
    setedit(true);
    setComment('');
  };

  const renderEachComment = (item, i) => {
    return (
      <ListItem
        key={item.date}
        alignItems="flex-start"
        className={classes.comment}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={item.img} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography component="span" variant="body2" color="textPrimary">
              {item.userName}
            </Typography>
          }
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                {item.comment}
              </Typography>
              <Typography component="span" variant="body2" color="textPrimary">
                -- {new Date(item.date).toUTCString().slice(0, 16)}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    );
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Typography variant="subtitle1">Comments</Typography>
      <List className={classes.root}>
        {comments ? (
          comments
            .map(renderEachComment)
            .reverse()
            .slice(0, limit)
        ) : (
          <div></div>
        )}
      </List>

      <Button size="small" onClick={showMore}>
        {' '}
        show more
      </Button>
      {api.isLoggedIn() && (
        <div>
          <TextField
            id="outlined-textarea"
            label=""
            size="small"
            placeholder="Write a comment..."
            multiline
            variant="outlined"
            onChange={event => {
              console.log(event.target.value);
              setComment(event.target.value);
              console.log('comment:  ' + newComment);
            }}
            value={newComment}
          />
          <IconButton
            onClick={saveComment}
            style={{ height: 38, marginTop: 9 }}
          >
            <CheckCircleIcon fontSize="large" />
          </IconButton>
        </div>
      )}
    </MuiThemeProvider>
  );
}
