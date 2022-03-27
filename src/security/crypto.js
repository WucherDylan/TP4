const bcrypt = require('bcryptjs');

exports.generateHashedPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(12));
}

exports.passwordsAreEqual = (pwd1, pwd2) => {
  return bcrypt.compareSync(pwd1, pwd2);
}
