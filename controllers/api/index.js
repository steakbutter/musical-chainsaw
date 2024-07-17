const router = require('express').Router();
const userRoutes = require('./userRoute');
const postRoutes = require('./postRoute');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;
