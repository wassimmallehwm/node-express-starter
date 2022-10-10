const router = require('express').Router();
const { authenticated } = require('../../security/middlewares');
const { signup, login, refresh_token} = require('./auth.controller');

router.post('/login', login);

router.post('/signup', signup);

router.post('/refresh-token', authenticated, refresh_token);

module.exports = router;