const express = require("express");

const routes = express.Router();

const userController = require("../controller/userController");


routes.post("/ragister" , userController.Ragister);

routes.post("/login", userController.Login);

routes.get("/faillogin", async (req, res) => {
    return res.status(400).json({ msg: "User not login", status: 0 });
});

module.exports = routes;