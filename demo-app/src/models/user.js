




const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  createdAt: { type: Date, default: Date.now }
});


UserSchema.methods = {
  foo() {
    console.log('Hi!', this.firstName)
  }
};

module.exports = mongoose.model('User', UserSchema);