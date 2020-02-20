import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    width: 280,
    height: '100%',
  },
})(props => (
  <Drawer
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'left',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'right',
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
      color: theme.palette.common.white + '!important',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
  selected: {
    background: theme.palette.primary.mainGradient,
    borderRadius: '0px 20px 20px 0px',
    color: theme.palette.common.white + '!important',
  },
}))(MenuItem);

export { StyledMenu, StyledMenuItem };
