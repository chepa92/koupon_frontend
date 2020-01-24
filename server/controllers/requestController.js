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

  async addReqst(req, res, next) {
    // console.log(publisherId);
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

}