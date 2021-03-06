const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(
  keys.mongoURI, 
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    user: keys.mongoUser,
    pass: keys.mongoPass,
    dbName: keys.mongoDB,
  }
).catch(ex => {
  console.log(ex);
});

const app = express();

app.use(
  cookieSession({
    maxAge: 1000 * 60 * 60 * 24, // Cookies last for 24 hours
    keys: [ keys.cookieKey ]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
