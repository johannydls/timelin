const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    /*User.beforeCreate((user, next) => {
        user.password = bcrypt.hashSync(user.password, process.env.BCRYPT_SALT_ROUNDS || 10);
        next();
    })*/

    User.beforeCreate((user) => {
        
        return bcrypt.hashSync(this.password, process.env.BCRYPT_SALT_ROUNDS || 10)
            .then((hash) => {
                this.password = hash;
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