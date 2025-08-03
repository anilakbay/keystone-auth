const express = require('express');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());

// Basit log middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Ana endpoint
app.get('/', (req, res) => {
  res.send('Merhaba Dünya');
});

// Kullanıcı rotalarını bağla
app.use('/users', usersRouter);

// Sunucuyu başlat
app.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor...');
});
