/* eslint-disable no-console */
/* MONGOOSE SETUP */
const mongoose = require('mongoose');

const connectionURL = `mongodb+srv://dipak:dipak@cluster0-l8k2c.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected to mongo db');
});
module.exports = db;