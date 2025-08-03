const express = require('express'); // Express ile sunucu oluşturmak için gerekli paket
const { poolPromise } = require('./db'); // MSSQL veritabanına bağlanmak için havuz nesnesi
const sql = require('mssql'); // MSSQL sorguları için gerekli paket

const app = express(); // Yeni bir Express uygulaması başlatıyoruz
app.use(express.json()); // Gelen isteklerdeki JSON verileri otomatik olarak parse et

// Her gelen isteği konsola yazdıran basit bir log fonksiyonu
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Ana endpoint: Sunucunun çalışıp çalışmadığını kontrol etmek için
app.get('/', (req, res) => {
  res.send('Merhaba Dünya');
});

// Tüm kullanıcıları listeleyen endpoint
app.get('/users', async (req, res) => {
  try {
    const pool = await poolPromise; // Veritabanı bağlantısını al
    const result = await pool.request().query('SELECT * FROM Users'); // Kullanıcıları çek
    res.json(result.recordset); // Sonucu JSON olarak döndür
  } catch (err) {
    console.error(err);
    res.status(500).send('Veritabanı hatası');
  }
});

// Yeni kullanıcı ekleyen endpoint
app.post('/users', async (req, res) => {
  const newUser = req.body; // İstekten gelen kullanıcı verisi
  if (!newUser?.name) { // Kullanıcı adı yoksa hata döndür
    return res.status(400).send('Kullanıcı adı zorunludur.');
  }
  try {
    const pool = await poolPromise;
    const insertQuery = `
      INSERT INTO Users (name) OUTPUT INSERTED.Id VALUES (@name)
    `;
    const result = await pool.request()
      .input('name', sql.VarChar, newUser.name)
      .query(insertQuery);
    newUser.id = result.recordset[0].Id; // Eklenen kullanıcının ID'sini al
    res.status(201).json({ message: 'Kullanıcı başarıyla eklendi', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).send('Veritabanı hatası');
  }
});

// Belirli bir ID'ye sahip kullanıcıyı getiren endpoint
app.get('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id); // URL'den gelen ID'yi al
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Users WHERE Id = @id');
    if (result.recordset.length === 0) {
      return res.status(404).send('Kullanıcı bulunamadı.');
    }
    res.json(result.recordset[0]); // Kullanıcıyı JSON olarak döndür
  } catch (err) {
    console.error(err);
    res.status(500).send('Veritabanı hatası');
  }
});

// Belirli bir ID'ye sahip kullanıcıyı silen endpoint
app.delete('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id); // Silinecek kullanıcının ID'si
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Users WHERE Id = @id');
    if (result.rowsAffected[0] === 0) {
      return res.status(404).send('Kullanıcı bulunamadı.');
    }
    res.send(`ID'si ${id} olan kullanıcı başarıyla silindi.`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Veritabanı hatası');
  }
});

app.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor...');
});
app.delete('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id) // ID parametresini güvenli şekilde ekliyoruz
      .query('DELETE FROM Users WHERE Id = @id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send('Kullanıcı bulunamadı.');
    }

    res.send(`ID'si ${id} olan kullanıcı başarıyla silindi.`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Veritabanı hatası');
  }
});

// -------------------- SUNUCUYU BAŞLAT --------------------
app.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor...');
});
