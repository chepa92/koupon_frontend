import { fade } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    fontFamily: 'Poppins, sans-serif',
    flexGrow: 1,
    color: 'rgba(0, 0, 0, 0.20 )',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  logo: {
    backgroundImage: '',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: '40px',
    'background-image':
      'linear-gradient(179.58deg, #FD749B -13.56%, #281AC8 158.3%)',
    'box-sizing': 'border-box',
    display: 'block',
    margin: '0 auto',
    padding: '2px',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  innerBox: {
    background: ' #fff',
    'border-radius': '40px',
    height: '100%',
    transition: 'background .5s ease',
    width: '100%',
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(0, 0, 0, 0.20 )',
  },
  inputRoot: {
    color: 'rgba(0, 0, 0, 0.40 )',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

export { useStyles };
