/**
 * Basit kimlik doğrulama middleware'i
 * Gerçek bir uygulamada bu daha karmaşık olurdu (JWT, OAuth, vs.)
 */

const { error } = require('../utils/response');
const VALID_API_KEYS = ['abc123', 'def456'];

function authenticate(req, res, next) {
  // Header'dan API anahtarını al
  const apiKey = req.headers['x-api-key'];
  
  // API anahtarı yoksa hata ver
  if (!apiKey) {
    return error(res, 'API anahtarı gerekli', 401);
  }
  
  // API anahtarı geçerli mi?
  if (!VALID_API_KEYS.includes(apiKey)) {
    return error(res, 'Geçersiz API anahtarı', 403);
  }
  
  // Kullanıcı kimliği (örnek)
  req.user = {
    id: 1,
    role: 'admin'
  };
  
  next();
}

module.exports = authenticate;
