const express = require('express');

const Passport = require('passport');

const routes = express.Router();

const bookcontroller = require('../controller/bookController');

routes.post('/add_book', Passport.authenticate("userverify", { failureRedirect: "/user/faillogin" }), bookcontroller.add_book);

routes.get('/viewbook', Passport.authenticate("userverify", { failureRedirect: "/user/faillogin" }), bookcontroller.viewbook);

routes.delete('/deletebook/:id', Passport.authenticate("userverify", { failureRedirect: "/user/faillogin" }), bookcontroller.deletebook);

routes.put('/editbook/:id', Passport.authenticate("userverify", { failureRedirect: "/user/faillogin" }), bookcontroller.editbook);






module.exports = routes;