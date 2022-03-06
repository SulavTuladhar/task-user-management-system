const router = require('express').Router();

// Importing routing level middleware
const UserRouter = require('./controller/user.controller');

router.use('/user', UserRouter);

module.exports = router;