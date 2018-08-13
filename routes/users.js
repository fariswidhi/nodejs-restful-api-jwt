const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');

router.get('/all',userController.all);
router.get('/destroy',userController.destroy);
router.post('/register',userController.create);
router.post('/authenticate',userController.authenticate);

module.exports = router;