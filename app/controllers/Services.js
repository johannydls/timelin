const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {

    verifyCredentialsAsync: (email, password) => {
        if (email && password) {
            return User.findAll({where: {email}}).then((data) => {
                if (data) {
                    const isValidPassword = bcrypt.compareSync(password, data.password);
                    if (isValidPassword) {
                        return data;
                    }
                }
                return false;
            });
        }
        return false;
    },
}