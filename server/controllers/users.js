/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import db from '../db';

export default class Users {
  async signupUser(req, res) {
    const {
      fullname,
      username,
      password,
      email
    } = req.body;
    const text = `INSERT INTO
    users(fullname, username, password, email)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      fullname,
      username,
      password,
      email
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
