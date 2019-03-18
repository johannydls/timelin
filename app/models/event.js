module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        color: DataTypes.STRING,
        idUser: DataTypes.INTEGER,
        date: DataTypes.DATE
    });

    return Event;
}