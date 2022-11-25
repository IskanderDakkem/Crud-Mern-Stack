const express = require("express");
//----------------------------------------------------------------------------
const {
  createNewUser,
  deleteNewUser,
  getAllUsers,
  getOneUser,
  updateNewUser,
} = require("../controller/user-controller");
const router = express.Router();
//----------------------------------------------------------------------------
router.post("/", createNewUser);
router.delete("/:_id", deleteNewUser);
router.get("/", getAllUsers);
router.get("/:_id", getOneUser);
router.get("/:_id", updateNewUser);
//----------------------------------------------------------------------------
module.exports = router;
