import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');
const IV_LENGTH = 16;
/**
 * @description - Class Definition for the Encryption Object
 *
 * @export
 *
 * @class Encryption
 */
export default class Encryption {
  /**
   * @description - Encrypts user password before saving into database
   *
   * @param {string} password - user password
   *
   * @return {string} Returns harshed password
   *
   * @memberof Encryption
   */
  generateHash(password) {
    this.salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, this.salt);
    return hash;
  }

  /**
   * @description - Verify Harshed Password
   *
   * @param {string} password - user password
   *
   * @param {string} harsh - harshed password
   *
   * @return {boolean} Returns true or false
   *
   * @memberof Encryption
   */
  verifyHash(password, harsh) {
    this.status = bcryptjs.compareSync(password, harsh);
    return this.status;
  }

  /**
   * @description - Encrypts diary
   *
   * @param {object} entry - user's entry
   *
   * @return {object} - Returns encryptedEntry
   *
   * src: https://github.com/zishon89us/node-cheat/blob/master/stackoverflow_answers/crypto-create-cipheriv.js
   *
   * @memberof Encryption
   */
  encryptDiary(entry) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(entry);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  /**
   * @description - Decrypts diary
   *
   * @param {object} entry - user's entry
   *
   * @return {object} - Returns decrypted entry
   *
   * src: https://github.com/zishon89us/node-cheat/blob/master/stackoverflow_answers/crypto-create-cipheriv.js
   *
   * @memberof Encryption
   */
  decryptDiary(entry) {
    const entryParts = entry.split(':');
    const iv = Buffer.from(entryParts.shift(), 'hex');
    const encryptedEntry = Buffer.from(entryParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedEntry);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
