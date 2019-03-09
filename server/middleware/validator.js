const isAlphaNumeric = (mail) => {
  mail = mail.toString();
  const code = mail.charCodeAt(0);
  if (!(code > 47 && code < 58) && // numeric 0-9
    !(code > 64 && code < 91) && // uppercase alphabet
    !(code > 96 && code < 123)) { // lowercase alphabet
    return false;
  }
  return true;
};
const isAlphaNumericAndSomeChar = (mail) => {
  mail = mail.toString();
  for (let i = 0, len = mail.length; i < len; i++) {
    const code = mail.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric 0-9
      !(code > 64 && code < 91) && // uppercase alphabet
      !(code === 45 || code === 46 || code === 64 || code === 95) && // Hyphen, Period, @, underscore
      !(code > 96 && code < 123)) { // lowercase alphabet
      return false;
    }
  }
  return true;
};
// Validate Email input from user
const validateEmail = (emailAddress) => {
  if (!emailAddress) {
    return false;
  }
  const email = emailAddress.split('');
  // email address must contain @ sign
  if (email.indexOf('@') === -1) {
    return false;
  }
  // email address must not contain 2 or more @ signs
  const newMailArray = emailAddress.split('@');
  if (newMailArray.length > 2) {
    return false;
  }
  // email address must contain dot,  as in .com or .com.ng
  if (email.indexOf('.') === -1) {
    return false;
  }
  // the only special characters allowed
  // are: "@ _ - ." and they must not follow each
  // other consecutively e.g, -- or __ or ..
  if (email[email.indexOf('.') + 1] === '.' ||
    email[email.indexOf('_') + 1] === '_' ||
    email[email.indexOf('-') + 1] === '-') {
    return false;
  }
  // first letter in the email address must not contain special character,
  // so is the letter immdiately the @ sign and last letter
  if (isAlphaNumeric(newMailArray[0].charAt(0)) === false ||
    isAlphaNumeric(newMailArray[1].charAt(0)) === false ||
    isAlphaNumeric(newMailArray[1][newMailArray[1].length - 1]) === false
  ) {
    return false;
  }
  // The only character allowed are alphanumeric and "@ _ - ."
  if (isAlphaNumericAndSomeChar(emailAddress) === false) {
    return false;
  }

  return true;
};


export const validateModifiedUser = ({
  fullname,
  email
}) => {

  const checkEachChar = (char) => {
    char = parseInt(char, 10);
    return Number.isInteger(char);
  };
  const checkForInteger = (stringVal) => {
    const newstring = stringVal.split('');
    const newarray = newstring.filter(checkEachChar);
    return newarray;
  };

  const validateFullname = checkForInteger(fullname);
  if (fullname.length < 4 ||
     validateFullname.length > 1) {
    return 'Fullname minimum character must be 4 and must not contain a number';
  }
  if (!fullname.includes(' ')) {
    return 'Your firstname and lastname must be separated with space';
  }
  if (!validateEmail(email)) {
    return 'please enter a valid email address'
  }
  return false;
};





export const validateUser = ({
  fullname,
  username,
  password,
  email
}) => {
  username = username.toLowerCase();

  const checkEachChar = (char) => {
    char = parseInt(char, 10);
    return Number.isInteger(char);
  };
  const checkForInteger = (stringVal) => {
    const newstring = stringVal.split('');
    const newarray = newstring.filter(checkEachChar);
    return newarray;
  };

  const validateFullname = checkForInteger(fullname);
  if (fullname.length < 4 ||
     validateFullname.length > 1) {
    return 'Fullname minimum character must be 4 and must not contain a number';
  }
  if (!fullname.includes(' ')) {
    return 'Your firstname and lastname must be separated with space';
  }
  if (username.length < 3 || username.includes(' ')) {
    return 'Username must contain at least 3 alphabets and no space!';
  }
  if (!validateEmail(email)) {
    return 'please enter a valid email address'
  }
  if (password.trim().length === 0 || password.length < 5) {
    return 'Password must be at least 5 characters!';
  }
  return false;
};
export const validateBusiness = ({ businessName, businessAddress1, businessDescription })=> {
  if (!businessName || businessName.length < 5) {
    return 'title must be more than 5 charachers';
  }
  if (!businessAddress1 || businessAddress1.length < 5) {
    return 'address length is too small';
  }
  if (!businessDescription || businessDescription.length < 10) {
    return 'Description is too small';
  }
  return false;
};
export const validateReview = ({title, content}) => {
    
  if (!title) {
    return 'Please input a valid review title';
  }
  if (!content) {
    return 'Please input a valid review contents';
  }
  return false;
};