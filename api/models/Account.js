const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Account
let Account = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
},{
    collection: 'account'
});

module.exports = mongoose.model('Account', Account);
