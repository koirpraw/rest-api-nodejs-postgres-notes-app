const express = require('express');
const router = express.Router();

const authController = require('../controller/authController')


// register route
router.post('/auth/register', authController.register)

// login route
router.post('/auth/login', authController.login)


// logout route

// router.post('/logout', authController.logout)

module.exports = router;



