import {
  validateOnlyStringChars,
  validateEmailAddress,
  validateInputCharLength
} from './mySimpleValidator';

const validateModifiedUser = ({
  email,
  fullname,
  about
}) => {
  const verifyEmail = validateEmailAddress(email);
  if (verifyEmail[0] === false) {
    return [false, verifyEmail[1]];
  }

  const verifyDescription = validateInputCharLength(about, 'description', 5, 2000);
  if (verifyDescription[0] === false) {
    return [false, verifyDescription[1]];
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
export default validateModifiedUser;
