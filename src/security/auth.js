const { sign } = require('jsonwebtoken');

exports.generateAuthToken = (userId, firstName, roles) => {
  return sign({ userId, firstName, roles }, 'suppa-secret');
};
