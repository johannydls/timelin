const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    User.beforeCreate((user) => {
        user.password = bcrypt.hashSync(user.password, process.env.BCRYPT_SALT_ROUNDS || 10);
    });

    /*User.beforeCreate((user) => {
        
        return bcrypt.hashSync(user.password, process.env.BCRYPT_SALT_ROUNDS || 10)
            .then((hash) => {
                user.password = hash;
            });
    });*/

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