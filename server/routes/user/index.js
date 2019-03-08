/* eslint-disable require-jsdoc */

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
