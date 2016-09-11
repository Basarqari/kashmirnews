const express = require('express');
const compression = require('compression');
const { cacheGet } = require('./cachePromised');
const container = require('./components/container');

const app = express();
app.use(compression());
app.set('port', process.env.PORT || 3001);

app.get('*', (req, res) => {
  cacheGet('news')
    .then(body => container(body))
    .then(body => res.send(body))
    .catch(err => console.log(err));
});

app.listen(app.get('port'));
