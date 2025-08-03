const express = require('express');
const router = express.Router();
const { poolPromise } = require('../db');
const sql = require('mssql');

// Tüm kullanıcıları listele
router.get('/', async (req, res) => {
  // ...existing code from app.get('/users')...
});

// Yeni kullanıcı ekle
router.post('/', async (req, res) => {
  // ...existing code from app.post('/users')...
});

// Belirli kullanıcıyı getir
router.get('/:id', async (req, res) => {
  // ...existing code from app.get('/users/:id')...
});

// Kullanıcıyı sil
router.delete('/:id', async (req, res) => {
  // ...existing code from app.delete('/users/:id')...
});

// Kullanıcı adını güncelle
router.put('/:id', async (req, res) => {
  // ...existing code from app.put('/users/:id')...
});

module.exports = router;
