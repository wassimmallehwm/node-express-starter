const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: "Role",
    },
    firstname: {
        type: String,
        required: true,
        unique: false,
    },
    lastname: {
        type: String,
        required: true,
        unique: false,
    },
    phone: {
        type: String,
        required: false,
        unique: false,
    },
    birthdate: {
        type: Date,
        required: false,
        unique: false,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    sex: {
        type: String,
        required: false,
        unique: false,
    },
    imagePath: {
        type: String,
        default: 'user_default'
    },
    verified : {
        type: Boolean,
        default: false
    },
    enabled : {
        type: Boolean,
        default: true
    }
    
}, {
    timestamps: true
});

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', UserSchema);