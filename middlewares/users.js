const user = require("../models/user");
const bcrypt = require("bcryptjs");

const findAllUsers = async (req, res, next) => {
  req.usersArray = await user.find({}, { password: 0 });
  next();
};

const createUser = async (req, res, next) => {
  try {
    req.user = await user.create(req.body);
    next();
  } catch (error) {
    res.status(400).send("Ошибка при создании пользователя");
  }
};

const findUserById = async (req, res, next) => {
  console.log("GET /api/users/:id");
  try {
    req.user = await user.findById(req.params.id, { password: 0 });
    next();
  } catch (error) {
    res.status(404).send("User not found");
  }
};

const updateUser = async (req, res, next) => {
  try {
    req.user = await user.findByIdAndUpdate(req.params.id, req.body);
    next();
  }
  catch {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send(JSON.stringify({ message: 'Ошибка обновления пользователя' }));
  }
};

const deleteUser = async (req, res, end) => {
  try {
    req.user = await user.findByIdAndDelete(req.params.id);
    next();
  }
  catch {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send(JSON.stringify({ message: 'Ошибка удаления пользователя' }));
  }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  if (req.body.username == "" || req.body.email == "" || req.body.password == "") {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send(JSON.stringify({ message: 'Неверные данные пользователя' }));
  }
  else {
    next();
  }
};

const checkIsUserExists = async (req, res, next) => {
  const isInArray = req.usersArray.find((user) => {
    return req.body.email === user.email;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Пользователь с таким email уже существует" }));
  } else {
    next();
  }
};

const checkEmptyNameAndEmail = async (req, res, next) => {
  if (req.body.username == "" || req.body.email == "") {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send(JSON.stringify({ message: 'Неверные данные пользователя' }));
  }
  else {
    next();
  }
};

const hashPassword = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка хеширования пароля" });
  }
};

const checkIsRegisterRequest = async (req, res, next) => { //для регистрации с фронта
  if (req.body.username != "" && req.body.email != "" && req.body.password != "") {
    req.isRegisterRequest = true;
  }
  next();
};

module.exports = { findAllUsers, createUser, findUserById, updateUser, deleteUser, checkEmptyNameAndEmailAndPassword, checkIsUserExists,
  checkEmptyNameAndEmail, hashPassword, checkIsRegisterRequest };