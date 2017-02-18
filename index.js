const express = require('express');
const compression = require('compression');
const { cacheGet } = require('./cachePromised');
const container = require('./components/container');

const app = express();
app.use(compression());
app.set('port', process.env.PORT || 3001);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/all', (req, res) => {
  cacheGet('news')
    .then((news) => res.json(news))
})

app.get('*', (req, res) => {
  cacheGet('news')
    .then(body => container(body))
    .then(body => res.send(body))
    .catch(err => console.log(err));
});

app.listen(app.get('port'));
