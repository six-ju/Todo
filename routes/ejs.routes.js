const express = require("express");
const router = express.Router();
//const { auth, ac } = require('../middleware/auth');

/* View Mapping */
router.get("/login", (req, res) => {
  const accessToken = req.signedCookies.accessToken;
  if (accessToken) {
    return res.redirect("/");
  }
  res.render("index.ejs", { components: "login" });
});

router.get("/", (req, res, next) => {
  res.render("index.ejs", { components: "user" });
});

module.exports = router;
