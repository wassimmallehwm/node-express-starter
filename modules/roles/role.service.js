const Role = require("./role.model");
const { ResponseSuccess, ResponseError } = require("../../shared/response");
const { ErrorsHandler } = require("../../utils");

class RoleService {

    instance;

    constructor() {
    }

    static createInstance() {
        return new RoleService()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    create = async (label) => {
        try {
            if (!label || label.trim().length == 0)
                return new ResponseError({
                    status: 400,
                    message: `Unvalid role label !`
                })

            const role = new Role({ label });

            const result = await role.save();
            if (result) {
                return new ResponseSuccess({
                    status: 200,
                    content: result
                })
            }

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, "RoleService:create"))
        }
    }

    findById = async (id) => {
        try {
            const result = await Role.findById(id);
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: `Role not found !`
                })
            }
            return new ResponseSuccess({
                status: 200,
                content: result
            })

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, "RoleService:findById"))
        }
    }

    findByLabel = async (label) => {
        try {
            const result = await Role.findOne({ label });
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: `Role "${label}" not found !`
                })
            }
            return new ResponseSuccess({
                status: 200,
                content: result
            })

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, "RoleService:findByLabel"))
        }
    }
}

module.exports = RoleService.getInstance()
