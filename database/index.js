require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('machich', process.env.DB_MACHICH_USER || '', process.env.DB_MACHICH_USER || '', { host: 'localhost', dialect: 'postgres' });

const URL = sequelize.define('url', {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: false });

const Lastkey = sequelize.define('lastkey', {
  key: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { freezeTableName: true, timestamps: false });

module.exports = {
  Database: sequelize,
  URL: URL,
  Lastkey: Lastkey
};