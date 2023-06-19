var mongoose = require('mongoose');

var Comment = require('./Comments');

var Schema = mongoose.Schema;
var articleSchema = new Schema(
  {
    title: { type: String, required: true },
    descreption: { type: String },
    price: { type: Number, required: true, default: 0 },
    photo: { type: String },
    comment: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
  },
  { timestamps: true }
);
module.exports = mongoose.model('Article', articleSchema);
