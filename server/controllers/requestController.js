const Request = require('../models/Request');

module.exports = {
    async getAll(req, res, next){
        Request.find().then(requests => {
            res.json(requests);
        })
        .catch(err => next(err));
    },
    
  async getReqst(req, res, next) {
    const id = req.query.id;
   
    const result = await Request.findOne({ _id: id });

    if (result) res.json(result);
    else res.status(404).send('error: Request not found');
  },

  async updateReqst(req, res, next) {
    const id = req.query.id;
    const body = req.body;

    console.log(id);
    console.log(body);

    const result = await Request.updateOne({ _id: id }, body);

    if (result.ok) {
      res.json({ response: 'Done!' });
    } else {
      res.status(404).send('{error: "Request not found"}');
    }
  },

  async deleteReqst(req, res, next) {
    const id = req.query.id;

    const result = await Request.deleteOne({ _id: id });

    if (result.deletedCount) {
      res.json({ response: 'Request deleted' });
    } else {
      res.status(404).send('{error: "no Request found"}');
    }
  },

  async addReqst(req, res, next) {
    let {
      title,
      requestSummery,
      categories,
      brand,
      publisher = req.user._id,
      
    } = req.body;
    Request.create({
      title,
      requestSummery,
      categories,
      brand,
      publisher,
    
    })
      .then(requests => {
        res.json({
          success: true,
          requests,
        });
      })
      .catch(err => next(err));
  },
  
  async closeReqst(req, res, next) {
    const id = req.query.id;

    const result = await Request.updateOne(
      { _id: id },
      { $set: { status: 'Closed' } }
    )
      .then(coupons => {
        res.json({
          success: true,
        });
      })
      .catch(err => next(err));
  },

}