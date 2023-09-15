const router = require('express').Router();
const withAuth = require('../utlis/auth');
const { Forum, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        res.render('homepage');
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/forum');
        return
    }
    res.render('login');
})

router.get('/forum', withAuth, async (req, res) => {
    console.log('hi this route is working')
    try {
        const forumData = await Forum.findAll();
        const forums = forumData.map((forum) => forum.get({ plain: true }));
        res.render('forum', {
            forums,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/forum/:id', (req, res) => {
    res.render('forum');
})

router.get('/contact', (req, res) => {
    res.render('contact');
})


module.exports = router;

