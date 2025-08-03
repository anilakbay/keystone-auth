const { poolPromise } = require('../db');
const sql = require('mssql');

// Input validation helper
function validateId(id) {
  if (!id || isNaN(id) || id <= 0) {
    throw new Error('Geçersiz ID');
  }
  return parseInt(id);
}

function validateName(name) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Geçersiz kullanıcı adı');
  }
  return name.trim();
}

async function getAllUsers(page = 1, limit = 10) {
  try {
    const pool = await poolPromise;
    const offset = (page - 1) * limit;
    const result = await pool.request()
      .input('limit', sql.Int, limit)
      .input('offset', sql.Int, offset)
      .query('SELECT * FROM Users ORDER BY Id OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY');
    return result.recordset;
  } catch (err) {
    throw new Error('Veritabanı bağlantı hatası: ' + err.message);
  }
}

async function getUserById(id) {
  try {
    const validId = validateId(id);
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, validId)
      .query('SELECT * FROM Users WHERE Id = @id');
    return result.recordset[0];
  } catch (err) {
    throw new Error('Veritabanı bağlantı hatası: ' + err.message);
  }
}

async function createUser(name) {
  try {
    const validName = validateName(name);
    const pool = await poolPromise;
    const result = await pool.request()
      .input('name', sql.VarChar, validName)
      .query('INSERT INTO Users (name) OUTPUT INSERTED.Id VALUES (@name)');
    return result.recordset[0];
  } catch (err) {
    throw new Error('Veritabanı bağlantı hatası: ' + err.message);
  }
}

async function updateUser(id, name) {
  try {
    const validId = validateId(id);
    const validName = validateName(name);
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, validId)
      .input('name', sql.VarChar, validName)
      .query('UPDATE Users SET name = @name WHERE Id = @id');
    return result.rowsAffected[0];
  } catch (err) {
    throw new Error('Veritabanı bağlantı hatası: ' + err.message);
  }
}

async function deleteUser(id) {
  try {
    const validId = validateId(id);
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, validId)
      .query('DELETE FROM Users WHERE Id = @id');
    return result.rowsAffected[0];
  } catch (err) {
    throw new Error('Veritabanı bağlantı hatası: ' + err.message);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
