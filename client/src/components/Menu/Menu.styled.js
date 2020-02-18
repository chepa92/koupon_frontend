import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    width: 280,
    height: '100%',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    fontSize: '14px',
    lineHeight: '30px',
    marginTop: 10,
    marginRight: 15,
    paddingLeft: 50,
    fontFamily: 'Poppins, sans-serif',
    color: '#bdbdbd',
    '&:focus': {
      background: theme.palette.primary.mainGradient,
      borderRadius: '0px 20px 20px 0px',
      color: theme.palette.common.white,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export { StyledMenu, StyledMenuItem };
