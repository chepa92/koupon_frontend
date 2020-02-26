const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const nocache = require('nocache');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const authRouter = require('./routes/authRouter');
const couponRouter = require('./routes/couponRouter');
const requestRouter = require('./routes/requestRouter');
const userRouter = require('./routes/userRouter');

require('./configs/database');

const app_name = require('./package.json').name;
const debug = require('debug')(
  `${app_name}:${path.basename(__filename).split('.')[0]}`
);

const { isLoggedIn, isAdmin, isPermitted } = require('./middlewares');

const app = express();

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'https://koupon-9fccd.firebaseapp.com'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.header('Access-Control-Allow-Credentials', true);
  res.set('Content-Type', 'application/json');
  next();
});

app.use(nocache());

// app.use(
//   cors({
//     origin: (origin, cb) => {
//       cb(null, origin && origin.startsWith('http://localhost:') && origin.startsWith('https://koupon-9fccd.firebaseapp.com/'));
//     },
//     optionsSuccessStatus: 200,
//     credentials: true,
//   })
// );

var whitelist = [
  'http://localhost:3000',
  'https://koupon-9fccd.firebaseapp.com',
  'https://chepa.net',
];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
};

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'irongenerator',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
require('./passport')(app);

app.use('/api', authRouter); //auth

//app.use(isPermitted);
app.use('/api/request', isPermitted, requestRouter);
app.use('/api/coupon', isPermitted, couponRouter);
app.use('/api/user', isPermitted, userRouter);

app.use('/api', require('./routes/index')); //demo

app.use('/api/*', (req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* serve static files after compilation */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use((err, req, res, next) => {
  console.error('----- An error happened -----');
  console.error(err);

  if (!res.headersSent) {
    res.status(err.status || 500);

    if (process.env.NODE_ENV === 'production') res.json(err);
    else
      res.json(
        JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)))
      );
  }
});

module.exports = app;
