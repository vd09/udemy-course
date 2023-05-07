const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const configKeys = require("../config/keys");

router.get("/", (req, res) => res.send("User route"));

router.post(
    "/",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check(
            "password",
            "please password should have at least 5 characters"
        ).isLength({ min: 5 }),
    ],
    async (/* because of findOne */ req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            console.log(req.body);
            const { name, email, password } = req.body;
            let user = await User.findOne({ email });
            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists" }] });
            }

            user = new User({
                name,
                email,
                password,
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };
            jwt.sign(
                payload,
                configKeys.jwtSecret,
                { expiresIn: 3600 * 24 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

            // res.send("User created");
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
