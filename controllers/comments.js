const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/:id/comments', async (req, res) => {
    const comments = await Comment.find({})
    res.json(comments.map(Comment.format))
})

commentsRouter.post('/:id/comments', async (req, res) => {
    const body = req.body
    console.log('THIS IS WHAT I GOT: ', body.comment, body.blogId)
    try {
        const blog = await Blog.findById(body.blogId)
        console.log('This is "blog": ', blog)

        const getDate = (date) => {
            return date
        }

        const comment = new Comment({
            comment: body.comment,
            date: getDate(new Date()),
            blog: blog._id
        })

        console.log('This is "comment": ', comment)
        const savedComment = await comment.save()
        blog.comment = blog.comment.concat(savedComment._id)
        await blog.save()

        res.json(Comment.format(comment))
    } catch (exception) {
        console.log('Comment POST exception: ', exception)
        res.status(500).send({ error: 'Something went wrong' })
    }
})

module.exports = commentsRouter
