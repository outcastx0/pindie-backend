const gamesRouter = require('express').Router();

const { findAllGames, createGame, findGameById, updateGame, deleteGame, checkEmptyFields, checkIfUsersAreSafe, checkIfCategoriesAvaliable, 
    checkIsGameExists, checkIsVoteRequest, } = require('../middlewares/games');
const { sendAllGames, sendGameCreated, sendGameById, sendGameUpdated, sendGameDeleted } = require('../controllers/games');
const { checkAuth } = require('../middlewares/auth');


gamesRouter.post('/games', findAllGames, checkIsGameExists, checkIfCategoriesAvaliable, checkEmptyFields, checkEmptyFields, checkAuth, createGame, 
sendGameCreated);
gamesRouter.get('/games', findAllGames, sendAllGames);
gamesRouter.get('/games/:id', findGameById, sendGameById);
gamesRouter.put('/games/:id', findGameById, checkIsVoteRequest, checkEmptyFields, checkIfUsersAreSafe, checkIfCategoriesAvaliable, checkAuth, updateGame, sendGameUpdated);
gamesRouter.delete('/games/:id', checkAuth, deleteGame, sendGameDeleted);

module.exports = gamesRouter; 