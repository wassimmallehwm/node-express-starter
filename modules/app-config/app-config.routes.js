const router = require('express').Router();
const { authenticated, admin } = require('../../security/middlewares');
const { FilesHandler } = require('../../utils');
const { find, update, uploadLogo } = require('./app-config.controller');

router.get('/', find);

router.put('/', update);

router.post('/logo', authenticated, admin, FilesHandler.upload('images').single('logo'), uploadLogo);

module.exports = router;