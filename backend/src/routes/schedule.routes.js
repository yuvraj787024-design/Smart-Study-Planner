const express = require('express')

const scheduleController = require('../controllers/schedule.controller');
const isAuthenticated = require('../middlewares/auth.middleware');

const router = express.Router()

router.post('/schedule',isAuthenticated ,scheduleController.scheduleRequest)

module.exports = router