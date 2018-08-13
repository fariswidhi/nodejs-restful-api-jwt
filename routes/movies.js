const express = require('express');
const router = express.Router();
const moviesController = require('../app/api/controllers/movies');

router.get('/all',moviesController.all);
router.post('/store',moviesController.store);
router.get('/:movieId',moviesController.getById);
router.put('/:movieId',moviesController.updateById);
router.delete('/:movieId',moviesController.deleteById);
// router.get('/destroy',userController.destroy);
// router.post('/register',userController.create);
// router.post('/authenticate',userController.authenticate);

module.exports = router;