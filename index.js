const express = require('express');
const mongoose = require('mongoose');
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

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
