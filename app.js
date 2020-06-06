const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const api = require('./api/index');
require('dotenv').config();
const config = {
  db_user: process.env.DB_USER,
  db_pw: process.env.DB_PW,
  db_path: process.env.DB_PATH,
  port: process.env.PORT,
  host: process.env.HOST,
};

// //Set up default mongoose connection
// const mongoDB = `mongodb+srv://${config.db_user}:${config.db_pw}@${config.db_path}?retryWrites=true&w=majority`;
// mongoose.connect(mongoDB, { useNewUrlParser: true });

// // Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app= express()
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static('public'));

app.use('/api', api);

app.listen(config.port, config.host, (e) => {
  if(e) {
    throw new Error('Internal Server Error');
  }
})