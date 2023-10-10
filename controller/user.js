const express = require('express');
const Reg = require("../model/std");
const Note = require("../model/desc");
const bcrypt = require('bcryptjs');
const main = require("../mailer");
var otp_message;

module.exports.registration = async function registration(req, res) {
    try {
        const firstname = req.body.first_name;
        const email = req.body.email;
        const mobile = req.body.mobile;
        const address = req.body.address;
        const password = req.body.password;

        const reg = new Reg({ firstname, email, mobile, address, password });
        console.log(reg);
        const reg1 = await reg.save();
        var session = req.session;
        session.firstname = firstname;
        session.email = email;
        session.mobile = mobile;
        session._id = reg1._id
        // session.password = password;
        console.log(session._id);

        res.status(201).render("home", {
            name: `${req.session.firstname}`,
        });

    } catch (err) {
        return res.render("404", {
            error: err
        });
    }
}

module.exports.login = async function login(req,res){
    try {
        const email1 = req.body.email;
        const password = req.body.password;

        const userlogin = await Reg.findOne({ email: email1 });

        const isMatch = await bcrypt.compare(password, userlogin.password);
        if (isMatch) {
            var session = req.session;
            session.firstname = userlogin.firstname;
            session._id = userlogin._id
            var findNote = await Note.find({ userId: session._id });
            res.status(201).render("home", {
                name: `${req.session.firstname}`,
                note: findNote
            });
        } else {
            res.render("404", {
                error: 'Invalid details'
            })
        }
    } catch (err) {
        return res.render("404", {
            error: 'Invalid login Details'
        });
    }
}
module.exports.submmit = async function submmit(req, res){
    try {
        const note1 = {
            note: req.body.secret,
            userId: req.session._id
        }
        const isNote = await Note.create(note1);
        var findNote = await Note.find({ userId: req.session._id });
        res.render("home", {
            note: findNote
        });
    } catch (error) {
        return res.render("404", {
            error: error
        });
    }
}

module.exports.otp = async function otp(req,res){
    try {
        const email1 = req.body.email;
        if (data = await Reg.findOne({ email: email1 })) {
            otp_message = Math.floor((Math.random() * 9999) + 1000);
            (main(email1, "OTP", otp_message));
            return res.render("forgot");
        } else {
            return res.render("404", {
                error: 'Invalid otp'
            });
        }
    } catch (error) {
        return res.render("404", {
            error: error
        });
    }
}

module.exports.forgotPass = async function forgotPass(req,res){
    try {
        const email1 = req.body.email;
        const password = req.body.password;
        const otp = req.body.otp;
        if (`${otp_message}` === otp) {
            const passwordHash = await bcrypt.hash(password, 10);
            const updateData = await Reg.findOneAndUpdate({ email: email1 }, { $set: { password: passwordHash } }, { new: true, useFindAndModify: true });
            if (!updateData) {
                return res.status(404).render("404");
            } else {
                console.log(updateData);
                res.status(200).send("Password successfully changed.");
            }
        } else {
            return res.render("404", {
                error: "Otp not matched."
            });
        }
    } catch (err) {
        return res.render("404", {
            error: err
        });
    }
}