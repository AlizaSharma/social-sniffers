const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/profile', (res, req) => {
    res.render('profile');
})



module.exports = router;