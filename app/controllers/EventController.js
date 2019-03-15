const { Event } = require('../models');

module.exports = {

    //Event.create({ title: 'Evento 1', description: 'Descrição do evento 1', idUser: 1, color: 'red'});
 
    create(req, res) {
        return Event 
            .create(req.body)
            .then((event) => res.status(201).send(event))
            .catch((error) => res.status(400).send(error));
    },

    list(req, res) {
        return Event
            .findAll({})
            .then((users) => res.status(200).send(users))
            .catch((error) => res.status(400).send(error));
    },

    listByUserId(req, res) {
        return Event
            .findAll({
                where: {
                    idUser: req.params.idUser
                },
                order: [['createdAt', 'DESC']]
            })
            .then((events) => res.status(200).send(events))
            .catch((error) => res.status(400).send(error));
    },

}