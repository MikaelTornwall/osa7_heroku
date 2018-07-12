const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogFormat, blogsInDb } = require('./blogs_test_helper')

beforeAll(async () => {
    jest.setTimeout(10000)
    await Blog.remove({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const blogPromiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(blogPromiseArray)
    console.log('blog base initialized for testing!')

    await User.remove({})

    const userObjects = initialUsers.map(user => new User(user))
    const userPromiseArray = userObjects.map(user => user.save())
    await Promise.all(userPromiseArray)
    console.log('user base initialized for testing!')

    await Comment.remove({})

    const commentObjects = initialComments.map(comment => new Comment(comment))
    const commentPromiseArray = commentObjects.map(comment => comment.save())
    await Promise.all(commentPromiseArray)
    console.log('comment base initialized for testing')
})

describe('testing GET requests for blogs', async () => {
    test('notes are returned as json', async () => {
        const blogsInDatabase = await blogsInDb()

        const res = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(res.body.length).toBe(blogsInDatabase.length)

        const returnedTitles = res.body.map(blog => blog.title)
        blogsInDatabase.forEach(blog => {
            expect(returnedTitles).toContain(blog.title)
        })
    })
})

// User testing
const User = require('../models/user')
const { initialUsers, usersInDb } = require('./users_test_helper')

describe('testing GET requests for users', async () => {
    test('users are returned as json', async () => {
        const usersInDatabase = await usersInDb()

        const res = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(res.body.length).toBe(usersInDatabase.length)

        const returnedUsernames = res.body.map(user => user.username)
        usersInDatabase.forEach(user => {
            expect(returnedUsernames).toContain(user.username)
        })

    })

    test('individual users are returned with GET to /api/users/:id', async() => {
        const usersInDatabase = await usersInDb()
        const individualUser = usersInDatabase[0]

        console.log('individualUser: ', individualUser)

        const res = await api
            .get(`/api/users/${individualUser.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(res.body.username).toBe(individualUser.username)
    })
})

describe('adding new user', async () => {
    test('POST to /api/users succeeds with valid data', async () => {
        const usersBefore = await usersInDb()

        const newUser = {
            username: 'käyttäjä',
            name: 'testaaja',
            password: 'salasana'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfter = await usersInDb()

        expect(usersAfter.length).toBe(usersBefore.length + 1)

        const usernames = usersAfter.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })
})

// Comments testing
const Comment = require('../models/comment')
const { initialComments, commentFormat, commentsInDb } = require('./comments_test_helper')

describe('testing GET requests for comments', () => {
    test('comments are returned as json', async () => {
        const commentsInDatabase = await commentsInDb()

        const res = await api
            .get('/api/blogs/:id/comments')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(res.body.length).toBe(commentsInDatabase.length)

        const returnedComments = res.body.map(comment => comment.comment)
        commentsInDatabase.forEach(comment => {
            expect(returnedComments).toContain(comment.comment)
        })
    })
})

describe('adding new comment', async () => {
    test('POST to /api/blogs/:id/comments succeeds with valid data', async () => {

        const res = await api
            .get('/api/blogs')
            .expect(200)

        const commentsBefore = await commentsInDb()

        const blogId = res.body[0].id
        console.log('BlogId is: ', blogId)

        const newComment = {
            comment: 'Hello world',
            blogId: blogId
        }

        await api
            .post(`/api/blogs/${blogId}/comments`)
            .send(newComment)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const commentsAfter = await commentsInDb()
        expect(commentsAfter.length).toBe(commentsBefore.length + 1)

        const comments = commentsAfter.map(comment => comment.comment)
        expect(comments).toContain(newComment.comment)
    })
})

afterAll(() => {
    server.close()
})
