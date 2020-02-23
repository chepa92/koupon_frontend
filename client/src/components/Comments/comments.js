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
  Grid,
  Paper,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 20,
  },
  inline: {
    display: 'inline',
  },
}));

export default function CommentsList(props) {
  const { index } = props;
  const classes = useStyles();
  const [limit, setLimit] = useState(5);
  const [comment, setComment] = useState('');
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
  }, []);

  const showMore = () => {
    setLimit(prevState => prevState + 5);
    setedit(true);
  };

  const saveComment = () => {
    var body = {
      comment: comment,
      userImg: api.getLocalStorageUser().img,
      userName: api.getLocalStorageUser.userName,
    };
    try {
      api.commentCoupon(index, body).then(response => console.log(response));
    } catch (err) {
      console.log('error fetching...:', err);
    }
    setComments(prevState => [
      {
        comment: comment,
        userImg: api.getLocalStorageUser().img,
        userName: api.getLocalStorageUser.userName,
        date: new Date(),
      },
      ...prevState,
    ]);
    setedit(true);
  };

  const renderEachComment = (item, i) => {
    return (
      <ListItem key={item.date} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={item.userImg} />
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
                --{new Date(item.date).toUTCString()}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    );
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Grid container justify="flex-end" spacing={2}>
        <Paper className={classes.root}>
          <Grid item>
            <Grid item>
              <Typography variant="subtitle1">Comments</Typography>
            </Grid>
            <List className={classes.root}>
              {comments ? (
                comments.map(renderEachComment).slice(0, limit)
              ) : (
                <div></div>
              )}
            </List>
            <Grid item container justify="flex-end">
              <Button size="small" onClick={showMore}>
                {' '}
                show more
              </Button>
            </Grid>
            <Grid item container justify="center" direction="row" spacing={2}>
              <TextField
                id="outlined-textarea"
                label="Comment"
                size="small"
                placeholder=" Write a comment..."
                multiline
                variant="outlined"
                onChange={event => {
                  console.log(event.target.value);
                  setComment(event.target.value);
                  console.log(comment);
                }}
                value={comment}
              />
              <StyledButton onClick={saveComment} color="primary">
                <CheckCircleIcon />
              </StyledButton>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </MuiThemeProvider>
  );
}
