import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const StyledButton = withStyles(theme => ({
  root: {
    margin: '10px 5px 10px 5px',
    fontSize: '12px',
    lineHeight: '25px',
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.common.white,
    background: 'linear-gradient(179.58deg, #FD749B -13.56%, #281AC8 158.3%)',
    borderRadius: '20px ',
  },
}))(Button);

export { StyledButton };
