const User = require('../models/User');

module.exports = {
  async getAll(req, res, next) {
    User.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => next(err));
  },

  async getUser(req, res, next) {
    const id = req.query.id;
    console.log(id);
    const result = await User.findOne({ _id: id });

    if (result) res.json(result);
    else res.status(404).send('error: User not found');
  },

  async getUserPub(req, res, next) {
    const id = req.query.id;
    console.log(id);
    const result = await User.findOne({ _id: id });

    if (result) {
      res.json({
        id: result._id,
        username: result.username,
        img: result.img,
        userLevel: result.userLevel,
      });
    } else res.status(404).send('error: User not found');
  },

  async updateUser(req, res, next) {
    const id = req.query.id;
    const body = req.body;

    console.log(id);
    console.log(body);

    const result = await User.updateOne({ _id: id }, body);

    if (result.ok) {
      res.json({ response: 'done' });
    } else {
      res.status(404).send('{error: "Coupon not found"}');
    }
  },

  async addUser(req, res, next) {
    let {
      admin,
      username,
      password,
      email,
      age,
      gender,
      img,
      starsLevel,
    } = req.body;
    User.create({
      admin,
      username,
      password,
      email,
      age,
      gender,
      img,
      starsLevel,
      active,
    })
      .then(users => {
        res.json({
          success: true,
          users,
        });
      })
      .catch(err => next(err));
  },

  async suspendUser(req, res, next) {
    const id = req.query.id;

    const result = await User.updateOne(
      { _id: id },
      { $set: { active: false } }
    )
      .then(users => {
        res.json({
          success: true,
          users,
        });
      })
      .catch(err => next(err));
  },

  async deleteUser(req, res, next) {
    const id = req.query.id;

    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount) {
      res.json({ response: 'User deleted' });
    } else {
      res.status(404).send('{error: "no user found"}');
    }
  },

  async getUser(req, res, next) {
    const id = req.query.id;
    console.log(id);
    const result = await User.findOne({ _id: id });

    if (result) res.json(result);
    else res.status(404).send('error: Coupon not found');
  },

  async notifyUsers() {
    const result = await User.find({ telegram_notify: true });
    console.log(result);

    if (result) return result;
    else console.log('error: No result');
  },

  async addCoupontoUser(couponId, id) {
    console.log(`user id: ${id} coupon ${couponId}`);
    const result = await User.updateOne(
      { _id: id },
      {
        $addToSet: {
          postedCoupons: couponId,
        },
      }
    );
    //TODO user ranking func

    console.log(result);

    if (result) return result;
    else console.log('error: Faild adding coupon to user coupon list.');
  },
};
