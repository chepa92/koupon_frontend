import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import api from '../../api/api';
import { StyledMenu, StyledMenuItem } from './Menu.styled';
import theme from '../Theme/newTheme';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import QueueIcon from '@material-ui/icons/Queue';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

export default function MainMenu(props) {
  const { onClose, onLogout, anchorel } = props;

  const onClickClose = () => onClose();
  const onLogoutClick = e => {
    onLogout(e);
    onClose();
  };

  return (
    <MuiThemeProvider theme={theme}>
      <StyledMenu
        id="customized-menu"
        anchorel={anchorel}
        keepMounted
        open={Boolean(anchorel)}
        onClose={onClickClose}
      >
        <img src="/images/logo2.png" alt="logo" style={{ width: 150 , marginTop: 10, marginLeft: 50}} />
        {!api.isAdmin() && (
          <StyledMenuItem component={Link} to="/coupons" onClick={onClickClose}>
            <QueueIcon />
            Coupons
          </StyledMenuItem>
        )}
        {api.isAdmin() && (
          <StyledMenuItem component={Link} to="/admin/coupons" onClick={onClickClose}>
            <QueueIcon />
            Manage Coupons
          </StyledMenuItem>
        )}
        {api.isAdmin() && (
          <StyledMenuItem
            component={Link}
            to="/admin/users"
            onClick={onClickClose}
          >
            <PersonIcon />
            Manage Users
          </StyledMenuItem>
        )}
        {api.isLoggedIn() && (
          <StyledMenuItem
            component={Link}
            to="/myprofile"
            onClick={onClickClose}
          >
            <PersonIcon />
            My Profile
          </StyledMenuItem>
        )}
        <StyledMenuItem component={Link} to="/requests" onClick={onClickClose}>
          <ForumIcon />
          Requests
        </StyledMenuItem>
        {!api.isAdmin() && (
          <StyledMenuItem component={Link} to="/coupons" onClick={onClickClose}>
            <QueueIcon />
            My Coupons
          </StyledMenuItem>
        )}
        <StyledMenuItem component={Link} to="/" onClick={onClickClose}>
          <SettingsIcon />
          Settings
        </StyledMenuItem>
        {api.isLoggedIn() && (
          <StyledMenuItem>
            <PowerSettingsNewIcon />
            <NavLink style={{marginLeft: 15}}
              to="/"
              onClick={e => {
                onLogoutClick(e);
              }}
            >
              Logout
            </NavLink>
          </StyledMenuItem>
        )}
      </StyledMenu>
    </MuiThemeProvider>
  );
}
