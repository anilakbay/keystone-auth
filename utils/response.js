function success(res, data) {
  res.json({ success: true, data });
}

function error(res, message, status = 500) {
  res.status(status).json({ success: false, message });
}

module.exports = { success, error };
