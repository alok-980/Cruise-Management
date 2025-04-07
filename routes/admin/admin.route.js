const express = require("express");
const router = express.Router();
const wrapAsync = require("../../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../../middleware.js");
const adminController = require("../../controllers/admin/admin.controller.js");

router.route("/signup")
    .get(adminController.renderSignupForm)
    .post(wrapAsync(adminController.Signup))

router.route("/login")
    .get(adminController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", { failureRedirect: "/admin/login", failureFlash: true}),
        adminController.Login
    )

router.get("/logout", 
    adminController.Logout
)

module.exports = router;