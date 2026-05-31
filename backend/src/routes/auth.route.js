const express = require('express')


const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register',authController.registerUser)
router.post('/login',authController.loginUser)
router.get('/users',authController.getUsers)
router.post('/logout',authController.userLogout)


module.exports = router;