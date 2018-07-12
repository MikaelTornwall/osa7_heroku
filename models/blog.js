const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  likes: Number,
  title: String,
  author: String,
  url: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
})

blogSchema.statics.format = (blog) => {
  return {
    id: blog._id,
    likes: blog.likes,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    user: blog.user,
    comment: blog.comment
  }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
