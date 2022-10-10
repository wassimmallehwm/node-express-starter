const userRoutes = require('./user.routes')
const UserService = require('./user.service')
const User = require('./user.model')
const UserDto = require('./user.dto')

module.exports = {
    routes: userRoutes,
    UserService,
    User,
    UserDto
}