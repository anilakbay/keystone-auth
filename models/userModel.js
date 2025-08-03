const { poolPromise } = require('../db');
const sql = require('mssql');

async function getAllUsers() {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM Users');
  return result.recordset;
}

async function getUserById(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('SELECT * FROM Users WHERE Id = @id');
  return result.recordset[0];
}

async function createUser(name) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('name', sql.VarChar, name)
    .query('INSERT INTO Users (name) OUTPUT INSERTED.Id VALUES (@name)');
  return result.recordset[0];
}

async function updateUser(id, name) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .input('name', sql.VarChar, name)
    .query('UPDATE Users SET name = @name WHERE Id = @id');
  return result.rowsAffected[0];
}

async function deleteUser(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM Users WHERE Id = @id');
  return result.rowsAffected[0];
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
