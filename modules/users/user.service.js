const User = require("./user.model");
const {
    APP_NAME, MAIL_ACCOUNT_VERIFICATION, MAIL_ACCOUNT_CREATION
} = require("../../config");
const { ResponseError, ResponseSuccess } = require("../../shared/response");
const UserDto = require("./user.dto");
const { ErrorsHandler } = require("../../utils");
const { JwtService, PasswordEncoder } = require("../../security");
const EmailService = require("../../mails/email.service");


class UserService {

    instance;

    constructor() {
    }

    static createInstance() {
        return new UserService()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    create = async ({
        email,
        firstname,
        lastname,
        role,
        password
    }) => {
        try {
            const user = await User.findOne({ email });
            if (user)
                return new ResponseError({
                    status: 400,
                    message: "Account already exists with this email !"
                })
            password = await PasswordEncoder.hash(password)

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
            console.error(err);
            const { status, message } = ErrorsHandler.handle(err, "UserService:create")
            return new ResponseError({
                status,
                message
            })
        }
    }

    findById = async (id) => {
        try {
            const result = await User.findById(id)
                .populate({ path: 'role', model: 'Role', select: 'label' });
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: "User not found !"
                })
            }
            return new ResponseSuccess({
                status: 200,
                content: new UserDto(result)
            })

        } catch (err) {
            console.error(err);
            const { status, message } = ErrorsHandler.handle(err, "UserService:findById")
            return new ResponseError({
                status,
                message
            })
        }
    }

    findAll = async (query = {}) => {
        try {
            let result = await User.find(query)
                .populate({ path: 'role', model: 'Role', select: 'label' });
            if (result) {
                result = result.map(elem => new UserDto(elem))
                return new ResponseSuccess({
                    status: 200,
                    content: result
                })
            }
        } catch (err) {
            console.error(err);
            const { status, message } = ErrorsHandler.handle(err, "UserService:findAll")
            return new ResponseError({
                status,
                message
            })
        }
    }

    findAllPaginated = async ({ page, limit, sortField, sortOrder }) => {
        try {
            const total = await User.find()
                .count()
                .exec();

            let result = await User.find()
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ [sortField]: sortOrder })
                .populate({ path: 'role', model: 'Role', select: 'label' })
                .exec();

            if (result) {
                result = result.map(elem => new UserDto(elem))
                return new ResponseSuccess({
                    status: 200,
                    content: {
                        page,
                        limit,
                        total,
                        pages: Math.ceil(total / limit),
                        docs: result
                    }
                })
            }
        } catch (err) {
            console.error(err);
            const { status, message } = ErrorsHandler.handle(err, "UserService:findAllPaginated")
            return new ResponseError({
                status,
                message
            })
        }
    }

    update = async (id, data) => {
        try {
            const user = await User.findById(id)
            if (!user)
                return new ResponseError({
                    status: 404,
                    message: "User not found !"
                })
            let result = await User.findOneAndUpdate({ _id: id }, data, { new: true });
            result = await result.populate({ path: 'role', model: 'Role', select: 'label' });

            return new ResponseSuccess({
                status: 200,
                content: new UserDto(result)
            })
        } catch (err) {
            console.error(err);
            const { status, message } = ErrorsHandler.handle(err, "UserService:update")
            return new ResponseError({
                status,
                message
            })
        }
    }

    delete = async (id) => {
        try {
            const user = await User.findById(id)
            if (!user)
                return new ResponseError({
                    status: 404,
                    message: "User not found !"
                })
            const result = await User.deleteOne({ _id: id });

            return new ResponseSuccess({
                status: 200,
                content: result
            })
        } catch (err) {
            console.error(err);
            const { status, message } = ErrorsHandler.handle(err, "UserService:delete")
            return new ResponseError({
                status,
                message
            })
        }
    }

    search = async ({ q, limit }) => {
        try {
            const filter = {
                //'_id': { $ne: currentUserId },
                $or: [
                    { firstname: { $regex: q, $options: 'i' } },
                    { lastname: { $regex: q, $options: 'i' } },
                    { email: { $regex: q, $options: 'i' } }
                ]
            }
            let result = await User.find(filter)
                .populate({ path: 'role', model: 'Role', select: 'label' })
                .select('firstname lastname email imagePath')
                .limit(limit)
                .exec();
            if (result) {
                result = result.map(elem => new UserDto(elem))
                return new ResponseSuccess({
                    status: 200,
                    content: result
                })
            }
        } catch (err) {
            console.error(err);
            const { status, message } = ErrorsHandler.handle(err, "UserService:search")
            return new ResponseError({
                status,
                message
            })
        }
    }

    sendAccountVerificationEmail = ({ id, role, firstname, lastname, email }) => {
        const token = JwtService.generateToken(id, role);
        var mailOptions = {
            to: email,
            subject: `${APP_NAME} - Verify your account`,
            html: EmailService.get(MAIL_ACCOUNT_VERIFICATION)(firstname, lastname, token)
        };
        EmailService.send(mailOptions);
    }

    sendAccountCreationEmail = ({ firstname, lastname, email, password }) => {
        var mailOptions = {
            to: email,
            subject: `${APP_NAME} - Account created`,
            html: EmailService.get(MAIL_ACCOUNT_CREATION)(firstname, lastname, email, password)
        };
        EmailService.send(mailOptions);
    }
}

module.exports = UserService.getInstance()
