const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userRepository = require('../models/user-repository');
const { validateBody } = require('./validation/route.validator');
const guard = require('express-jwt-permissions')({
  permissionsProperty: 'roles',
});

const adminRole = 'ADMIN';
const adminOrMemberRoles = [[adminRole], ['MEMBER']];

router.get('/', guard.check(adminOrMemberRoles), (req, res) => {
  res.send(userRepository.getUsers());
});

router.get('/:firstName', guard.check(adminOrMemberRoles), (req, res) => {
  const foundUser = userRepository.getUserByFirstName(req.params.firstName);

  if (!foundUser) {
    throw new Error('User not found');
  }

  res.send(foundUser);
});

router.post(
  '/',
  guard.check(adminRole),
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('password').notEmpty().isLength({ min: 5 }),
  (req, res) => {
    validateBody(req);

    const existingUser = userRepository.getUserByFirstName(req.body.firstName);

    if (existingUser) {
      throw new Error('Unable to create the user');
    }

    userRepository.createUser(req.body);
    res.status(201).end();
  }
);

router.put('/:id', guard.check(adminRole), (req, res) => {
  userRepository.updateUser(req.params.id, req.body);
  res.status(204).end();
});

router.delete('/:id', guard.check(adminRole), (req, res) => {
  userRepository.deleteUser(req.params.id);
  res.status(204).end();
});

exports.initializeRoutes = () => router;
