const usersRouter = require('express').Router();

const { findAllUsers, createUser, findUserById, updateUser, deleteUser, checkEmptyNameAndEmailAndPassword, checkEmptyNameAndEmail, checkIsUserExists,
    hashPassword, checkIsRegisterRequest } = require('../middlewares/users');
const { sendAllUsers, sendUserCreated, sendUserById, sendUserUpdated, sendUserDeleted, sendMe } = require('../controllers/users');
// const { register } = require('../controllers');
const { checkAuth } = require('../middlewares/auth');
const { login } = require('../controllers/auth');

usersRouter.post('/users', findAllUsers, checkIsRegisterRequest ,checkIsUserExists, checkEmptyNameAndEmailAndPassword, checkAuth, hashPassword, createUser, sendUserCreated);
usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.get('/users/:id', findUserById, sendUserById);
usersRouter.get("/me", checkAuth, sendMe);
usersRouter.put('/users/:id', findUserById, checkEmptyNameAndEmail, checkAuth, updateUser, sendUserUpdated);
usersRouter.delete('/users/:id', checkAuth, deleteUser, sendUserDeleted);

module.exports = usersRouter;