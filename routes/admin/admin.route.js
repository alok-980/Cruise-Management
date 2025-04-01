const express = require("express");
const router = express.Router();
const Admin = require("../../models/admin/admin.mmodels");
const wrapAsync = require("../../utils/wrapAsync");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("admin/signup.ejs");
})

router.post("/signup", 
    wrapAsync(async (req, res) => {
        try {
            let { username, email, password } = req.body;
            const admin = new Admin({
                email,
                username
            })
            
            const registeredAdmin = await Admin.register(admin, password);
            console.log(registeredAdmin);
            req.flash("success", "Admin registered successfullt");
            res.redirect("/admin/login");
        } catch (err) {
            req.flash("failure", err.message);
            res.redirect("/admin/signup");
        }
    })
)

router.get("/login", (req, res) => {
    res.render("admin/login.ejs");
})

router.post("/login", 
    passport.authenticate("local", { failureRedirect: "/admin/login", failureFlash: true}),
    async (req, res) => {
        req.flash("success", "admin logged in successfully");
        res.redirect("/catering");
})

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "you are logged out")
        res.redirect("/catering");
    })
})

module.exports = router;