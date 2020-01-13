const express = require('express');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();

const Permission = require('../models/Permission');

router.get('/secret', isLoggedIn, (req, res, next) => {
  res.json({
    secret: 4242421111,
    user: req.user,
  });
});

router.get('/permissions', async (req, res, next) => {
  Permission.find()
    .then(permisions => {
      res.json(permisions);
    })
    .catch(err => next(err));
});

router.post('/permissions', isLoggedIn, (req, res, next) => {
  let { role, path } = req.body;
  Permission.create({ role, path })
    .then(permisions => {
      res.json({
        success: true,
        permisions,
      });
    })
    .catch(err => next(err));
});

module.exports = router;
