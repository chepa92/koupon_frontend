const axios = require('axios');
const service = axios.create();
const apiKey = process.env.BEST_BUY_TOKEN;

const errHandler = err => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error('API response', err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

module.exports = {
  service: service,

  async getBestPrice(categoryId, brand, couponName, res) {
    const words = couponName.split(' ');
    console.log(words);

    try {
      return (data = await axios
        .get(
          `https://api.bestbuy.com/v1/products((search=${brand}&search=${words[1]}&search=${words[2]})&onSale=true&(categoryPath.id=${categoryId}))?apiKey=${apiKey}&sort=name.asc&show=name,url,salePrice,regularPrice,percentSavings,onlineAvailability&facet=bestSellingRank&pageSize=10&format=json`
        )
        .then(response => {
          // handle success
          console.log(response.data.products[0]);
          return response.data;
        })
        .catch(error => {
          // handle error
          console.log(error);
          return err;
        }));
    } catch (error) {
      console.error(error);
    }
  },
  async getItem() {
    try {
      const response = await axios
        .get(
          `https://api.bestbuy.com/v1/products((search=mavic&search=mini&search=combo))?apiKey=${apiKey}&sort=regularPrice.asc&show=salePrice,regularPrice,sku,name&format=json`
        )
        .then(function(response) {
          // handle success
          console.log(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(() => {
          //always run after function
        });
    } catch (error) {
      console.error(error);
    }
  },
};
