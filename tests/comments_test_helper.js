const Comment = require('../models/comment')

const initialComments = [
    {
        id: "5b39333b0583b7b317bb1ca4",
        comment: "First test comment",
        date: "Sun Jul 01 2018 14:02:03 GMT-0600 (CST)",
        blog: "5b3932b50583b7b317bb1ca0"
    },
    {
        id: "5b3990fd462d3cbd1e33d8d2",
        comment: "Second test comment",
        date: "Sun Jul 01 2018 20:42:05 GMT-0600 (CST)",
        blog: "5b392c65fa9613b090a7884b"
    },
]

const commentFormat = (comment) => {
    return {
        comment: comment.comment,
        blog: comment.blog
    }
}

const commentsInDb = async () => {
    const comments = await Comment.find({})
    return comments.map(commentFormat)
}

module.exports = {
    initialComments, commentFormat, commentsInDb
}
