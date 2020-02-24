import React, { Fragment, useState } from 'react';
import api from '../../api/api';
import Menu from '@material-ui/core/Menu';
import { TextField, Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../Theme/newTheme';
import { StyledButton } from '../Theme/Button.styled';

export default function Login(props) {
  const { onSubmitC } = props;
  const [open, setOpenForm] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    api
      .login(data.username, data.password)
      .then(result => {
        onSubmitC();
        console.log('SUCCESS!');
      })
      .catch(err => setError(err));
  };
  console.log(errors);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  // handleClick(e) {
  //   e.preventDefault();
  //   api
  //     .login(this.state.username, this.state.password)
  //     .then(result => {
  //       console.log('SUCCESS!');
  //       this.props.history.push('/'); // Redirect to the home page
  //     })
  //     .catch(err => this.setState({ message: err.toString() }));
  // }

  return (
    <MuiThemeProvider theme={theme}>
      <div className="Login">
        <form className="form_login" onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          <TextField
            fullWidth
            inputRef={register}
            label="Username"
            name="username"
          />
          <TextField
            fullWidth
            inputRef={register}
            label="Password"
            name="password"
          />
          <StyledButton type="submit">Login</StyledButton>
        </form>
        {error && <div className="info info-danger">{error}</div>}
      </div>
    </MuiThemeProvider>
  );
}
