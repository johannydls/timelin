const { User } = require('../models');
const Services = require('../controllers/Services');

module.exports = {

    //User.create({ name: 'Johanny', email: 'johanny@mail.com', password: '123456'});

    create(req, res) {
        return User 
            .create(req.body)
            .then((user) => res.status(201).send(user))
            .catch((error) => res.status(400).send(error));
    },

    list(req, res) {
        return User
            .findAll({})
            .then((users) => res.status(200).send(users))
            .catch((error) => res.status(400).send(error));
    },

    listById(req, res) {
        return User
            .findAll({
                where: {
                    id: req.params.id
                }
            })
            .then((user) => res.status(200).send(user))
            .catch((error) => res.status(400).send(error));
    },

    listByEmail(req, res) {
        return User
            .findAll({
                where: {
                    email: req.params.email
                }
            })
            .then((user) => res.status(200).send(user))
            .catch((error) => res.status(400).send(error));
    },

    async login(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const User = await Services.verifyCredentialsAsync(email, password);

        if (!User) {
            return res.status(404).send();
        }
        delete User.dataValues.password;
        
        return res.status(200).send(User);
    }
}