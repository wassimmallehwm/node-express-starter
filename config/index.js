module.exports = {
    APP_NAME: process.env.APP_NAME || 'Realtor',
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/realtor',
    PORT: process.env.PORT || 3030,
    //JWT config
    JWT_SECRET: process.env.JWT_SECRET || '$2a$10$.6vrQSA.tIpm.C1thlZ8fOKrnJ6RzHNdcdWNXPEeio0QZxrO241zW',
    JWT_ACCESS_EXPIRATION : process.env.JWT_ACCESS_EXPIRATION || '600s',
    JWT_REFRESH_EXPIRATION : process.env.JWT_REFRESH_EXPIRATION || '10d',
    //Mail config
    MAIL_SENDER: process.env.MAIL_SENDER || 'wassimmalleh.wm@gmail.com',
    MAIL_PASSWD: process.env.MAIL_PASSWD || '********',
    HOST: process.env.HOST || 'smtp.gmail.com',
    MAILPORT: process.env.MAILPORT || 587,
    SECURE: process.env.SECURE || false,
    REQUIRETLS: process.env.REQUIRETLS || true,

    MAIL_ACCOUNT_VERIFICATION: process.env.MAIL_ACCOUNT_VERIFICATION || 'account-verification',
    MAIL_ACCOUNT_CREATION: process.env.MAIL_ACCOUNT_CREATION || 'account-creation',
    
    //Client config
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000/',
    PUBLIC_URL: process.env.PUBLIC_URL || 'http://localhost:3030/public/',
    DEFAULT_LOGO: process.env.DEFAULT_LOGO || 'http://localhost:3030/public/images/logo.png',
}