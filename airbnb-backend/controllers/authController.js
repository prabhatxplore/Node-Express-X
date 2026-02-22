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

exports.postSignup =
    [

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
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
            .withMessage("Password must contain uppercase, lowercase, number and special character"),

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
            .isBoolean()
            .custom(value => {
                if (!value) {
                    throw new Error("Please accept terms and conditions")
                }
                return true
            })

        ,

        async (req, res, next) => {

            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({
                        success: false,
                        message: "Signup failed",
                        errors: errors.array().map(err => ({
                            field: err.path,
                            message: err.msg
                        })),
                    });

                }


                const { first_name, last_name, email, password, user_type } = req.body

                // check user already exist
                const existingUser = await User.findOne({ email })

                if (existingUser) {
                    console.log("user already exist")
                    return res.status(422).json({
                        success: false,
                        errors: [{ field: "email", message: "Email already exists" }]
                    });
                }


                const hashedPassword = await bcrypt.hash(password, 12)
                const user = new User({ first_name, last_name, password: hashedPassword, user_type, email })
                await user.save()

                // save session for the user
                req.session.user = {
                    _id: user._id,
                    user_type: user.user_type,
                    email: user.email,
                }

                await req.session.save()


                res.status(201).json({
                    success: true,
                    message: "User created and logged in",
                    user: req.session.user
                })


            }
            catch (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: "Something went wrong try again later",

                });
            }

        }
    ]

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (!user) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(401).json({ success: false, message: "Invalid email or password" });
    }


    req.session.user = {
        _id: user._id,
        user_type: user.user_type,
        favourites: user.favourites
    }
    console.log("new user login check", req.session.user)
    req.session.save(err => {
        if (!err) {

            return res.status(200).json({
                success: true,
                message: "Login Successful",
                user: req.session.user
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    })



}
exports.postLogOut = (req, res, next) => {
    // console.log('Im at Logout', req.session.isLogged)
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Something went wrong while logging out"
            })
        } else {
            res.clearCookie("connect.sid");
            res.status(200).json({
                success: true,
                message: "Logged Out Successfully"
            })
        }
    })
}


exports.getSessionUser = (req, res) => {
    console.log(req.headers.Cookie)
    if (req.session && req.session.user) {
        res.status(200).json({
            success: true,
            user: req.session.user
        })
    } else {
        res.status(200).json({ user: null })
    }
}