const GK = require('./source/gk');
const RK = require('./source/rk');


function getNews(cache, cacheSet) {
  return Promise.all([RK, GK])
    .then(body => cacheSet(cache, body))
    .catch(err => console.log(err));
}

module.exports = getNews;
