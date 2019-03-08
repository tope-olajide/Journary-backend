/* eslint-disable require-jsdoc */
/*
const verifyUserNameAndEmail = (username, email) => {
  const promise = new Promise((resolve, reject) => {
    User
      .findOne({
        attributes: ['email', 'username'],
        where: {
          $or: [
            {
              username: {
                $iLike: username
              }
            }, {
              email: {
                $iLike: email
              }
            }
          ]
        }
      })
      .then((userFound) => {
        if (userFound) {
          let field;
          if (userFound.username.toUpperCase() === username.toUpperCase()) {
            field = 'Username';
          } else {
            field = 'Email';
          }

          reject(`${field} already taken!`);
        }

        resolve();
      });
  });
  return promise;
};
export default class Users {
  async signupUser(req, res) {

  }
}

 */
export default class Users {
  async create(req, res) {
    const {
      fullname,
      username,
      password,
      email
    } = req.body;
    const text = `INSERT INTO
    users(fullname, username, password, take_away)
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
