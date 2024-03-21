const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const SlotUsers = sequelize.define('SlotUsers',{

    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },

    name :{
        type : Sequelize.STRING,
        allowNull : false
    },

    email :{
        type : Sequelize.STRING,
        allowNull : false

    }

});

module.exports = SlotUsers;
