const NodeCache = require("node-cache");
const cache = new NodeCache({stdTTL: 100, checkperiod: 300});
const getNews = require('./getNews');

exports.cacheGet = function(store) {
  return new Promise((resolve, reject) => {
    cache.get('news', (err, data) => {
      if(err) {
        reject(err);
      } else {
        if (typeof body === 'undefined') {
          resolve(getNews(cache, cacheSet));
        }
        resolve(data);
      }
    })
  })
};

function cacheSet(store, data) {
  return new Promise((resolve, reject) => {
    cache.set(store, data, (err, success) => {
      if(err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
};
