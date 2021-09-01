'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('../database/db');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    avatar: Sequelize.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};