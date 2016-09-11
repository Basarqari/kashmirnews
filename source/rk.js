const fetch = require('isomorphic-fetch');

function getRK() {
  return fetch('http://www.risingkashmir.com/home/get_newsupdates', {
    method: 'POST'
  })
  .then(response => response.json())
  .then(response => {
    if(response == null) {
      return { source: 'RK', data: [{title: 'No news updates found', url: '#'}] };
    }
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
