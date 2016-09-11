const express = require('express');
const GK = require('./gk');
const RK = require('./rk');
const compression = require('compression');
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 100, checkperiod: 300 });

const app = express();
app.use(compression());
app.set('port', process.env.PORT || 3001);

app.get('*', (req, res) => {
  cache.get('news', function(err, data) {
    if(err || typeof data === "undefined") {
      getNews(res)
    } else {
      body = prepareHTML(createTabs(data));
      res.send(body);
    }
  });
});


function getNews(res) {
  return Promise.all([RK, GK])
  .then(body => {
    cache.set('news', body, (err, success) => {
      if(!err && success) {
        data = prepareHTML(createTabs(body));
        res.send(data);
      }
    });
  })
  .catch(err => console.log(err));
}

function createTabs(tabs) {
  return tabs.reduce((acc, story) => {
    var tab = createTab(story);
    var checked = story.source === "RK" ? "checked" : ""
    var a = `
    <div class="tab">
      <input type="radio" id="tab__${story.source}" name="news" class="radio" ${checked} />
      <label for="tab__${story.source}" class="label label__${story.source}">${story.source}</label>
      <ul class="tab-list ${story.source}">
        ${tab}
      </ul>
    </div>
    `
    acc += a;
    return acc;
  }, '')
};

function createTab(story) {
  return story.data.reduce((acc, item) => {
    var url = story.source === "RK" ? "http://www.risingkashmir.com/news/" : "http://www.greaterkashmir.com";
    var content = item.content ? `<p>${item.content}</p>` : "";
    var s = `
    <li>
    <h3><a href=${url}${item.url}>${item.title}</a></h3>
      ${content}
    </li>
    `;
    acc += s;

    return acc;
  }, '');
}

function prepareHTML(tabs) {
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
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #F9FCFE;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
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

  .tab-list {
    display: none;
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
  }

  .label {
    background: #f4f7f9;
    border: 1px solid #e5e8ea;
    color: #97a2aa;
    display: block;
    font-size: 1.25rem;
    padding: 10px;
    text-align: center;
  }

  .radio:checked + .label {
    background: #f9fcfe;
    border-bottom: none;
    color: #396a86;
  }

  .label__RK {
    border-right: none;
    border-top-left-radius: 5px;
  }

  .label__GK {
    border-top-right-radius: 5px;
  }

  input:checked + label + .tab-list {
    display: block;
  }

  .radio {
    display: none;
  }
  .news {
    position: relative;
  }
  .tab {
    width: 50%;
    float: left;
  }
  </style>
  </head>
  <body>
  <div class="news">${tabs}</div>
  </body>
  </html>
  `;

  return html;
}

app.listen(app.get('port'));
