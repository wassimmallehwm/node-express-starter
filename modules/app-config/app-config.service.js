const AppConfig = require("./app-config.model");
const { ResponseSuccess, ResponseError } = require("../../shared/response");
const { ErrorsHandler } = require("../../utils");

class AppConfigService {

    instance;

    constructor() {
    }

    static createInstance() {
        return new AppConfigService()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    find = async () => {
        try {
            const result = await AppConfig.findOne()
                .select('-_id')
                .sort("-created_at")
                .exec();
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: `AppConfig not found !`
                })
            }
            return new ResponseSuccess({
                status: 200,
                content: result
            })

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, "AppConfigService:find"))
        }
    }

    update = async (data) => {
        try {
            let result = await AppConfig.findOne().sort("-created_at").exec();
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: `AppConfig data not found !`
                })
            }
            result = await AppConfig.findOneAndUpdate({ _id: result._id }, data, { new: true });
            return new ResponseSuccess({
                status: 200,
                content: result
            })

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, "AppConfigService:update"))
        }
    }

    updateLogo = async (logo) => {
        try {
            let result = await AppConfig.findOne().sort("-created_at").exec();
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: `AppConfig data not found !`
                })
            }
            result.logo = logo;
            await result.save();
            return new ResponseSuccess({
                status: 200,
                content: result
            })

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, "AppConfigService:updateLogo"))
        }
    }
}

module.exports = AppConfigService.getInstance()
