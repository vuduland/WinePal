var express = require('express');

var router = express.Router();

var db = require('../models');
var passport = require('../config/passport');

router.get('/all-wines', (req, res, next) => {
    try {
        db.Wine.findAll({}).then(winedata => {
            res.json(winedata);
        });
    } catch (err) {
        console.log(err);
    }
});

router.post('/add-wine', (req, res, next) => {
    try {
        db.Wine.create({
            vintage: req.body.vintage,
            country: req.body.country,
            region: req.body.region,
            varietal: req.body.varietal,
            producer: req.body.producer,
            ageability_index: req.body.ageability_index,
        }).then(winedata => {
            db.Inventory.create({
                UserId: req.user.id,
                quantity: req.body.quantity,
                WineId: winedata.id,
                vendor: req.body.vendor,
            }).then(inventory => {
                res.json(inventory);
            });
        });
    } catch (err) {
        console.log(err);
    }
});

router.get('/all-users', (req, res, next) => {

    try {

        db.User.findAll({}).then(winedata => {
            res.json(winedata);
        });

    } catch (err) {
        console.log(err);
        // error page here (unauthorized)

    }
});

router.post('/add-user', (req, res, next) => {
    try {
        db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }).then(userdata => res.redirect('/login'), passport.authenticate('local')); // sequelize promise
    } catch (err) {
        console.log(err);
    }
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    try {
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
    }
});

router.get('/logout', (req, res, next) => {
    try {
        req.logout();
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
