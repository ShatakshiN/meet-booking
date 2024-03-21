const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Slots = sequelize.define('Slots',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },

    link : {
        type : Sequelize.STRING,
        allowNull: false,
        isUrl: true
    },
    
    time:{
        type :Sequelize.STRING,
        allowNull : false

    }
    

});

module.exports = Slots
