import React, { useState } from 'react';
import api from '../../api/api';
import { TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../Theme/newTheme';
import { StyledButton } from '../Theme/Button.styled';

export default function Login(props) {
  const { onSubmitC } = props;
  const [error, setError] = useState('');
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    api
      .login(data.username, data.password)
      .then(result => {
        onSubmitC();
        console.log('SUCCESS!');
      })
      .catch(err => {
        setError(err);
        console.log(error);
        console.log(errors);
      });
  };

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
