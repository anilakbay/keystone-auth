const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

// Tüm kullanıcıları listele
router.get('/', async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message || 'Veritabanı hatası');
  }
});

// Yeni kullanıcı ekle
router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Kullanıcı adı zorunludur.');
  }
  try {
    const user = await userModel.createUser(name);
    res.status(201).json({ message: 'Kullanıcı başarıyla eklendi', user });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message || 'Veritabanı hatası');
  }
});

// Belirli kullanıcıyı getir
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).send('Kullanıcı bulunamadı.');
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message || 'Veritabanı hatası');
  }
});

// Kullanıcıyı sil
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const affected = await userModel.deleteUser(id);
    if (affected === 0) {
      return res.status(404).send('Kullanıcı bulunamadı.');
    }
    res.send(`ID'si ${id} olan kullanıcı başarıyla silindi.`);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message || 'Veritabanı hatası');
  }
});

// Kullanıcı adını güncelle
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Kullanıcı adı zorunludur.');
  }
  try {
    const affected = await userModel.updateUser(id, name);
    if (affected === 0) {
      return res.status(404).send('Kullanıcı bulunamadı.');
    }
    res.send(`ID'si ${id} olan kullanıcının adı başarıyla güncellendi.`);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message || 'Veritabanı hatası');
  }
});

module.exports = router;
