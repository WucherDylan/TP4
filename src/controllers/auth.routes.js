const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');
const { passwordsAreEqual } = require('../security/crypto');
const { generateAuthToken } = require('../security/auth');

router.post('/login', (req, res) => {
  const { firstName, password } = req.body;

  const user = userRepository.getUserByFirstName(firstName);
  if (!user || !passwordsAreEqual(password, user.password)) {
    res.status(401).send('Unauthorized');

    return;
  }

  const token = generateAuthToken(user.id, user.firstName, user.roles);

  res.json({ token });
});

exports.initializeRoutes = () => router;
