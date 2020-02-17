import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header/Header';
import PropTypes from 'prop-types';

const styles = {
  root: {
    backgroundColor: 'white',
    minHeight: '100vh',
  },
};
const App = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Header />
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
