import bcryptjs from 'bcryptjs';
/* import crypto from "crypto"; */
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
  verifyHash(password, hash) {
    this.status = bcryptjs.compareSync(password, hash);
    return this.status;
  }
  /*
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
  } */
}
