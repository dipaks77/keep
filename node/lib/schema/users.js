const mongoose = require('mongoose');

const { Schema } = mongoose;

const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
},
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  });

const users = mongoose.model('users', usersSchema);

module.exports = users;