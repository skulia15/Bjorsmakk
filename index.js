const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

require('./models/User');
require('./models/Beer');
require('./models/Brewery');
require('./models/Type');
require('./models/Rating');

require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({
    extended: true
  }))

  app.use(express.json());

require('./routes/authRoutes')(app);
require('./routes/beerRoutes')(app);

console.log('PORT: ', process.env.PORT || 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT);
