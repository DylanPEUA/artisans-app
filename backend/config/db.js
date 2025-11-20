require('dotenv').config();
const { Sequelize } = require('sequelize');

const {
  DB_HOST = '127.0.0.1',
  DB_PORT = 3306,
  DB_NAME = 'ara_artisans',
  DB_USER = 'root',
  DB_PASS = '',
  DB_SYNC = 'false'
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'mysql',
  logging: false,
  define: {
    underscored: true,
    timestamps: true
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    // ensures proper charset; utile si tu traites des accents/emoji
    charset: 'utf8mb4'
  }
});

async function testAndSync(options = { force: false }) {
  try {
    await sequelize.authenticate();
    console.log('✅ Sequelize: connected to', `${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);
    if (DB_SYNC === 'true' || options.force === true) {
      await sequelize.sync({ force: options.force === true });
      console.log('✅ Sequelize: models synchronized');
    }
    return true;
  } catch (err) {
    console.error('❌ Sequelize: unable to connect:', err.message || err);
    throw err;
  }
}

module.exports = { sequelize, testAndSync };