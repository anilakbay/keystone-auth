// Bu dosya, MSSQL veritabanı bağlantısının doğru çalışıp çalışmadığını hızlıca test etmek için kullanılır.
// Bağlantı başarılıysa konsola bilgi verir, hata varsa sebebini gösterir.

const sql = require('mssql');
const config = {
  user: 'sa',
  password: 'password',
  server: 'localhost',
  database: 'KeyStoneDB',
  options: { trustServerCertificate: true }
};

sql.connect(config)
  .then(() => {
    console.log('Bağlantı başarılı!');
    sql.close();
  })
  .catch(err => {
    console.error('Bağlantı hatası:', err);
  });
