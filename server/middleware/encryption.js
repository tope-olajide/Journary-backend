/* eslint-disable require-jsdoc */
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export default class Encryption {
  generateHash(password) {
    this.salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, this.salt);
    return hash;
  }

  verifyHash(password, hash) {
    this.status = bcrypt.compareSync(password, hash);
    return this.status;
  }

  encryptDiary(entry) {
    const key = crypto.createCipher('aes-128-cbc', 'mypassword');
    let encryptedEntry = key.update(entry, 'utf8', 'hex');
    encryptedEntry += key.update.final('hex');
    return encryptedEntry;
  }

  decrytDiary(entry) {
    const key = crypto.createDecipher('aes-128-cbc', 'mypassword');
    let decryptedEntry = key.update(entry, 'hex', 'utf8');
    decryptedEntry += key.update.final('utf8');
    return decryptedEntry;
  }
}
