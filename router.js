const express = require('express');
var router = express.Router();
const { Mongoose } = require('mongoose');


router.get("/", (req, res) => {
    return res.render("index");
});
router.get("/login", (req, res) => {
    return res.render("login");
});
router.get("/register", (req, res) => {
    return res.render("register");
});
router.get("/forgot", (req, res) => {
    return res.render("forgot");
});
router.get("/submit", (req, res) => {
    return res.render("submit");
})
router.get("/secret", (req, res) => {
    return res.render("secret");
});
router.get("/logout", async (req, res) => {
    try {
        req.session.destroy();
        res.redirect("login");
    } catch (error) {
        return res.render("404", {
            error: error
        });
    }
});

const UserController = require('./controller/user'); 
router.post("/register",UserController.registration);
router.post("/submit", UserController.submmit);
router.post("/login",UserController.login);
router.get("/otp", (req, res) => {
    res.render("otp");
});
router.post("/otp", UserController.otp);
router.post("/forgot",UserController.forgotPass);
router.get("*", (req, res) => {
    return res.render("404");
})


module.exports = router;