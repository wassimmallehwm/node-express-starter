class BaseResponse {
    constructor(
        success,
        status,
    ) {
        this.success = success;
        this.status = status;
    }
}

class ResponseSuccess extends BaseResponse {
    constructor({
        status,
        content,
        message = "",
        url = "",
    }) {
        super(true, status)
        this.message = message;
        this.url = url;
        this.content = content;
    }
}

class ResponseError extends BaseResponse {
    constructor({
        status,
        message,
        reason = "",
        url = "",
        validationErrors = []
    }) {
        super(false, status)
        this.message = message;
        this.reason = reason;
        this.url = url;
        this.validationErrors = validationErrors;
    }
}

module.exports = {
    ResponseSuccess,
    ResponseError
}