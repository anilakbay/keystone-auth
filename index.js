const express = require('express');
const app = express();

app.use(express.json());

// Gelen istekleri konsola yazdırıyoruz, böylece hangi endpoint çağrıldı takip edilebilir.
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Ana sayfa endpoint'i: Sunucu çalışıyor mu kontrolü için basit bir mesaj döner.
app.get('/', (req, res) => {
  res.send('Merhaba Dünya');
});

// Kullanıcı verilerini tuttuğumuz basit bir liste
const users = [
  { id: 1, name: 'Anıl Akbay' },
  { id: 2, name: 'Ahmet Yılmaz' },
  { id: 3, name: 'Ayşe Demir' }
];

// Tüm kullanıcıları listeleyen endpoint
app.get('/users', (req, res) => {
  res.json(users);
});

// Yeni kullanıcı eklemek için kullanılan endpoint
app.post('/users', (req, res) => {
  const newUser = req.body;

  // Eğer isim bilgisi yoksa kullanıcı eklenmez, hata mesajı döner
  if (!newUser || !newUser.name) {
    return res.status(400).send('Kullanıcı adı zorunludur.');
  }

  // Yeni kullanıcıya benzersiz bir ID atıyoruz
  newUser.id = Math.floor(Math.random() * 1000) + 4;

  res.status(201).json({ message: 'Kullanıcı başarıyla eklendi', user: newUser });
});

// ID'ye göre tek kullanıcı bilgisi almak için endpoint
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).send('Kullanıcı bulunamadı.');
  }

  res.json(user);
});

// ID'ye göre kullanıcı silme işlemini simüle eden endpoint
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).send('Kullanıcı bulunamadı.');
  }

  // Gerçek uygulamada burası kullanıcıyı listeden çıkarır
  res.send(`ID'si ${id} olan kullanıcı başarıyla silindi (simülasyon).`);
});

// 3000 portunda sunucuyu başlatıyoruz
app.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor...');
});
