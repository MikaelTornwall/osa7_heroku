const User = require('../models/user')

const initialUsers = [
    {
        id: "5b2fc201581f5d6dde0cabc3",
        username: "test_user1",
        name: "test it",
        adult: true,
        blogs: []
    },
    {
        id: "5b2fc201581f5d6dde0cabc3",
        username: "test_user2",
        name: "testy tester",
        adult: true,
        blogs: []
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users
}

module.exports = {
    initialUsers, usersInDb
}
