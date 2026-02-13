const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
    res.render('auth/login',
        { pageTitle: 'Login', currentPage: 'login', isLogged: false, oldInput: {} });
}
exports.getSignup = (req, res, next) => {
    res.render('auth/signup',
        {
            pageTitle: 'Signup',
            currentPage: 'signup',
            isLogged: false,
            oldInput: { firstName: "", lastName: "", email: "", userType: "" },
        });
}

exports.postSignup = [

    check('first_name')
        .trim()
        .isLength({ min: 2 })
        .withMessage("First Name should be at least 2 characters long")
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("First Name should contain only alphabets"),

    check('last_name')
        .matches(/^[A-Za-z\s]*$/)
        .withMessage("Last Name should contain only alphabets"),

    check("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),

    check("password")
        .trim()
        .isLength({ min: 8 })
        .withMessage("Password should at least 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password should contain at least one uppercase")
        .matches(/[a-z]/)
        .withMessage("Password should contain at least one lowercase")
        .matches(/[0-9]/)
        .withMessage("Password should contain at least one number")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
        .withMessage("Passsword should contain at least one special character"),

    check("confirm_password")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),

    check("user_type")
        .notEmpty()
        .withMessage("Please select user type")
        .isIn(['guest', 'host'])
        .withMessage("Invalid user type"),
    check("terms")
        .notEmpty()
        .withMessage("Please accept terms and conditions")
        .custom((value, { req }) => {
            if (value !== "on") {
                throw new Error("Please accept terms and conditions");
            }
            return true
        }),

    (req, res, next) => {
        const { first_name, last_name, email, password, confirm_password, user_type, terms } = req.body
        const errors = validationResult(req);
        // console.log(errors.array().map(err => err.msg))
        // console.log(errors.array().length)
        if (!errors.isEmpty()) {
            return res.status(422).render("auth/Signup", {
                pageTitle: 'Signup',
                currentPage: 'signup',
                isLogged: false,
                errors: errors.array().map(err => err.msg),
                oldInput: { first_name, last_name, email, password, confirm_password, user_type, terms }
            });

        } else {

            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({ first_name, last_name, password: hashedPassword, user_type, email })
                    return user.save()

                })
                .then(err => {
                    res.redirect("/login");
                })
                .catch(err => {
                    res.status(422).render("auth/Signup", {
                        pageTitle: 'Signup',
                        currentPage: 'signup',
                        isLogged: false,
                        errors: [err.message],
                        oldInput: { first_name, last_name, email, password, confirm_password, user_type, terms }
                    });
                })
        }







        // console.log(req.body)
        // res.cookie("isLogged", true);
        // req.session.isLogged = true
        // console.log(req.session.isLogged)
        // req.session.isLogged = true; 
    }]

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (!user) {
        return res.status(422).render("auth/login", {
            pageTitle: 'Login',
            currentPage: 'login',
            isLogged: false,
            errors: ["User doesnot exist"],
            oldInput: { email }
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(422).render("auth/login", {
            pageTitle: 'Login',
            currentPage: 'login',
            isLogged: false,
            errors: ["User doesnot exist"],
            oldInput: { email }
        })


    }

    req.session.isLogged = true;
    req.session.user_id = user._id;
    res.redirect('/')

}
exports.postLogOut = (req, res, next) => {
    // console.log('Im at Logout', req.session.isLogged)
    req.session.destroy(() => {
        res.redirect("/");
    })
}