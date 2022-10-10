const { ResponseError, ResponseSuccess } = require("../../shared/response");
const { AuthResponse } = require("./auth-response");
const { RoleService } = require("../roles");
const { UserDto, User } = require("../users");
const { ErrorsHandler } = require('../../utils');
const { JwtService, PasswordEncoder } = require('../../security');


class AuthService {

    instance;

    constructor() {
    }

    static createInstance() {
        return new AuthService()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    signup = async ({
        email,
        firstname,
        lastname,
        password,
        passwordConfirm
    }) => {
        try {
            const user = await User.findOne({ email });
            if (user)
                return new ResponseError({
                    status: 400,
                    message: "Account already exists with this email !"
                })
            if (password !== passwordConfirm)
                return new ResponseError({
                    status: 412,
                    message: "Password and password confirmation do not match !"
                })
            //const password = Math.random().toString(36).slice(-12);
            password = await PasswordEncoder.hash(password)
            let role = null
            const { success, content } = await RoleService.findByLabel("USER")
            if (success) {
                role = content._id
            }

            const item = new User({
                email,
                firstname,
                lastname,
                password,
                role
            });

            let result = await item.save();
            result = await result.populate({ path: 'role', model: 'Role', select: 'label' })
            return new ResponseSuccess({
                status: 201,
                content: new UserDto(result)
            })
        } catch (err) {
            console.error(err)
            return new ResponseError(ErrorsHandler.handle(err, "AuthService:signup"))
        }
    }

    authenticate = async ({ email, password }) => {
        try {
            if (!email || !password)
                return new ResponseError({
                    status: 400,
                    message: "Fields missing !"
                })

            const user = await User.findOne({ email })
                .populate({ path: 'role', model: 'Role', select: 'label' });
            if (!user)
                return new ResponseError({
                    status: 404,
                    message: "Account does not exist !"
                })
            if (!user.enabled)
                return new ResponseError({
                    status: 400,
                    message: "Account disabled !"
                })

            const isMatch = await PasswordEncoder.compare(password, user.password);
            if (!isMatch)
                return new ResponseError({
                    status: 400,
                    message: "Invalid Credentials !"
                })

            const response = new AuthResponse({
                user: new UserDto(user),
                access_token: JwtService.generateToken(user._id, user.role),
                refresh_token: JwtService.generateToken(user._id, user.role, true)
            })
            return new ResponseSuccess({
                status: 200,
                content: response
            });
        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, "AuthService:login"))
        }
    }

    refresh_token = async (userId) => {
        try {
            const user = await User.findById(userId)
                .populate({ path: 'role', model: 'Role', select: 'label' });
            if (!user)
                return new ResponseError({
                    status: 404,
                    message: "Account does not exist !"
                })

            const response = new AuthResponse({
                access_token: generateToken(user._id, user.role),
                refresh_token: generateToken(user._id, user.role, true)
            })
            return new ResponseSuccess({
                status: 200,
                content: response
            });
        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, "AuthService:refresh_token"))
        }
    }
}

module.exports = AuthService.getInstance()