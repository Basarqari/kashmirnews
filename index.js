const request = require('request');
const express = require('express');
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const app = express();
app.set('port', process.env.PORT || 3001);

app.get('*', (req, res) => {
  cache.get('news', function(err, data) {
    if(!err && data == null) {
      getLatestNews(res);
    } else {
      massageData(data, res);
    }
  });
});

function getLatestNews(res) {
  request.post('http://www.risingkashmir.com/Home/get_newsUpdates', (err, r, body) => {
    cache.set('news', body, (err, success) => {
      if(!err && success) {
        massageData(body, res);
      }
    });
  });
}

function massageData(raw, res) {
  var json = JSON.parse(raw);
  var data = json.result.reduce((acc, story) => {
    var date = /\((.*?)\)/.exec(story.publishing_date)[1]
    var s = `
    <li>
    <h3><a href=http://www.risingkashmir.com/news/${story.news_url}>${story.title}</a></h3>
    <p>${story.news_content}</p>
    </li>
    `;
    acc += s;
    return acc;
  }, "")
  var html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Latest news from RK</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
* {
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  color: #333;
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  margin-bottom: 2rem;
}

body {
  max-width: 40rem;
  margin: auto;
  padding: 1rem;
}
    </style>
  </head>
  <body>
    <ul>${data}</ul>
  </body>
</html>
  `;
  res.send(html);
}

app.listen(app.get('port'));
