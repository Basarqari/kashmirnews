const fetch = require('isomorphic-fetch');

function getRK() {
  return fetch('http://www.risingkashmir.com/home/get_newsupdates', {
    method: 'POST'
  })
  .then(response => response.json())
  .then(response => {
    return response.result.reduce((acc, story) => {
      let temp = {};
      temp.title = story.title;
      temp.url = story.news_url;
      temp.content = story.news_content;

      acc.data.push(temp);

      return acc;
    }, { source: 'RK', data: [] });
  })
}

module.exports = getRK();
