const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  comment: String,
  date: String,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
})

commentSchema.statics.format = (comment) => {
  return {
    id: comment._id,
    comment: comment.comment,
    date: comment.date,
    blog: comment.blog
  }
}

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
