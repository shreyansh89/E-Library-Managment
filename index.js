const express = require("express");

const port = 8000;

const path = require("path");

const app = express();

const db = require("./config/mongoose");

const jwt = require("./config/passport-jwt");

const passport = require('passport')

const session = require('express-session'); 

app.use(express.urlencoded());

app.use(
    session({
        name: "jwt",
        secret: "jwt",
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 100,
        },
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.use("/user" , require("./routes/userroute"));
app.use('/book', require('./routes/book'));
app.use('/borrow', require('./routes/borrow'));

app.listen(port, (e)=>{
    if(e){
        console.log("server is not running");
        return false;
    }
    console.log("server is running in "+ port);
})