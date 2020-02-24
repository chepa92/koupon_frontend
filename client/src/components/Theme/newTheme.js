import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FD749B',
      mainGradient:
        'linear-gradient(179.58deg, #FD749B -13.56%, #281AC8 158.3%)', // Linear gradient for selected background.
      redGradient:
        'linear-gradient(179.58deg, #FD749B -13.56%, #281AC8 158.3%)',
      greenDradient: 'linear-gradient(180deg, #85D536 22.4%, #1C602B 100%)',
    },
    secondary: { main: '#FD749B' },
    common: {
      white: '#fff',
    },
  },
  overrides: {
    MuiIconButton: {
      root: {
        cursor: 'pointer',
        color: '#ffff',
        background:
          'linear-gradient(179.58deg, #FD749B -13.56%, #281AC8 158.3%)',
        padding: 0.3,
        marginRight: 20,
        marginLeft: 20,
      },
    },
    MuiButtonBase: {
      root: {
        margin: 0,
      },
    },
    // MuiButton: {
    //   root: {
    //     fontWeight: 'bold',
    //     backgroundColor:
    //       'linear-gradient(179.58deg, #FD749B -13.56%, #281AC8 158.3%)',
    //     margin: '10px',
    //     '&:hover': {
    //       backgroundColor: 'green',
    //     },
    //   },
    // },
    MuiTypography: {
      body: {
        fontFamily: 'Poppins, sans-serif',
      },
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
    MuiDialog: {
      paper: {
        width: 350,
        height: 450,
      },
    },
    MuiDialogContent: {
      root: {
        margin: 'auto',
      },
    },

    MuiTypography: {
      root: {
        fontFamily: 'Poppins, sans-serif',
      },
      h6: {
        fontFamily: 'Poppins, sans-serif',
      },

      body2: {
        fontFamily: 'Poppins, sans-serif',
      },
      subtitle1: {
        fontFamily: 'Poppins, sans-serif',
      },
    },
    MuiDialogContentText: {
      root: {
        fontFamily: 'Poppins, sans-serif',
      },
    },
    MuiOutlinedInput: {
      multiline: {
        width: 230,
        margin: 8,
        padding: 12,
      },
      root: {
        borderRadius: 20,
        color: 'rgba(142, 68, 173, 1)',
      },
    },
    MuiFormLabel: {
      root: {
        color: 'rgba(142, 68, 173, 1)',
        fontFamily: 'Poppins, sans-serif',
        paddind: 5,
      },
    },
    MuiInputBase: {
      root: {
        fontFamily: 'Poppins, sans-serif',
        color: '#FD749B',
      },
      input: {
        fontFamily: 'Poppins, sans-serif',
      },
      outlined: {
        color: '#FD749B',
        fontFamily: 'Poppins, sans-serif',
      },
    },

    MuiButton: {
      root: {
        fontFamily: 'Poppins, sans-serif',
        padding: 10,
      },

      // Name of the rule
      text: {
        // Some CSS
        // background: 'linear-gradient(45deg, #FD749B 30%, #281AC8 90%)',
        // borderRadius: 3,
        // color: 'white',
      },
      label: {
        fontFamily: 'Poppins, sans-serif',
      },
    },
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;
