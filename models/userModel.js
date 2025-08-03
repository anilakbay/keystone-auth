const { poolPromise } = require('../db');
const sql = require('mssql');

async function getAllUsers() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Users');
    return result.recordset;
  } catch (err) {
    throw new Error('Veritabanı bağlantı hatası: ' + err.message);
  }
}

async function getUserById(id) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Users WHERE Id = @id');
    return result.recordset[0];
  } catch (err) {
    throw new Error('Veritabanı bağlantı hatası: ' + err.message);
  }
}

async function createUser(name) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('name', sql.VarChar, name)
      .query('INSERT INTO Users (name) OUTPUT INSERTED.Id VALUES (@name)');
    return result.recordset[0];
  } catch (err) {
    throw new Error('Veritabanı bağlantı hatası: ' + err.message);
  }
}

async function updateUser(id, name) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.VarChar, name)
      .query('UPDATE Users SET name = @name WHERE Id = @id');
    return result.rowsAffected[0];
  } catch (err) {
    throw new Error('Veritabanı bağlantı hatası: ' + err.message);
  }
}

async function deleteUser(id) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
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
