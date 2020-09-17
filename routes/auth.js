const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

// Sign Out
router.post('/signup', authController.postSignUp);

router.get('/signup', authController.getSignUp);

// Log In
router.post('/login', authController.postLogIn);

router.get('/login', authController.getLogIn);

// // home
// router.post('/home', authController.postHome);

router.get('/homelogin', authController.getHomelogin);

// Log Out
router.get('/logout', authController.getLogOut);

// Profile
router.get('/profile', authController.getProfile);

module.exports = router;

