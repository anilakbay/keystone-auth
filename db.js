const sql = require('mssql');

const config = {
  user: 'sa',          // SQL Server kullanıcı adı
  password: 'password',// Şifren
  server: 'localhost', // Sunucu adresi, local ise localhost
  database: 'KeyStoneDB',  // Veritabanı adı (MSSQL'deki ile aynı olmalı)
  options: {
    trustServerCertificate: true // Localde sertifika hatasını engellemek için
  }
};

let poolPromise;
try {
  poolPromise = new sql.ConnectionPool(config)
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
