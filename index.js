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


if (process.env.NODE_ENV === 'production') {
    // express will serve up prod assets like main.js or main.css.
    app.use(express.static('client/build'));

    // express will serve up the index.html if it does not recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5001;
app.listen(PORT);
