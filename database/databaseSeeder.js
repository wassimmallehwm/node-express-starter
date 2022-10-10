const AppConfig = require('../modules/app-config/app-config.model');
const { APP_NAME } = require('../config');

const { RoleService } = require("../modules/roles");
const { UserService } = require("../modules/users");

const createAppConfig = async () => {
    const appconfig = new AppConfig();
    appconfig.name = APP_NAME;
    appconfig.version = '1.0.0';
    appconfig.social_name = APP_NAME;
    await appconfig.save();
}

const createCollections = async () => {
    const {success, content} = await RoleService.create('ADMIN');
    await RoleService.create('USER');

    if(success){
        const admin = {
            email: "admin@admin.com",
            firstname : "Admin",
            lastname : "Admin",
            role: content._id,
            password: "password"
        }
        await UserService.create(admin)
    }
}


const changeAppVersion = async (oldVersion, version) => {
    const appData = await AppConfig.findOne({version: oldVersion})
    appData.version = version;
    appData.save();
}


const migration = async (data) => {
}

const dbSeeder = async () => {
    AppConfig.find().then(
        async res => {
            if (res && res.length > 0) {
                console.log('App already initialized !')
                return;
            } else {
                console.log('Initializing App ...')
                await createAppConfig();
                await createCollections();
                console.log('App initialized successfully !')
            }
        },
        error => {
            console.log(error);
        }
    )
}


module.exports = dbSeeder;