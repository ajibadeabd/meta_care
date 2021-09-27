const { sequelize: db } = require('../../models');
const sequelize = require('sequelize').Sequelize;

const installUUIDExtension = async () => db.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

module.exports = {
  installUUIDExtension,
};
