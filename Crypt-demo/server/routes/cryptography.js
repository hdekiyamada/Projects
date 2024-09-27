const express = require('express');
const crypto = require('node:crypto');
const router = express.Router();

// Helper function to validate key length
function isValidHexKey(key) {
  return typeof key === 'string' && key.length === 64 && /^[0-9a-fA-F]+$/.test(key);
}

// Symmetric encryption using AES
router.post('/encrypt', (req, res) => {
  const { text, key } = req.body;
  if (!isValidHexKey(key)) {
    return res.status(400).json({ error: 'Invalid key. The key must be a 32-byte hexadecimal string (64 characters).' });
  }

  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    res.json({ encrypted: encrypted + ':' + iv.toString('hex') });
  } catch (err) {
    console.error('Encryption error:', err);
    res.status(500).json({ error: 'Encryption failed. Please try again.' });
  }
});

// Symmetric decryption using AES
router.post('/decrypt', (req, res) => {
  const { encrypted, key } = req.body;
  if (!isValidHexKey(key)) {
    return res.status(400).json({ error: 'Invalid key. The key must be a 32-byte hexadecimal string (64 characters).' });
  }

  try {
    const parts = encrypted.split(':');
    const iv = Buffer.from(parts[1], 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
    let decrypted = decipher.update(parts[0], 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    res.json({ decrypted });
  } catch (err) {
    console.error('Decryption error:', err);
    res.status(500).json({ error: 'Decryption failed. Please try again.' });
  }
});

module.exports = router;
