const router = require('express').Router();
const { authenticated } = require('../../security/middlewares');
const { create, getById, getByLabel} = require('./role.controller');

router.post('/', authenticated, create);

router.get('/:id', authenticated, getById);

router.get('/label/:label', authenticated, getByLabel);


module.exports = router;