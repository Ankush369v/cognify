const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../../middleware.js");
const wrapAsync = require("../../utils/wrapAsync.js");
const dashboardController = require("../../controllers/dashboardController.js");

/**
 * @api {get} /dashboard Get all generated content for user
 */
router.get("/", isLoggedIn, wrapAsync(dashboardController.getDashboard));

/**
 * @api {get} /dashboard/view/:id Get specific content details
 */
router.get("/view/:id", isLoggedIn, wrapAsync(dashboardController.getContentDetails));

/**
 * @api {get} /dashboard/filter Filter contents
 */
router.get("/filter", isLoggedIn, wrapAsync(dashboardController.filterContents));

/**
 * @api {delete} /dashboard/delete/:id Delete content
 */
router.delete("/delete/:id", isLoggedIn, wrapAsync(dashboardController.deleteContent));

/**
 * @api {delete} /dashboard/delete-all Delete all user content
 */
router.delete("/delete-all", isLoggedIn, wrapAsync(dashboardController.deleteAllContents));

/**
 * @api {get} /dashboard/profile Get user profile
 */
router.get("/profile", isLoggedIn, wrapAsync(dashboardController.getProfile));

/**
 * @api {post} /dashboard/profile Update user profile
 */
router.post("/profile", isLoggedIn, wrapAsync(dashboardController.updateProfile));

module.exports = router;
