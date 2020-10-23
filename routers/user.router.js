const userController = require('../controllers/user.controller');
const express  = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')
const isAdmin = require('../middlewares/admin');
const {createAccount, login, getUsers} = require('../controllers/user.controller')


router.post('/signUp',createAccount);

router.post('/login', login);

router.get('',[authMiddleware],getUsers);

module.exports = router;