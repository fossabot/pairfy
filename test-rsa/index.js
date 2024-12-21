const crypto = require("crypto");
const argon2 = require("argon2");
require("dotenv").config();

const PASSPHRASE = process.env.RSA_PASSPHRASE || "secure-passphrase";

const MODULUS_LENGTH = 4096;

function generateKeys() {
  try {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: MODULUS_LENGTH,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
        cipher: "aes-256-cbc",
        passphrase: PASSPHRASE,
      },
    });
    return { publicKey, privateKey };
  } catch (error) {
    console.error("Error generating keys:", error);
    throw error;
  }
}

function encryptWithPublicKey(publicKey, data) {
  try {
    return crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(data)
    );
  } catch (error) {
    console.error("Error encrypting data:", error);
    throw error;
  }
}

function decryptWithPrivateKey(privateKey, encryptedData) {
  try {
    return crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
        passphrase: PASSPHRASE,
      },
      encryptedData
    );
  } catch (error) {
    console.error("Error decrypting data:", error);
    throw error;
  }
}

/////////////////////////////////////////////////////////////////////////////////////

// Function to derive a key from passphrase using Argon2
async function deriveKey(passphrase, salt) {
  // Argon2 key derivation with latest api
  const key = await argon2.hash(passphrase, {
    type: argon2.argon2id, // argon2id is recommended for most use cases
    salt: salt, // Provide the salt as a buffer
    timeCost: 3, // Number of iterations (time cost)
    memoryCost: 2 ** 16, // Memory cost (64MB)
    parallelism: 1, // Parallelism factor
    hashLength: 32, // 256-bit key for AES-256
  });

  return Buffer.from(key.slice(0, 32)); // Truncate to 32 bytes (256 bits)
}

// AES-256 Encryption (Base64 output only)
async function encrypt(text, passphrase) {
  const salt = crypto.randomBytes(16); // Generate random salt
  const iv = crypto.randomBytes(16);   // Generate random IV

  // Derive the encryption key using Argon2
  const key = await deriveKey(passphrase, salt);

  // Encrypt the plaintext
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');  // Ensure the final part is also in base64

  // Concatenate salt and IV with encrypted data and return it in Base64 format

  return `${salt.toString('base64')}:${iv.toString('base64')}:${encrypted}`;
}

async function decrypt(encryptedData, passphrase) {
  const [saltBase64, ivBase64, encryptedText] = encryptedData.split(':');

  // Convert salt and IV from Base64 to Buffer
  const salt = Buffer.from(saltBase64, 'base64');
  const iv = Buffer.from(ivBase64, 'base64');

  // Derive the key using the same passphrase and salt
  const key = await deriveKey(passphrase, salt);

  // Decrypt the ciphertext
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

//////////////////////////////////

(async () => {
  try {
    const { publicKey, privateKey } = generateKeys();

    const message = "street 80 #940934 mz1 940394 new york";

    const AESencrypted = await encrypt(message, process.env.AES_PASSPHRASE);

    const RSAencrypted = encryptWithPublicKey(publicKey, AESencrypted);

    const RSAdecrypted = decryptWithPrivateKey(privateKey, RSAencrypted);

    const DECRYPTED = await decrypt(RSAdecrypted.toString('utf-8'), process.env.AES_PASSPHRASE);

    console.log(DECRYPTED);
    /////////////////////////////////////////////////////////////////////////////////
  } catch (error) {
    console.error("Error in example execution:", error);
  }
})();
