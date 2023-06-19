var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');

var userSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  }
});

userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (result, err) => {
    return cb(err, result);
  });
};
module.exports = mongoose.model('User', userSchema);
