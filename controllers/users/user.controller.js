const User = require("../../models/users/user.models");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.Signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const user = new User({
            email,
            username
        })

        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "User registered successfully");
            res.redirect("/user/login");
        })
    } catch (err) {
        req.flash("failure", err.message);
        res.redirect("/user/signup");
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.Login = async (req, res) => {
    req.flash("success", "user logged in successfully");
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