const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const { success, error } = require('../utils/response');

// Tüm kullanıcıları listele (sayfalama destekli)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    if (page < 1 || limit < 1) {
      return error(res, 'Geçersiz sayfa veya limit değeri', 400);
    }
    
    const users = await userModel.getAllUsers(page, limit);
    success(res, {
      users,
      pagination: {
        page,
        limit
      }
    });
  } catch (err) {
    console.error(err);
    error(res, err.message || 'Veritabanı hatası', 500);
  }
});

// Yeni kullanıcı ekle
router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return error(res, 'Kullanıcı adı zorunludur.', 400);
  }
  try {
    const user = await userModel.createUser(name);
    success(res, { message: 'Kullanıcı başarıyla eklendi', user }, 201);
  } catch (err) {
    console.error(err);
    error(res, err.message || 'Veritabanı hatası', 500);
  }
});

// Belirli kullanıcıyı getir
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return error(res, 'Geçersiz ID', 400);
  }
  
  try {
    const user = await userModel.getUserById(id);
    if (!user) {
      return error(res, 'Kullanıcı bulunamadı.', 404);
    }
    success(res, user);
  } catch (err) {
    console.error(err);
    error(res, err.message || 'Veritabanı hatası', 500);
  }
});

// Kullanıcıyı sil
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return error(res, 'Geçersiz ID', 400);
  }
  
  try {
    const affected = await userModel.deleteUser(id);
    if (affected === 0) {
      return error(res, 'Kullanıcı bulunamadı.', 404);
    }
    success(res, `ID'si ${id} olan kullanıcı başarıyla silindi.`);
  } catch (err) {
    console.error(err);
    error(res, err.message || 'Veritabanı hatası', 500);
  }
});

// Kullanıcı adını güncelle
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  
  if (isNaN(id)) {
    return error(res, 'Geçersiz ID', 400);
  }
  
  if (!name) {
    return error(res, 'Kullanıcı adı zorunludur.', 400);
  }
  
  try {
    const affected = await userModel.updateUser(id, name);
    if (affected === 0) {
      return error(res, 'Kullanıcı bulunamadı.', 404);
    }
    success(res, `ID'si ${id} olan kullanıcının adı başarıyla güncellendi.`);
  } catch (err) {
    console.error(err);
    error(res, err.message || 'Veritabanı hatası', 500);
  }
});

module.exports = router;
