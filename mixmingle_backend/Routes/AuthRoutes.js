// const { signupValidation } = require('../Middlewares/AuthValidation');
// const { signup } = require('../Controllers/AuthController');

// const express = require('express');

// const router = express.Router();

// router.post('/login', (req, res) => {
//     res.send('login success')
// })

// router.post('/signup', signupValidation, signup)

// module.exports = router;
const { signup } = require('../Controllers/AuthController');
const { signupValidation } = require('../Middlewares/AuthValidation');

// const router = require('express').Router();
const express = require('express');

const router = express.Router();

router.post('/signup', signupValidation, signup);

module.exports = router;