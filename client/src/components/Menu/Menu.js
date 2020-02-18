import React from 'react';
import { NavLink } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Fade } from '@material-ui/core';
import api from '../../api/api';
import { StyledMenu, StyledMenuItem } from './Menu.styled';
import theme from '../Theme/newTheme';
import DashboardIcon from '@material-ui/icons/Dashboard'; //Exported Icons
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import QueueIcon from '@material-ui/icons/Queue';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

export default function MainMenu(props) {
  const { open, onClose, onLogout, anchorEl } = props;

  const onClickClose = () => onClose();
  const onLogoutClick = e => {
    onLogout(e);
    onClose();
  };

  return (
    <MuiThemeProvider theme={theme}>
      <StyledMenu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={onClickClose}
        TransitionComponent={Fade}
      >
        <StyledMenuItem onClick={onClickClose}>
          <DashboardIcon />
          Coupons
        </StyledMenuItem>
        <StyledMenuItem onClick={onClickClose}>
          <PersonIcon />
          My Profile
        </StyledMenuItem>
        <StyledMenuItem onClick={onClickClose}>
          <ForumIcon />
          Requests
        </StyledMenuItem>
        <StyledMenuItem onClick={onClickClose}>
          <QueueIcon />
          My Coupons
        </StyledMenuItem>
        <StyledMenuItem onClick={onClickClose}>
          <SettingsIcon />
          Settings
        </StyledMenuItem>
        {api.isLoggedIn() && (
          <StyledMenuItem>
            <PowerSettingsNewIcon />
            <NavLink
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
