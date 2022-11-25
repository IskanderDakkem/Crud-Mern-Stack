const express = require("express");
//----------------------------------------------
const userRoute = require("../routes/user-routes");
//----------------------------------------------
const router = express.Router();
//----------------------------------------------
router.use("/user", userRoute);
//----------------------------------------------
module.exports = router;
