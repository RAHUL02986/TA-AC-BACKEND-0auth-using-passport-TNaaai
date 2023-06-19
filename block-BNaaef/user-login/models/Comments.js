var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Article = require('./Article');

var commentSchema = new Schema(
  {
    comment: String,
    articleId: { type: Schema.Types.ObjectId, ref: 'Article' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
