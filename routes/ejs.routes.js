const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { checkAccessToken } = require("../middleware/checkAccessToken");

/* View Mapping */
router.get("/login", (req, res) => {
  const accessToken = req.signedCookies.accessToken;
  if (accessToken) {
    return res.redirect("/");
  }
  res.render("index.ejs", { components: "login" });
});

router.get("/", auth, (req, res, next) => {
  try {
    res.render("index.ejs", { components: "main-service/index" });
  } catch (error) {
    next(error);
  }
});

router.get("/todo", auth, (req, res, next) => {
  try {
    res.render("index.ejs", { components: "main-service/index" });
  } catch (error) {
    next(error);
  }
});

router.get("/mypage", auth, (req, res, next) => {
  try {
    res.render("index.ejs", { components: "mypage-service/index" });
  } catch (error) {
    next(error);
  }
});

router.get("/space/:subPath?/:id?", auth, (req, res, next) => {
  try {
    const subPath = req.path.split("/")[2] || "";
    const id = req.path.split("/")[3] || "";
    if (subPath === "") {
      res.render("index.ejs", { components: "space-service/index" });
    } else {
      res.render("index.ejs", { components: `space-service/${subPath}` });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
