import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FD749B',
      mainGradient:
        'linear-gradient(179.58deg, #FD749B -13.56%, #281AC8 158.3%)', // Linear gradient for selected background.
    },
    secondary: { main: '#FD749B' },
    common: {
      white: '#fff',
    },
  },
  overrides: {
    MuiTypography: {
      body2: {
        fontFamily: 'Poppins, sans-serif',
      },
    },
    'Mui-selected': {
      backgroundColor:
        'linear-gradient(179.58deg, #FD749B -13.56%, #281AC8 158.3%)',
    },
    MuiMenuItem: {
      root: {
        '&$selected': {
          backgroundColor:
            'linear-gradient(179.58deg, #FD749B -13.56%, #281AC8 158.3%)',
        },
      },
    },
    // Name of the component ⚛️ / style sheet
    MuiButton: {
      root: {
        fontFamily: 'Poppins, sans-serif',
      },
      // Name of the rule
      text: {
        // Some CSS
        background: 'linear-gradient(45deg, #FD749B 30%, #281AC8 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
      label: {
        fontFamily: 'Poppins, sans-serif',
      },
    },
  },
  typography: { useNextVariants: true },
});

export default theme;
