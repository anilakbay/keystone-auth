const sql = require('mssql');
const config = {
  user: 'sa',
  password: 'password',
  server: 'Anıl', // Sunucu adını burada güncelledik
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
