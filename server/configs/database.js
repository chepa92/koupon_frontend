const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || `'mongodb://localhost/'`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
    res.status(500).send(err.message);
  });
