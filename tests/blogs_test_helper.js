const Blog = require('../models/blog')

const initialBlogs = [
    {
        id: "5b392b15fa9613b090a7884a",
        likes: 0,
        title: "CopyBlogger",
        author: "Brian Clark",
        url: "https://www.copyblogger.com/",
        user: {
            _id: "5b2fc1f7581f5d6dde0cabc2",
            username: "mikael",
            name: "mikael"
        },
        comment: [ ]
    },
    {
        id: "5b392c65fa9613b090a7884b",
        likes: 5,
        title: "TechCrunch",
        author: "Michael Arrington & Keith Teare",
        url: "https://techcrunch.com/",
        user: {
            _id: "5b2fc1f7581f5d6dde0cabc2",
            username: "mikael",
            name: "mikael"
        },
        comment: [
            {
                _id: "5b3990fd462d3cbd1e33d8d2",
                date: "Sun Jul 01 2018 20:42:05 GMT-0600 (CST)"
            }
        ]
    }
]

const blogFormat = (blog) => {
    return {
        likes: blog.likes,
        title: blog.title,
        author: blog.author,
        url: blog.url
    }
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blogFormat)
}

module.exports = {
    initialBlogs, blogFormat, blogsInDb
}
