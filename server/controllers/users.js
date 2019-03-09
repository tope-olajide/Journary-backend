/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import jsonwebtoken from 'jsonwebtoken';
import db from '../db';
import { validateUser } from '../middleware/validator';
import Encryption from '../middleware/encryption';


const newEncryption = new Encryption();

export default class User {
  static async signupUser(req, res) {
    const {
      fullname,
      username,
      password,
      email
    } = req.body;
    const signUpError = validateUser({
      fullname,
      username,
      password,
      email
    });
    if (signUpError) {
      return res.status(400).json({
        success: false,
        message: signUpError
      });
    }
    const text = 'SELECT * FROM users WHERE username = $1 OR email =$2';
    const values = [username, email];
    try {
      const { rows } = await db.query(text, values);
      if (rows[0]) {
        if (rows[0].username.toUpperCase() === username.toUpperCase()) {
          return res.status(400).json({
            success: false,
            message: `${username} is already taken`
          });
        }
        res.status(400).json({
          success: false,
          message: `${email} is already taken`
        });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
    const encryptedPassword = newEncryption.generateHash(password);
    const text2 = `INSERT INTO
    users(fullname, username, password, email)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values2 = [
      fullname,
      username,
      encryptedPassword,
      email
    ];

    try {
      const { rows } = await db.query(text2, values2);
      const result = rows[0];
      const token = jsonwebtoken.sign({
        userid: result.userid,
        username: result.username,
        expiresIn: '24h'
      }, 'config.jwtSecret');
      return res.status(201).json({
        success: true,
        message: 'New user created/token generated!',
        result,
        token
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
