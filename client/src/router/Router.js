import React from 'react';
import Header from '../components/Header/Header';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';

import Home from '../components/pages/Home';
import Coupons from '../components/pages/Coupons';
import Coupon from '../components/pages/Coupon';
import AddCoupon from '../components/pages/AddCoupon';
import Secret from '../components/pages/Secret';
import Login from '../components/pages/Login';
import Signup from '../components/pages/Signup';
import Admin from '../components/pages/Admin';
import MyCoupons from '../components/pages/Coupons';
import UserProfile from '../components/pages/Profile';
// import Settings from '../components/pages/Setings';

const styles = {
  root: {
    backgroundColor: 'white',
    minHeight: '100vh',
  },
};

const ReactRouter = props => {
  const { classes } = props;

  return (
    <React.Fragment className={classes.root}>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/coupons" component={Coupons} />
        <Route path="/myCoupons" component={MyCoupons} />
        <Route path="/coupon" component={Coupon} />
        <Route path="/add-coupon" component={AddCoupon} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/myProfile" component={UserProfile} />
        {/* <Route path="/sttings" component={} /> */}
        <Route path="/secret" component={Secret} />
        <Route path="/admin" component={Admin} />
        <Route render={() => <h2>404</h2>} />
      </Switch>
    </React.Fragment>
  );
};

ReactRouter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReactRouter);
