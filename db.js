const sql = require('mssql');
const dbConfig = require('./config/dbConfig');

let poolPromise;
try {
  poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
      console.log('MSSQL bağlantısı başarılı');
      return pool;
    })
    .catch(err => {
      console.log('MSSQL bağlantı hatası:', err);
      throw err;
    });
} catch (err) {
  console.log('Bağlantı havuzu oluşturulamadı:', err);
}

module.exports = {
  sql, poolPromise
};
