import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './Header.styled';
import { withStyles } from '@material-ui/core/styles';
import MainMenu from '../Menu/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormDialog from '../Forms/addCoupon';
import Login from '../Login/Login';
import {
  Button,
  IconButton,
  InputBase,
  Avatar,
  Box,
  AppBar,
  Toolbar,
} from '@material-ui/core';

import api from '../../api/api';

function Header(props) {
  const { classes } = props;
  const [anchorel, setAnchorEl] = useState(null);
  const [anchorElL, setAnchorElL] = useState(null);
  const open = Boolean(anchorel);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleLogoutClick(e) {
    api.logout();
  }

  const handleClickL = event => {
    setAnchorElL(event.currentTarget);
  };
  const handleCloseL = () => {
    setAnchorElL(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.logo}>
            <NavLink to="/" exact>
              <img src="/images/logo2.png" alt="logo" style={{ height: 50 , marginTop: 10}} />
            </NavLink>
          </div>

          <Box className={classes.search}>
            <div className={classes.innerBox}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  input: classes.inputInput,
                  root: classes.inputRoot,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Box>
          <FormDialog />

          <Button size="small" style={{ marginLeft: 10 }}>
            {!api.isLoggedIn() && (
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClickL}
              >
                Login
              </Button>
            )}
            {api.isLoggedIn() && (
              <NavLink to="/">{api.getLocalStorageUser().username}</NavLink>
            )}
          </Button>
          <IconButton
            aria-controls="fade-menu"
            aria-haspopup="true"
            onClick={handleClick}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <Avatar alt="Remy Sharp" src="/broken-image.jpg" />
          </IconButton>
          <MainMenu
            open={open}
            anchorel={anchorel}
            keepMounted
            onClose={handleClose}
            onLogout={handleLogoutClick}
          />

          <Menu
            id="simple-menu"
            anchorEl={anchorElL}
            keepMounted
            open={Boolean(anchorElL)}
            onClose={handleCloseL}
          >
            <Login onSubmitC={handleCloseL} />
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(Header);
