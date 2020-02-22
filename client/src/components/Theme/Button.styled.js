import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
// import theme from '../Theme/newTheme'

const StyledButton = withStyles(theme => ({
  root: {
    width: '30%',
    margin: '15px',
    fontSize: '14px',
    lineHeight: '25px',
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.common.white,
    background: 'linear-gradient(179.58deg, #FD749B -13.56%, #281AC8 158.3%)',
    borderRadius: '20px ',

    // '&:focus': {
    //   background: theme.palette.primary.mainGradient,
    //   borderRadius: '0px 20px 20px 0px',
    //   color: theme.palette.common.white + '!important',
    //   '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
    //     color: theme.palette.common.white,
    //   },
    // },
  },
  // selected: {
  //   background: theme.palette.primary.mainGradient,
  //   borderRadius: '0px 20px 20px 0px',
  //   color: theme.palette.common.white + '!important',
  // },
}))(Button);

export { StyledButton };
