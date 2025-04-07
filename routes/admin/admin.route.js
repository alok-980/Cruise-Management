const express = require("express");
const router = express.Router();
const wrapAsync = require("../../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../../middleware.js");
const adminController = require("../../controllers/admin/admin.controller.js");

router.get("/signup", 
    adminController.renderSignupForm
)

router.post("/signup", 
    wrapAsync(adminController.Signup)
)

router.get("/login", 
    adminController.renderLoginForm
)

router.post("/login", 
    saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/admin/login", failureFlash: true}),
    adminController.Login
)

router.get("/logout", 
    adminController.Logout
)

module.exports = router;