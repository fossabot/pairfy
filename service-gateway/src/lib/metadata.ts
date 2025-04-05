import crypto from "crypto";
import * as openpgp from "openpgp";
import argon2 from "argon2";

// Function to derive a key from passphrase using Argon2
async function generateArgonKey(passphrase: string, salt: Buffer) {
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
async function encryptWithAES(
  text: string,
  passphrase: string
): Promise<string> {
  const salt = crypto.randomBytes(16); // Generate random salt
  const iv = crypto.randomBytes(16); // Generate random IV

  // Derive the encryption key using Argon2
  const key = await generateArgonKey(passphrase, salt);

  // Encrypt the plaintext
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64"); // Ensure the final part is also in base64

  // Concatenate salt and IV with encrypted data and return it in Base64 format

  return `${salt.toString("base64")}:${iv.toString("base64")}:${encrypted}`;
}

async function decryptWithAES(encryptedData: string, passphrase: string) {
  const [saltBase64, ivBase64, encryptedText] = encryptedData.split(":");

  // Convert salt and IV from Base64 to Buffer
  const salt = Buffer.from(saltBase64, "base64");
  const iv = Buffer.from(ivBase64, "base64");

  // Derive the key using the same passphrase and salt
  const key = await generateArgonKey(passphrase, salt);

  // Decrypt the ciphertext
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedText, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

/**
 * Encrypts a text message using RSA and OpenPGP.
 * @param {string} message - The plaintext message to encrypt.
 * @param {string} publicKey - The recipient's public key (armored format).
 * @returns {Promise<string>} - The encrypted message in armored format.
 */
async function encryptWithRSA(message: string, publicKey: string) {
  try {
    const encrypted = await openpgp.encrypt({
      message: await openpgp.createMessage({ text: message }),
      encryptionKeys: await openpgp.readKey({ armoredKey: publicKey }),
    });
    return encrypted;
  } catch (error) {
    console.error("Encryption failed:", error);
    throw error;
  }
}

/**
 * Decrypts an encrypted message using the RSA private key.
 * @param {string} encryptedMessage - The encrypted message (armored format).
 * @param {string} privateKey - The recipient's private key (armored format).
 * @param {string} passphrase - Passphrase to unlock the private key.
 * @returns {Promise<string>} - The decrypted plaintext message.
 */
async function decryptWithRSA(
  encryptedMessage: any,
  privateKey: string,
  passphrase: string
) {
  try {
    const decryptedPrivateKey = await openpgp.decryptKey({
      privateKey: await openpgp.readPrivateKey({ armoredKey: privateKey }),
      passphrase,
    });

    const decrypted = await openpgp.decrypt({
      message: await openpgp.readMessage({ armoredMessage: encryptedMessage }),
      decryptionKeys: decryptedPrivateKey,
    });

    return decrypted.data;
  } catch (error) {
    console.error("Decryption failed:", error);
    throw error;
  }
}

/**
 * @description takes a plaintext and encrypts it using AES-RSA-PGP
 * @param metadata
 * @returns
 */
async function encryptMetadata(
  metadata: string,
  version: string
): Promise<string> {
  if (version === "1.0") {
    const AESencrypted = await encryptWithAES(
      metadata,
      decodeBase64(process.env.AES_PASSPHRASE as string)
    );

    const RSAencrypted = await encryptWithRSA(
      AESencrypted,
      decodeBase64(process.env.RSA_PUBLIC_KEY as string)
    );

    return Buffer.from(RSAencrypted).toString("base64");
  }

  return "";
}

/**
 * @description decrypts AES-RSA-PGP
 * @param metadata
 * @returns
 */
async function decryptMetadata(input: string | null) {
  if (!input) return null;

  const { valid, label, version, metadata } = unwrapMetadata(input);

  if (!valid) return null;

  if (version === "1.0") {
    const RSAdecrypted = await decryptWithRSA(
      metadata,
      decodeBase64(process.env.RSA_PRIVATE_KEY as string),
      decodeBase64(process.env.RSA_PASSPHRASE as string)
    );

    const AESdecrypted = await decryptWithAES(
      RSAdecrypted,
      decodeBase64(process.env.AES_PASSPHRASE as string)
    );

    return Buffer.from(AESdecrypted).toString("base64");
  }

  return null;
}

function decodeBase64(input: string): string {
  return Buffer.from(input, "base64").toString("utf-8");
}

function chunkMetadata(str: string, size: number): string[] {
  if (!str || size <= 0) return [];

  const chunks: string[] = [];

  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size));
  }

  return chunks;
}

function unwrapMetadata(metadataArray: string) {
  const parsed = JSON.parse(metadataArray);

  const { label, json_metadata } = parsed[0];

  const chuncks = json_metadata.msg.join("");

  const decoded = Buffer.from(chuncks, "base64").toString("utf-8");

  return {
    valid: true,
    label: label,
    version: json_metadata.version,
    metadata: decoded,
  };
}

export { encryptMetadata, decryptMetadata, chunkMetadata };
