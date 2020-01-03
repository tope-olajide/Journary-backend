import {
  validateOnlyStringChars,
  validateEmailAddress,
  validateInputCharLength
} from './mySimpleValidator';

const validateUser = ({
  email,
  username,
  password,
  fullname,
}) => {
  const verifyEmail = validateEmailAddress(email);
  if (verifyEmail[0] === false) {
    return [false, verifyEmail[1]];
  }
  const verifyUsername = validateInputCharLength(username, 'username', 3, 12);
  if (verifyUsername[0] === false) {
    return [false, verifyUsername[1]];
  }
  const verifyPassword = validateInputCharLength(password, 'password', 5, 20);
  if (verifyPassword[0] === false) {
    return [false, verifyPassword[1]];
  }
  const fullName = fullname.split(' ');
  const firstName = fullName[0];
  const lastName = fullName[1];
  if (!firstName.trim() || !lastName) {
    return [false, 'Firstname and Lastname must be separated by a space'];
  }
  const verifyFirstName = validateOnlyStringChars(
    firstName,
    'firstname',
    2,
    50
  );
  if (verifyFirstName[0] === false) {
    return [false, verifyFirstName[1]];
  }


  return [true];
};
export default validateUser;
