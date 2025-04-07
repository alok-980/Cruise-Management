const Admin = require("../../models/admin/admin.mmodels");

module.exports.renderSignupForm = (req, res) => {
    res.render("admin/signup.ejs");
}

module.exports.Signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const admin = new Admin({
            email,
            username
        })

        const registeredAdmin = await Admin.register(admin, password);
        console.log(registeredAdmin);
        req.login(registeredAdmin, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Admin registered successfullt");
            res.redirect("/admin/login");
        })
    } catch (err) {
        req.flash("failure", err.message);
        res.redirect("/admin/signup");
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render("admin/login.ejs");
}

module.exports.Login = async (req, res) => {
    req.flash("success", "admin logged in successfully");
    let redirectUrl = res.locals.redirectUrl || "/catering";
    res.redirect(redirectUrl);
}

module.exports.Logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "you are logged out")
        res.redirect("/catering");
    })
}