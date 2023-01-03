import config from '@app/config/default';

const encryptor = require('simple-encryptor')(config.App.secretKey);

export const encryptMe = (stringOrFileToEncrypt: string | object): string => {
  if (typeof stringOrFileToEncrypt !== 'string' && typeof stringOrFileToEncrypt !== 'object')
    throw new Error('Invalid parameter value to Encrypt.');

  if (typeof stringOrFileToEncrypt === 'object')
    encryptor.encrypt(JSON.stringify(stringOrFileToEncrypt));

  return encryptor.encrypt(stringOrFileToEncrypt);
};

export const decryptMe = <T = unknown>(stringOrFileToDecrypt: string): T => {
  if (typeof stringOrFileToDecrypt !== 'string')
    throw new Error('Invalid parameter value to Decrypt.');

  return encryptor.decrypt(stringOrFileToDecrypt) as T;
};
