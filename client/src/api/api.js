import axios from 'axios';

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://koupon.chepa.net/api'
      : 'http://localhost:5001/api',
  withCredentials: true,
});

const errHandler = err => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error('API response', err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,

  // This method is synchronous and returns true or false
  // To know if the user is connected, we just check if we have a value for localStorage.getItem('user')
  isLoggedIn() {
    return localStorage.getItem('user') != null;
  },

  isAdmin() {
    let status = false;
    if (localStorage.getItem('user') != null) {
      status = JSON.parse(localStorage.getItem('user')).admin;
    }
    return status;
  },

  // This method returns the user from the localStorage
  // Be careful, the value is the one when the user logged in for the last time
  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem('user'));
  },

  // This method signs up and logs in the user
  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  login(username, password) {
    return service
      .post('/login', {
        username,
        password,
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    localStorage.removeItem('user');
    return service.get('/logout');
  },

  getCoupons() {
    return service
      .get('/coupon/getAllCoupons')
      .then(res => res.data)
      .catch(errHandler);
  },

  getCoupon(id) {
    return service
      .get('/coupon/getCoupon?id=' + id)
      .then(res => res.data)
      .catch(errHandler);
  },

  addCoupon(body) {
    return service
      .post('/coupon/addCoupon', body)
      .then(res => res.data)
      .catch(errHandler);
  },

  deleteCoupon(id) {
    return service
      .delete('/coupon/deleteCoupon?id=' + id)
      .then(res => res.data)
      .catch(errHandler);
  },

  updateCupon(id, body) {
    return service
      .put('/coupon/updateCoupon?id=' + id, body)
      .then(res => res.data)
      .catch(errHandler);
  },


  updateUser(id, body) {
    return service
      .put('/user/updateUser?id=' + id, body)
      .then(res => res.data)
      .catch(errHandler);
  },

  likeCoupon(id) {
    return service
      .post('/coupon/likeCoupon?id=' + id)
      .then(res => res.data)
      .catch(errHandler);
  },

  commentCoupon(id, body) {
    return service
      .post('/coupon/commentCoupon?id=' + id, body)
      .then(res => res.data)
      .catch(errHandler);
  },

  couponPriceHistory(id) {
    return service
      .get('/coupon/priceHistory?id=' + id)
      .then(res => res.data)
      .catch(errHandler);
  },

  couponNotify(id) {
    return service
      .post('/coupon/notifyCoupon?id=' + id)
      .then(res => res.data)
      .catch(errHandler);
  },

  // Users Functions

  getAllUsers() {
    return service
      .get('/user/getAllUsers')
      .then(res => res.data)
      .catch(errHandler);
  },

  getUser(id) {
    return service
      .get('/user/getUser?id=' + id)
      .then(res => res.data)
      .catch(errHandler);
  },

  getSecret() {
    return service
      .get('/secret')
      .then(res => res.data)
      .catch(errHandler);
  },

  addPicture(file) {
    const formData = new FormData();
    formData.append('picture', file);
    return service
      .post('/endpoint/to/add/a/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler);
  },
};
