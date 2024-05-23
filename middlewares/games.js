const game = require("../models/game");
const games = require("../models/game");

const findAllGames = async (req, res, next) => {
  if (req.query["categories.name"]) {
    req.gamesArray = await games.findGameByCategory(req.query["categories.name"]);
    next();
    return;
  }
  req.gamesArray = await games.find({}).populate("categories").populate({
    path: "users",
    select: "-password"
  })
  next();
};

const createGame = async (req, res, next) => {
  console.log("POST /games");
  try {
    console.log(req.body);
    req.game = await games.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка создания игры" }));
  }
};

const findGameById = async (req, res, next) => {
  try {
    req.game = await games.findById(req.params.id).populate("categories").populate({ path: "users", select: "username" });
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Игра не найдена" }));
  }
};

const updateGame = async (req, res, next) => {
  try {
    // console.log(req); // passed
    // if (req.game.users.find((user) => {user.findById(user.id)})) {
    //   console.log(req.game.users.find((user) => {user.findById(user.id)}));
    // }
    // console.log(req.body);
    // if (games.findById(req.params.id).users.find((user) => user.id = req.body.user.id))
    //   next();

    // if (games.findById(req.params.id).users.findById(req.body)){
    //   next();
    // }
    // console.log(req.body);
    
    req.game = await games.findByIdAndUpdate(req.params.id, req.body);
    next();
  }
  catch {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send(JSON.stringify({ message: 'Ошибка обновления игры' }));
  }
};

const deleteGame = async (req, res, next) => {
  try {
    req.game = await games.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка удаления игры" }));
  }
};

const checkEmptyFields = async (req, res, next) => {
  if (req.isVoteRequest) {
    next();
    return;
  }
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.image ||
    !req.body.link ||
    !req.body.developer
  ) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Заполни все поля" }));
  } else {
    next();
  }
};

const checkIfCategoriesAvaliable = async (req, res, next) => {
  if (req.isVoteRequest) {
    next();
    return;
  }
  if (!req.body.categories || req.body.categories.length === 0) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Выбери хотя бы одну категорию" }));
  } else {
    next();
  }
};

const checkIfUsersAreSafe = async (req, res, next) => {
  if (!req.body.users) {
    next();
    return;
  }
  if (req.body.users.length - 1 === req.game.users.length) {
    next();
    return;
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Нельзя удалять пользователей или добавлять больше одного пользователя" }));
  }
};

const checkIsGameExists = async (req, res, next) => {
  const isExists = req.gamesArray.find((game) => {
    return req.title == game.title;
  })
  if (isExists) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: 'Игра уже существует' }));
  }
  else {
    next();
  }
};

const checkIsVoteRequest = async (req, res, next) => {
  if (Object.keys(req.body).length === 1 && req.body.users) {
    req.isVoteRequest = true;
  }
  next();
};

// const chechIfUserVoted = async(req, res, next) => {
//   const isVoted = games.findById(req.params.id);
//   console.log(isVoted);
// }

module.exports = {
  findAllGames, createGame, findGameById, updateGame, deleteGame, checkEmptyFields, checkIfCategoriesAvaliable,
  checkIfUsersAreSafe, checkIsGameExists, checkIsVoteRequest,
}; 