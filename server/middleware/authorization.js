const jwt = require("jsonwebtoken");
const configKeys = require("../config/keys");

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) {
        return res
            .status(401)
            .json({ msg: "you do not have the right authorization" });
    }

    try {
        const decoded = jwt.verify(token, configKeys.jwtSecret);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: "invalid token" });
    }
};
