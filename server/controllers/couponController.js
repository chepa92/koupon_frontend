const Coupon = require('../models/Coupon');
const queryString = require('query-string');
const bestBuyApi = require('../helpers/bestbuyHelper');

process.env['NTBA_FIX_319'] = 1;
const telegram = require('../helpers/telegramHelper');

const userController = require('../controllers/userController');
//some function that publicRouter use;

module.exports = {
  async getAll(req, res, next) {
    Coupon.find()
      .then(coupons => {
        res.json(coupons);
      })
      .catch(err => next(err));
  },

  async getCoupon(req, res, next) {
    const id = req.query.id;
    const result = await Coupon.findOne({ _id: id });

    if (result) res.json(result);
    else res.status(404).send('error: Coupon not found');
  },

  async searchCoupons(req, res, next) {
    const text = req.query.text;
    const category = req.query.category;

    const result = await Coupon.find({
      $or: [
        { categories: { category: { name: { $in: [category, text] } } } },
        { brand: { $in: [text, category] } },
        { title: { $in: [text, category] } },
        { couponName: { $in: [text, category] } },
      ],
    });

    if (result) res.json(result);
    else res.status(404).send('error: Coupon not found');
  },

  async updateCoupon(req, res, next) {
    const id = req.query.id;
    const body = req.body;
    const result = await Coupon.updateOne({ _id: id }, body);
    if (result.ok) {
      res.json({ response: 'done' });
    } else {
      res.status(404).send('{error: "Coupon not found"}');
    }
  },

  async addCoupon(req, res, next) {
    let {
      title,
      couponName,
      discount,
      link,
      categories,
      brand,
      publisher = req.user._id,
      publisherImg = req.user.img,
      imgUrl,
      skuId = queryString.parseUrl(link).query.skuId,
      active = true,
    } = req.body;

    Coupon.create({
      title,
      couponName,
      discount,
      link,
      categories,
      brand,
      publisher,
      publisherImg,
      imgUrl,
      active,
      skuId,
    })
      .then(coupons => {
        userController.addCoupontoUser(coupons._id, req.user._id);
        notifyNewCoupon(coupons);
        res.json({
          success: true,
          coupons,
        });
      })
      .catch(err => next(err));
  },

  async deleteCoupon(req, res, next) {
    const id = req.query.id;

    const result = await Coupon.deleteOne({ _id: id });

    if (result.deletedCount) {
      res.json({ response: 'Coupon deleted' });
    } else {
      res.status(404).send('{error: "no Coupon found"}');
    }
  },

  async disableCoupon(req, res, next) {
    const id = req.query.id;

    const result = await Coupon.updateOne(
      { _id: id },
      { $set: { active: false } }
    )
      .then(coupons => {
        res.json({
          success: true,
        });
      })
      .catch(err => next(err));
  },

  async likeCoupon(req, res, next) {
    const id = req.query.id;
    const result = await Coupon.updateOne(
      { _id: id },
      { $addToSet: { like: { user_id: req.user._id } } }
    )
      .then(coupons => {
        res.json({
          success: true,
        });
      })
      .catch(err => next(err));
  },

  async commentCoupon(req, res, next) {
    const id = req.query.id;
    const body = req.body;

    const result = await Coupon.updateOne(
      { _id: id },
      {
        $addToSet: {
          comments: {
            user_id: req.user._id,
            comment: body.comment,
            date: new Date(),
          },
        },
      }
    )
      .then(coupons => {
        res.json({
          success: true,
        });
      })
      .catch(err => next(err));
  },

  async notifyCoupon(req, res, next) {
    const id = req.query.id;
    //telegram.sendMessage(req);
    const result = await Coupon.updateOne(
      { _id: id },
      {
        $addToSet: {
          notify: {
            user_id: req.user._id,
          },
        },
      }
    )
      .then(coupons => {
        res.json({
          success: true,
        });
      })
      .catch(err => next(err));
  },

  async priceHistory(req, res, next) {
    const id = req.query.id;
    const coupon = await Coupon.findOne({ _id: id });
    if (coupon) {
      bestBuyApi
        .getBestPrice(coupon.skuId)
        .then(data => {
          const result = addPriceToHistory(id, data, coupon);
          res.json(data);
        })
        .catch(err => console.log(err));
    } else {
      res.status(404).send('{error: "Coupon not found"}');
    }
  },
};

//finding lowest price existing
async function addPriceToHistory(id, data, coupon) {
  const result = await Coupon.updateOne(
    { _id: id },
    {
      $set: { imgUrl: data.images[0].href },
      $addToSet: {
        priceHistory: {
          price: data.salePrice,
          date: new Date( //to avoid duplicate prices from the same day
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          ),
        },
      },
    }
  ).catch(err => {
    console.log(err);
  });
}

async function notifyNewCoupon(coupon) {
  let users = await userController.notifyUsers();
  const img_url = coupon.imgUrl;
  users.forEach(user => {
    telegram.sendMessage(
      user,
      img_url,
      `New Coupon Added: ${coupon.title} \nLink: ${coupon.link} \nDiscount: ${coupon.discount}`
    );
  });
}
