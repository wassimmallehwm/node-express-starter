const nodemailer = require('nodemailer');
const { MAIL_SENDER, MAIL_PASSWD, HOST, MAILPORT } = require('../config');
const { ResponseSuccess, ResponseError } = require('../shared/response');
const { ErrorsHandler } = require('../utils');

const defaultCallback = (error, info) => {
    if (error) {
        console.error(error)
        return new ResponseError(ErrorsHandler.handle(err, "EmailService:send"))
    } else {
        console.info(info)
        return new ResponseSuccess({
            status: 200,
            content: info
        })
    }
}


class EmailService {

    instance;

    constructor() {
    }

    static createInstance() {
        return new EmailService()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    send = async () => (mailOptions, callback = defaultCallback) => {
        let options = {
            ...mailOptions,
            from: MAIL_SENDER,
            pwd: MAIL_PASSWD,
        }
        console.log(options)
        let transporter = nodemailer.createTransport({
            host: HOST,
            port: MAILPORT,
            // secure: SECURE,
            // requireTLS: REQUIRETLS,
            auth: {
                user: MAIL_SENDER,
                pass: MAIL_PASSWD
            }
        });
    
        transporter.sendMail(options, callback);
        transporter.close();
    }

    get = (template) => {
        return require(`./templates/${template}`)
    }
}

module.exports = EmailService.getInstance()
