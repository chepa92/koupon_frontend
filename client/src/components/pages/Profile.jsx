import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useForm, Controller } from 'react-hook-form';
import { StyledButton } from '../Theme/Button.styled';

import api from '../../api/api';
import qs from 'qs';
import {
  Switch,
  Grid,
  CardMedia,
  FormControlLabel,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 20,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    width: '100%',
    objectFit: 'scale-down',
    paddingTop: 4,
    maxWidth: '300px',
    maxHeight: '250px',
    borderRadius: '50%',
    marginLeft: '20%',
  },
  text: {
    margin: '20px 0',
  },
}));

export default function Profile(props) {
  const classes = useStyles();
  const [profile, setProfile] = useState([]);
  const id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;

  const { register, handleSubmit, errors, reset, control } = useForm();
  
  useEffect(() => {
    api
      .getUser(id)
      .then(profile => {
        setProfile(profile);
        reset({
          username: profile.username,
          telegram: profile.telegram,
          email: profile.email,
          telegram_notify: true,
        });
      })
      .catch(err => console.log(err));
  }, [reset]);



  const onSubmit = data => {
    api
      .updateUser(profile._id, data)
      .then(result => {
        console.log('SUCCESS!');
      })
      .catch(err => this.setState({ message: err.toString() }));
  };
  console.log(errors);

  return (
    <Grid container className="Profile">
      <Grid className={classes.root} spacing={3} lg={4} xs={12}></Grid>
      <Grid className={classes.root} spacing={3} lg={4} xs={12}>
        <CardMedia
          className={classes.img}
          component="img"
          alt="Profile"
          height="140"
          image={
            profile.img ? profile.img : 'https://ui-avatars.com/api/?name='
          }
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={classes.text}
            InputLabelProps={{ shrink: true }}
            fullWidth
            inputRef={register}
            label="username"
            name="username"
          />
          <TextField
            className={classes.text}
            InputLabelProps={{ shrink: true }}
            fullWidth
            inputRef={register}
            label="email"
            name="email"
          />
          <TextField
            className={classes.text}
            InputLabelProps={{ shrink: true }}
            fullWidth
            inputRef={register}
            label="telegram"
            name="telegram"
          />

          <FormControlLabel
            control={
              <Controller
                as={Switch}
                name="telegram_notify"
                control={control}
                defaultValue=""
                inputRef={register}
                onChange={() => {
                  handleSubmit({ telegram_notify: true });
                }}
              />
            }
            label="Telegram Notify"
          />
          <StyledButton type="submit">Save</StyledButton>
        </form>
      </Grid>
      <Grid className={classes.root} spacing={3} lg={4} xs={12}></Grid>
    </Grid>
  );
}
