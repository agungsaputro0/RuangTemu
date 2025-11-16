import CryptoJS from 'crypto-js';
const secretKey = "ruangTemuProtoss";
const ensureKeyLength = (key: string) => {
  const keyBytes = key.length >= 16 ? key.slice(0, 16) : key.padEnd(16, ' ');
  return CryptoJS.enc.Utf8.parse(keyBytes);
};

export const encryptData = (data: string) => {
  const key = ensureKeyLength(secretKey);

  const dataBytes = CryptoJS.enc.Utf8.parse(data);
  
  const dataLen = dataBytes.sigBytes;
  const paddingLen = 16 - (dataLen % 16);
  const padding = String.fromCharCode(paddingLen).repeat(paddingLen);
  const paddedData = CryptoJS.enc.Utf8.parse(data + padding);

  let encrypted = [];
  for (let i = 0; i < paddedData.sigBytes; i += 16) {
    const block = CryptoJS.lib.WordArray.create(
      paddedData.words.slice(i / 4, (i + 16) / 4),
      16
    );
    const encryptedBlock = CryptoJS.AES.encrypt(block, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.NoPadding,
    });
    encrypted.push(encryptedBlock.ciphertext);
  }

  const encryptedData = CryptoJS.lib.WordArray.create(
    encrypted.reduce((acc: number[], block) => acc.concat(block.words), []),
    encrypted.reduce((acc, block) => acc + block.sigBytes, 0)
  );

  return CryptoJS.enc.Base64.stringify(encryptedData);
};

export const decryptData = (encryptedData: string) => {
  const key = ensureKeyLength(secretKey);

  const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedData);

  let decrypted = [];
  for (let i = 0; i < encryptedBytes.sigBytes; i += 16) {
    const block = CryptoJS.lib.WordArray.create(
      encryptedBytes.words.slice(i / 4, (i + 16) / 4),
      16
    );
    const decryptedBlock = CryptoJS.AES.decrypt(
      CryptoJS.lib.CipherParams.create({ ciphertext: block }),
      key,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.NoPadding, 
      }
    );
    decrypted.push(decryptedBlock);
  }

  const decryptedData = CryptoJS.lib.WordArray.create(
    decrypted.reduce((acc: number[], block) => acc.concat(block.words), []),
    decrypted.reduce((acc, block) => acc + block.sigBytes, 0)
  );

  const decryptedText = CryptoJS.enc.Utf8.stringify(decryptedData);

  const paddingLen = decryptedText.charCodeAt(decryptedText.length - 1);
  return decryptedText.slice(0, -paddingLen); 
};
