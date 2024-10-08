const express = require('express');

const Passport = require('passport');

const routes = express.Router();

const borrowcontroller  = require('../controller/borrowController');

routes.post('/borrowBook/:bookId',Passport.authenticate("userverify", { failureRedirect: "/user/faillogin" }),borrowcontroller.borrowBook);

routes.post('/returnBook/:bookId', Passport.authenticate("userverify", { failureRedirect: "/user/faillogin" }), borrowcontroller.returnBook);


module.exports = routes;