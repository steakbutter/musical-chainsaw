const router = require('express').Router();
const { User, Post }  = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }]
        });
        const user = userData.get({ plain: true });
        console.log(user);
        res.render('homepage', {
            user,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
        });
        const user = userData.get({ plain: true });

        res.render('dashboard', {
            user,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;