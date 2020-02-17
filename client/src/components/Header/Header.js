import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './HeaderStyles';
import { withStyles } from '@material-ui/core/styles';

import {
  Button,
  IconButton,
  Fade,
  InputBase,
  Menu,
  MenuItem,
  Avatar,
  Box,
  AppBar,
  Toolbar,
} from '@material-ui/core';

import api from '../../api/api';

const Header = props => {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleLogoutClick(e) {
    api.logout();
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.logo}>
            <NavLink to="/" exact>
              <img src="/images/logo2.png" alt="logo" style={{ height: 50 }} />
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
          <Button size="small" style={{ marginLeft: 10 }}>
            {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
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
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>Coupons</MenuItem>
            <MenuItem onClick={handleClose}>My Profile</MenuItem>
            <MenuItem onClick={handleClose}>Requests</MenuItem>
            <MenuItem onClick={handleClose}>My Coupons</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            {api.isLoggedIn() && (
              <Link to="/" onClick={e => handleLogoutClick(e)}>
                Logout
              </Link>
            )}
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(Header);
