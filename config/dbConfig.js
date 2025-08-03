require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'anil1881',
  server: process.env.DB_SERVER || 'Anıl',
  database: process.env.DB_NAME || 'KeyStoneDB',
  options: {
    trustServerCertificate: true
  }
};

module.exports = dbConfig;
