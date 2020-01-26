const Coupon = require('../models/Coupon');
const querystring = require('query-string');
const mongoose = require('mongoose');

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
        { categories: { $in: [category, text] } },
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

    console.log(id);
    console.log(body);

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
      active,
    })
      .then(coupons => {
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
    const comment = req.query.comment;

    const result = await Coupon.updateOne(
      { _id: id },
      {
        $addToSet: {
          comments: {
            user_id: req.user._id,
            comment: comment,
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
    const priceArr = [];
    const coupon = await Coupon.findOne(
      { _id: id },
      { _id: 0, title: 1, categories: 1, brand: 1 }
    );
    const couponName = coupon.title;
    const categoryId = coupon.categories[0].id;
    const brand = coupon.brand;

    console.log(couponName);
    console.log(brand);

    await bestBuyApi
      .getBestPrice(categoryId, brand, couponName)
      .then(data => {
        let i = 0;
        data.products.forEach(element => {
          console.log(element.salePrice);
          priceArr[i++] = element.salePrice;
          Coupon.updateOne(
            { _id: id },
            {
              $addToSet: {
                priceHistory: {
                  price: element.salePrice,
                  url: element.url,
                  date: new Date(),
                },
              },
            }
          );
        });
        console.log(priceArr[0]);
        res.json(data);
      })
      .catch(err => next(err));

    // priceArr.forEach(element => {
    //   Coupon.updateOne(
    //     { _id: id },
    //     {
    //       $addToSet: {
    //         priceHistory: {
    //           price: element,
    //           date: new Date(),
    //         },
    //       },
    //     }
    //   )
    //     .then(coupons => {
    //       res.json({
    //         success: true,
    //       });
    //     })
    //     .catch(err => next(err));
    // });
  },
};

async function notifyNewCoupon(coupon) {
  let users = await userController.notifyUsers();
  console.log(coupon);
  users.forEach(user => {
    telegram.sendMessage(
      user,
      `New Coupon Added: ${coupon.title} \nLink: ${coupon.link} \nDiscount: ${coupon.discount}`
    );
  });
}
