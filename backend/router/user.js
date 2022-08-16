const express = require("express");
const { registerUser, authUser,getUserApplications, submitApplication, getSubmitStatus,logout } = require("../controllers/userController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User");
});
router.get("/signup", (req, res) => {
  res.send("signup");
});
router.post("/signup", registerUser);

router.post("/login", authUser);

router.post("/submit-application",submitApplication)
router.get('/submit-status/:id',getSubmitStatus)
router.get('/applications/:id',getUserApplications)
router.get('/logout',logout)

module.exports = router;
