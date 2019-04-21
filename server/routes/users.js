const express = require('express');
const router = express.Router();
const Users = require('../controllers/users');


router.post('/auth', Users.auth )

router.post('/register', Users.register)

module.exports = router;