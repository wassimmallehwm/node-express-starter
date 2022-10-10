const router = require('express').Router();
const { authenticated } = require('../../security/middlewares');
const { create, getAll, getById, getAllPaginated, update, remove, search} = require('./user.controller');

router.post('/', authenticated, create);

router.get('/', authenticated, getAll);

router.get('/list', authenticated, getAllPaginated);

router.get('/:id', authenticated, getById);

router.put('/:id', authenticated, update);

router.delete('/:id', authenticated, remove);

router.get('/search', authenticated, search);

module.exports = router;