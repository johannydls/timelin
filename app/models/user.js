const bcrypt = require('bcrypt');
const validator = require('validator');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    User.beforeCreate((user) => {
        return bcrypt.hash(user.password, process.env.BCRYPT_SALT_ROUNDS || 10)
            .then((hash) => {
                user.password = hash;
            });
    });

    User.beforeBulkUpdate((user) => {
        if (user.attributes.password) {
            return bcrypt.hash(user.attributes.password, process.env.BCRYPT_SALT_ROUNDS || 10)
                .then((hash) => {
                    user.attributes.password = hash;
                });
        }
    });

    return User;
}