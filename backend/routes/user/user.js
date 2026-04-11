const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../../utils/wrapAsync.js');
const userController = require("../../controllers/userController.js");

/**
 * @api {post} /signup User Signup
 */
router.post("/signup", wrapAsync(userController.signup));

/**
 * @api {post} /login User Login
 */
router.post("/login", wrapAsync(userController.login));

/**
 * @api {get} /logout User Logout
 */
router.get("/logout", userController.logout);

module.exports = router;