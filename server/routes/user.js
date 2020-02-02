const express = require("express");
const router = express.Router();

//import controller
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const { read, update } = require("../controllers/user");

router.get("/user/:id", requireSignin, read);
// add adminMiddleware to restrict just for admin or without for all loggedin users
router.put("/user/update", requireSignin, update);
router.put("/admin/update", requireSignin, adminMiddleware, update);

module.exports = router;
