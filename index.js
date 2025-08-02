const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Ana endpoint
app.get('/', (req, res) => {
  res.send('Merhaba Dünya');
});

// Kullanıcı listesi için endpoint
app.get('/users', (req, res) => {
  // Statik örnek kullanıcı listesi
  const users = [
    { id: 1, name: 'Anıl Akbay' },
    { id: 2, name: 'Ahmet Yılmaz' },
    { id: 3, name: 'Ayşe Demir' }
  ];
  res.json(users);
});

app.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor...');
});
