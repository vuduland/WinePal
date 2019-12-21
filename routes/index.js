var express = require('express');

var router = express.Router();

var db = require('../models');
var passport = require('../config/passport');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: '🍷 Wine Pal 🍷' });
});

router.get('/dashboard', (req, res, next) => {
    if (!req.user) {
        res.json({});
        //add redirect to login
    } else {
        db.Inventory.findAll({
            where: {
                userId: req.user.id,
            },
            include: [
                {
                    model: db.Wine,
                    as: 'Wine',
                    required: true,
                },
            ],
        }).then(userWines => {
            console.log(userWines);
            res.render('dashboard', {
                name: req.user.name,
                email: req.user.email,
                id: req.user.id,
                userWines,
            });
        });
    }
});

router.get('/register', function (req, res, next) {
    try {
        res.render('register', { title: 'Registration' });
    } catch (err) {
        console.log(err);
    }
});

router.get('/login', function (req, res, next) {
    try {
        res.render('login', { title: 'Login' });
    } catch (err) {
        console.log(err);
    }
});

router.get('/goback', function (req, res, next) {
    res.render('goback', { title: 'Oops' });
});

module.exports = router;
