const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    maxlength: 100,
    minlength: 2,
    required: true,
    trim: true,
    type: String
  },
  email: {
    lowercase: true,
    maxlength: 255,
    minlength: 5,
    required: false,
    trim: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  },
});


userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

module.exports = mongoose.model('User', userSchema);
