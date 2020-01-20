const User = require('../models/User');


module.exports = {
   async getAll(req, res, next){
        User.find().then(users => {
            res.json(users);
        })
        .catch(err => next(err));
    },
    async getUser(req, res, next){
        const id = req.query.id;
        console.log(id);
        const result = await User.findOne({ _id: id });
    
        if (result) res.json(result);
        else res.status(404).send('error: Coupon not found');
    },

    async updateUser(req, res, next){
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

    async addUser(req, res, next){
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
          })
            .then(users => {
              res.json({
                success: true,
                users,
              });
            })
            .catch(err => next(err));
    },
 


};