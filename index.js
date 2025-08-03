const express = require('express');
const usersRouter = require('./routes/users');
require('dotenv').config();

const app = express();
app.use(express.json());

// Gelişmiş log middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.connection.remoteAddress;
  
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
  next();
});

// Hata işleme middleware
app.use((err, req, res, next) => {
  console.error('Hata oluştu:', err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.' 
  });
});

// Ana endpoint
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Merhaba Dünya',
    timestamp: new Date().toISOString()
  });
});

// Kullanıcı rotalarını bağla
app.use('/users', usersRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Sayfa bulunamadı'
  });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
