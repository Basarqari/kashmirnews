const fetch = require('isomorphic-fetch');
const cheerio = require('cheerio');


function getGK() {
  var store = {
    source: 'GK',
    data: []
  };

  return fetch("http://www.greaterkashmir.com/")
  .then(res => res.text())
  .then(res => {
    let $ = cheerio.load(res);
    let news = $('.latestNews').first().find('.Latesthead a');
    $(news).each((i, elem) => {
      var data = {
        title: $(elem).text().trim(),
        url: $(elem).attr('href'),
        content: null
      }
      store.data.push(data);
    })

    return store;
  })
}

module.exports = getGK();
