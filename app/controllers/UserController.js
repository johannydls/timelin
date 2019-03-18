const { User } = require('../models');
const Services = require('../controllers/Services');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

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
        const User = await verifyCredentials(email, password);

        if (!User) {
            return res.status(404).send();
        }
        delete User.dataValues.password;
        
        return res.status(200).send(User);
    },

    authenticate(req, res, next) {
        const emailUser = req.body.email;
        const password = req.body.password;
        console.log(emailUser, password);
        User.findAll({ where: {email: emailUser} })
            .then((userInfo) => {
                console.log("User info: ", userInfo[0].dataValues.password);
                if (userInfo) {
                    if (bcrypt.compareSync(password, userInfo[0].dataValues.password)) {
                        const token = jwt.sign({ id: userInfo.id}, req.app.get('secretKey'), { expiresIn: '1h'});
                        delete userInfo[0].dataValues.password;
                        res.status(200).send({status: "success", message: "user found!", data: { user: userInfo, token: token}});
                    } else {
                        res.status(400).send({status: "error", message: "Invalid email/password", data: null});
                    }
                } else {
                    next();
                }
                
            })
            .catch((error) => next(error));
    },

}