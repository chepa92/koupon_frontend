import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../Theme/newTheme';
import api from '../../api/api';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Comment from '../Comment/Comment';
import {
  List,
  Button,
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
    margin: '10px 0',
    backgroundColor: '#f9e7f6',
    borderRadius: '25px',
  },

  commentText: {
    color: 'black',
    fontSize: '0.95rem',
  },
  avatar: {
    marginTop: '6px',
  },
}));

export default function CommentsList(props) {
  const { index } = props;
  const classes = useStyles();
  const [limit, setLimit] = useState(5);
  const [newComment, setComment] = useState('');
  const [comments, setComments] = useState(null);
  // eslint-disable-next-line
  const [coupon, setCoupon] = useState(null);
  const [edit, setedit] = useState(true);

  useEffect(() => {
    api
      .getCoupon(index)
      .then(coupon => {
        setCoupon(coupon);
        setComments(coupon.comments);
      })
      .catch(err => console.log(err));
    setedit(false);
    // eslint-disable-next-line
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
        date: new Date(),
      },
    ]);
    setedit(true);
    setComment('');
  };

  const renderEachComment = (item, i) => {
    return <Comment comments={item} key={i} />;
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
            size="large"
            placeholder="Write a comment..."
            multiline
            variant="outlined"
            onChange={event => {
              setComment(event.target.value);
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
