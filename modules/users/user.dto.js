module.exports = class UserDto {
    constructor({
        _id,
        firstname,
        lastname,
        email,
        phone,
        role,
        createdAt,
        imagePath
    }) {
        this._id = _id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.createdAt = createdAt;
        this.imagePath = imagePath;
    }
}