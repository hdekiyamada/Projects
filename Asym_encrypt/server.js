// server.js
const express = require('express');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const cors = require('cors');
app.use(cors());

let publicKey, privateKey;

// Endpoint to generate key pair
app.post('/generate-keys', (req, res) => {
  const { publicKey: pubKey, privateKey: privKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });
  publicKey = pubKey;
  privateKey = privKey;
  res.json({ publicKey });
});

// Endpoint to encrypt message
app.post('/encrypt', (req, res) => {
  const { message } = req.body;
  const encryptedMessage = crypto.publicEncrypt(publicKey, Buffer.from(message));
  res.json({ encryptedMessage: encryptedMessage.toString('base64') });
});

// Endpoint to decrypt message
app.post('/decrypt', (req, res) => {
  const { encryptedMessage } = req.body;
  const decryptedMessage = crypto.privateDecrypt(privateKey, Buffer.from(encryptedMessage, 'base64'));
  res.json({ decryptedMessage: decryptedMessage.toString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
